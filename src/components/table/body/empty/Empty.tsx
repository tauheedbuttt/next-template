import Image from "next/image";
import EmptyIcon from "../../../../../public/assets/empty-box.png";

const Empty = ({ colSpan }: { colSpan?: any }) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex flex-col gap-4 items-center justify-center py-20 ">
          <Image src={EmptyIcon.src} alt="empty" className="w-28" />
          <span className="text-primary">No Items Found</span>
        </div>
      </td>
    </tr>
  );
};

export default Empty;
