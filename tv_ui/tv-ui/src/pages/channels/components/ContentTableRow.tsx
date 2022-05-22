import { DetailedHTMLProps, HTMLAttributes } from "react";

type ContentTableRowProps = {
  contentId: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  category: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function ContentTableRow({
  contentId,
  name,
  description,
  startTime,
  endTime,
  category,
}: ContentTableRowProps) {
  return (
    <>
      <tr className="bg-white border-b last:border-sky-500 last:border-b-4 dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          {contentId}
        </th>
        <td className="px-6 py-4">{name}</td>
        <td className="px-6 py-4">{description}</td>
        <td className="px-6 py-4">{category}</td>
        <td className="px-6 py-4">{startTime}</td>
        <td className="px-6 py-4">{endTime}</td>
      </tr>
    </>
  );
}
