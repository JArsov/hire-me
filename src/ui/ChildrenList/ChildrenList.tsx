import { Container, Heading, List, Spinner } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getChildrenList } from '../../data/api';
import { Child } from '../../types/models';
import ChildrenListItem from './ChildrenListItem';

const resultsPerPage = 10;

const ChildrenList = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [visibleChildren, setVisibleChildren] = useState<Child[]>([]);

  const fetchChildrenData = useCallback(async () => {
    const childrenData = await getChildrenList();
    if (childrenData) {
      setChildren(childrenData);
      setVisibleChildren(childrenData.slice(0, resultsPerPage));
    }
  }, []);

  useEffect(() => {
    fetchChildrenData();
  }, [fetchChildrenData]);

  const fetchMoreChildren = useCallback(() => {
    // Adding a timeout in order to mimic an API call
    setTimeout(() => {
      setVisibleChildren(
        children.slice(0, visibleChildren.length + resultsPerPage),
      );
    }, 1500);
  }, [children, visibleChildren.length]);

  return (
    <Container>
      <Heading>Children List</Heading>
      <InfiniteScroll
        dataLength={visibleChildren.length}
        next={fetchMoreChildren}
        hasMore={visibleChildren.length < children.length}
        loader={<Spinner />}
      >
        <List>
          {visibleChildren?.map(child => (
            <ChildrenListItem key={child.childId} data={child} />
          ))}
        </List>
      </InfiniteScroll>
    </Container>
  );
};

export default ChildrenList;
