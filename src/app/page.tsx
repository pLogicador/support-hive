import Image from "next/image";
import supportImg from "@/assets/illustration-customer-support.png";

export default function Home() {
  return (
    <div>
      <main className=" bg-gray-900 flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
        <h2 className="font-medium text-2xl mb-2 text-white">
          Manage your business
        </h2>
        <h1 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">
          Services and Customers
        </h1>

        <Image
          src={supportImg}
          alt="Illustrative image of customer support"
          width={600}
          className="max-w-sm md:max-w-xl"
        />
      </main>
    </div>
  );
}
