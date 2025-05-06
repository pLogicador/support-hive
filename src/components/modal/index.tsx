"use client";

import { ModalContext } from "@/providers/modal";
import { MouseEvent, useContext, useRef } from "react";

export function ModalTicket() {
  const { handleModalVisible } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };

  return (
    <div
      className="absolute bg-gray-800/70 w-full min-h-screen"
      onClick={handleModalClick}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-lg md:text-2xl">Ticket details</h1>
            <button
              className="bg-red-600 p-1 px-2 text-white rounded"
              onClick={handleModalVisible}
            >
              Close
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Name:</h2>
            <p>Problem description</p>
          </div>

          <div className="flex flex-wrap flex-col gap-1 mb-2">
            <h2 className="font-bold">Description:</h2>
            <p>Test description here...</p>
          </div>

          <div className="w-full border-b-[1.5px] my-4"></div>
          <h1 className="font-bold text-lg mb-4">Customer details</h1>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Name:</h2>
            <p>Customer Example Name Here</p>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Phone:</h2>
            <p>11111111111</p>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Email:</h2>
            <p>example@test.com</p>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Address:</h2>
            <p>Street XY</p>
          </div>
        </div>
      </div>
    </div>
  );
}
