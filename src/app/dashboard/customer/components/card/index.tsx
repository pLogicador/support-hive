"use client";

import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { useRouter } from "next/navigation";

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();

  async function handleDeleteCustomerId() {
    try {
      const res = await api.delete("/api/customer", {
        params: {
          id: customer.id,
        },
      });

      //console.log(res.data);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold">Name:</a> {customer.name}
      </h2>
      <p>
        <a className="font-bold">Email:</a> {customer.email}
      </p>
      <p>
        <a className="font-bold">Phone:</a> {customer.phone}
      </p>
      <button
        className="self-start bg-red-500 px-4 rounded text-white mt-2 hover:bg-red-900"
        onClick={handleDeleteCustomerId}
      >
        Delete
      </button>
    </article>
  );
}
