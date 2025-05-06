import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TicketItem } from "./components/ticket";
import prismaClient from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
      status: "OPEN",
    },
    include: {
      customer: true,
    },
  });

  return (
    <div>
      <Container>
        <main className="mt-9 mb-2 bg-gray-300 px-4 py-4 rounded shadow-md">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Called</h1>
            <Link
              href="/dashboard/new"
              className="bg-cyan-900 px-4 py-1 rounded text-white"
            >
              Open ticket
            </Link>
          </div>

          <table className="min-w-full my-2">
            <thead>
              <tr>
                <th className="font-medium text-left pl-1">CUSTOMER</th>
                <th className="font-medium text-left hidden sm:block">
                  REGISTER DATE
                </th>
                <th className="font-medium text-left">STATUS</th>
                <th className="font-medium text-left">#</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <TicketItem
                  key={ticket.id}
                  customer={ticket.customer}
                  ticket={ticket}
                />
              ))}
            </tbody>
          </table>
          {tickets.length === 0 && (
            <h3 className="px-2 md:px-0 text-gray-600">
              No OPEN tickets found...
            </h3>
          )}
        </main>
      </Container>
    </div>
  );
}
