const Skeleton = ({ columns }: { columns?: number }) => {
  return [1, 2, 3, 4, 5].map((item) => (
    <tr key={item}>
      {Array(columns)
        .fill(0)
        .map((_item, index) => (
          <td key={index} className="text-center py-5">
            <div className=" h-[10px] mx-3 rounded-full bg-accent animate-pulse" />
          </td>
        ))}
    </tr>
  ));
};

export default Skeleton;
