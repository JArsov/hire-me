import { Container, Heading, List } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { getChildrenList } from '../../data/api';
import { Child } from '../../types/models';
import ChildrenListItem from './ChildrenListItem';

const ChildrenList = () => {
  const [children, setChildren] = useState<Child[]>([]);

  const fetchChildrenData = useCallback(async () => {
    const childrenData = await getChildrenList();
    if (childrenData) {
      setChildren(childrenData);
    }
  }, []);

  useEffect(() => {
    fetchChildrenData();
  }, [fetchChildrenData]);

  return (
    <Container>
      <Heading>Children List</Heading>
      <List>
        {children?.map(child => (
          <ChildrenListItem key={child.childId} data={child} />
        ))}
      </List>
    </Container>
  );
};

export default ChildrenList;
