import { Container, Heading, List, Spinner } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getChildrenList } from '../../data/api';
import { Child } from '../../types/models';
import ChildrenListItem from './ChildrenListItem';

const resultsPerPage = 10;

const ChildrenList = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [resultsShown, setResultsShown] = useState(resultsPerPage);

  const fetchChildrenData = useCallback(async () => {
    const childrenData = await getChildrenList();
    if (childrenData) {
      setChildren(childrenData);
    }
  }, []);

  const visibleChildren = useMemo(
    () => children.slice(0, resultsShown),
    [children, resultsShown],
  );

  useEffect(() => {
    fetchChildrenData();
  }, [fetchChildrenData]);

  const fetchMoreChildren = useCallback(() => {
    // Adding a timeout in order to mimic an API call
    setTimeout(() => {
      setResultsShown(results =>
        Math.min(results + resultsPerPage, children.length),
      );
    }, 1500);
  }, [children.length]);

  return (
    <Container>
      <Heading>Children List</Heading>
      <InfiniteScroll
        dataLength={visibleChildren.length}
        next={fetchMoreChildren}
        hasMore={visibleChildren.length < children.length}
        loader={<Spinner />}
      >
        <List spacing={10} width="98%">
          {visibleChildren?.map(child => (
            <ChildrenListItem
              key={child.childId}
              data={child}
              refreshList={fetchChildrenData}
            />
          ))}
        </List>
      </InfiniteScroll>
    </Container>
  );
};

export default ChildrenList;
