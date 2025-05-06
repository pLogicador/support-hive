"use client";
import { api } from "@/lib/api";
import { ModalContext } from "@/providers/modal";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FiCheckSquare, FiFile, FiTrash2 } from "react-icons/fi";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

  async function handleChangeStatus() {
    try {
      const res = await api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({
      customer: customer,
      ticket: ticket,
    });
  }

  return (
    <>
      <tr className="border-b-2 border-b-gray-800 h-16 last:border-b-0 bg-neutral-400 hover:bg-stone-500 duration-300">
        <td className="text-left pl-2">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.createdAt?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="bg-green-400 px-2 py-1 rounded">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-3" onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color="#292e2a" />
          </button>
          <button onClick={handleOpenModal}>
            <FiFile size={24} color="#d07429" />
          </button>
        </td>
      </tr>
    </>
  );
}
