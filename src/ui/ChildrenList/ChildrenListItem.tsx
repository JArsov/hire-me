import { CalendarIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Tag,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { checkIn, checkOut } from '../../data/api';
import { Child } from '../../types/models';
import TimePicker from 'react-time-picker';

type ChildrenListItemProps = {
  data: Child;
  refreshList: () => Promise<void>;
};

enum ActionType {
  CheckIn,
  CheckOut,
}

const ChildrenListItem = ({
  data: {
    name: { fullName },
    birthday,
    image: { small: smallImage },
    checkedIn,
    childId,
  },
  refreshList,
}: ChildrenListItemProps) => {
  const [pickUpTime, setPickUpTime] = useState('10:00');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const actionHandler = useCallback(
    async (actionType: ActionType) => {
      const actionLabel = actionType === ActionType.CheckIn ? 'in' : 'out';
      try {
        setIsLoading(true);
        if (actionType === ActionType.CheckIn) {
          await checkIn(childId, pickUpTime);
        } else {
          await checkOut(childId);
        }
        toast({
          position: 'top-right',
          title: `Successful check ${actionLabel} for child ${fullName}`,
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        // If the action is successful, refresh the children list
        refreshList();
      } catch (err: any) {
        toast({
          position: 'top-right',
          title: `Check ${actionLabel} status`,
          description: err.response.data.error,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [childId, fullName, pickUpTime, refreshList, toast],
  );

  return (
    <Flex w="100%" gap="2rem">
      <Avatar src={smallImage} alt={fullName} />
      <Flex justifyContent="space-between" w="100%">
        <Flex flexDirection="column">
          <Heading size="md">{fullName}</Heading>
          <Tooltip label="Date of Birth">
            <Box>
              <CalendarIcon />{' '}
              {birthday ? new Date(birthday).toLocaleDateString() : 'N/A'}
            </Box>
          </Tooltip>
        </Flex>
        {checkedIn ? (
          <Flex direction="column" justifyContent="space-between" gap="1rem">
            <Tag variant="solid" colorScheme="green">
              Checked In
            </Tag>
            <Button
              size="sm"
              onClick={() => actionHandler(ActionType.CheckOut)}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Check Out
            </Button>
          </Flex>
        ) : (
          <Flex
            direction="column"
            justifyContent="space-between"
            alignItems="flex-end"
            gap="1rem"
          >
            <Tag variant="solid" colorScheme="cyan">
              Not Checked In
            </Tag>
            <Flex>
              <div>Pick up time:</div>
              <TimePicker
                value={pickUpTime}
                onChange={value => setPickUpTime(value.toString())}
                minTime={new Date()}
                disableClock
                clearIcon={null}
              />
            </Flex>

            <Button
              size="sm"
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={() => actionHandler(ActionType.CheckIn)}
            >
              Check In
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ChildrenListItem;
