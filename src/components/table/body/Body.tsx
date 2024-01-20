import Empty from "./empty/Empty";
import Skeleton from "./skeleton/Skeleton";

export interface DataProps {
  pages: number;
  total: number;
}

const Body = ({
  body,
  isFetching,
  columns,
  data,
  children,
}: {
  body?: string;
  isFetching?: boolean;
  columns?: number;
  data?: DataProps;
  children?: JSX.Element | JSX.Element[];
}) => {
  return (
    <tbody className={body}>
      {isFetching ? (
        <Skeleton columns={columns} />
      ) : data?.total == 0 || !data?.total ? (
        <Empty colSpan={columns} />
      ) : (
        children
      )}
    </tbody>
  );
};

export default Body;
