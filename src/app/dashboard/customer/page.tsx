import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CardCustomer } from "./components/card";

export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className="mt-9 mb-2 bg-gray-300 px-4 py-4 rounded shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My customers</h1>
          <Link
            href="/dashboard/customer/new"
            className="bg-cyan-900 px-4 py-1 rounded text-white"
          >
            New customer
          </Link>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
          <CardCustomer />
          <CardCustomer />
          <CardCustomer />
        </section>
      </main>
    </Container>
  );
}
