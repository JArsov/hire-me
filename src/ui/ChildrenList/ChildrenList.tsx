import { Container, Heading, List } from '@chakra-ui/react';
import { Child } from '../../types/models';
import ChildrenListItem from './ChildrenListItem';

type ChildrenListProps = {
  data: Child[];
};

const ChildrenList = ({ data }: ChildrenListProps) => {
  return (
    <Container>
      <Heading>Children List</Heading>
      <List>
        {data.map(child => (
          <ChildrenListItem key={child.childId} data={child} />
        ))}
      </List>
    </Container>
  );
};

export default ChildrenList;
