import { FiFile, FiTrash2 } from "react-icons/fi";

export function TicketItem() {
  return (
    <>
      <tr className="border-b-2 border-b-gray-800 h-16 last:border-b-0 bg-neutral-400 hover:bg-stone-500 duration-300">
        <td className="text-left pl-2">Customer name</td>
        <td className="text-left hidden sm:table-cell">04/30/2025</td>
        <td className="text-left">
          <span className="bg-green-400 px-2 py-1 rounded">OPEN</span>
        </td>
        <td className="text-left">
          <button className="mr-2">
            <FiTrash2 size={24} color="#783c3a" />
          </button>
          <button>
            <FiFile size={24} color="#d07429" />
          </button>
        </td>
      </tr>
    </>
  );
}
