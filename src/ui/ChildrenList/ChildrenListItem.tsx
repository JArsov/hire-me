import { Child } from '../../types/models';

type ChildrenListItemProps = {
  data: Child;
};

const ChildrenListItem = ({
  data: {
    name: { fullName },
  },
}: ChildrenListItemProps) => {
  return <div style={{ height: '400px' }}>{fullName}</div>;
};

export default ChildrenListItem;
