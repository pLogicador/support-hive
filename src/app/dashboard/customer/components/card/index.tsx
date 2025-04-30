export function CardCustomer() {
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold">Name:</a> Name Customer
      </h2>
      <p>
        <a className="font-bold">Email:</a> test@example.com
      </p>
      <p>
        <a className="font-bold">Phone:</a> 11 11111 1111
      </p>
      <button className="self-start bg-red-500 px-4 rounded text-white mt-2 hover:bg-red-900">
        Delete
      </button>
    </article>
  );
}
