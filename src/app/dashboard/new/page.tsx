import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (!name || !description || !customerId) {
      return;
    }

    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "OPEN",
        userId: session?.user.id,
      },
    });

    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="bg-cyan-900 text-white px-4 py-1 rounded"
          >
            Back
          </Link>
          <h1 className="text-3xl font-bold">New calls</h1>
        </div>

        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <label className="mb-1 font-medium text-lg">Name of the call</label>
          <input
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
            type="text"
            placeholder="Enter the name of the call"
            required
            name="name"
          />

          <label className="mb-1 font-medium text-lg">
            Describe the problem
          </label>
          <textarea
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
            placeholder="Describe the problem..."
            required
            name="description"
          ></textarea>

          {customers.length !== 0 && (
            <>
              <label className="mb-1 font-medium text-lg">
                Select the customer
              </label>
              <select
                className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-cyan-100"
                name="customer"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <Link href="/dashboard/customer/new">
              You don't have any customers yet,{" "}
              <span className="text-cyan-900 font-medium">
                Register customer
              </span>
            </Link>
          )}

          <button
            type="submit"
            className="bg-cyan-900 hover:bg-black h-11 px-2 py-1 my-4 rounded-md text-white font-bold duration-300 disabled:bg-cyan-200 disabled:cursor-not-allowed"
            disabled={customers.length === 0}
          >
            Register
          </button>
        </form>
      </main>
    </Container>
  );
}
