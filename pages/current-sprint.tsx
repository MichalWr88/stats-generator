import React from "react";

type Props = {};

const currentSprintPage = () => {
  return (
    <div className="grid grid-cols-10 p-6  gap-4 items-end justify-center grid-rows-10 ">
      <div className=" relative ">
        <label className="text-gray-700">
          Numer sprintu
          <input
            type="number"
            className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="number"
          />
        </label>
      </div>

      <div className=" relative col-span-2">
        <label className="text-gray-700 ">
          Zaplanowane
          <input
            type="text"
            className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="number"
          />
        </label>
      </div>
      <div className=" relative col-span-2">
        <label className="text-gray-700">
          Dowiezione
          <input
            type="text"
            className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="number"
          />
        </label>
      </div>
      <div className=" relative col-span-2">
        <label className="text-gray-700">
          start sprintu
          <input
            type="date"
            className="  rounded-lg  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="number"
          />
        </label>
      </div>

      <div className=" relative  col-start-1 row-span-1">
        <label className="text-gray-700">
          Pręd ost 3 spr
          <input
            type="text"
            className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="number"
          />
        </label>
      </div>
      <div className=" relative  ">
        <label className="text-gray-700">
          Srednia prędkość ost 6 sprintów
          <input
            type="text"
            className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="number"
          />
        </label>
      </div>
      <div className=" relative  ">
        <label className="text-gray-700">
          Przewid. ost 3 sprinty
          <input
            type="text"
            className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="number"
          />
        </label>
      </div>
      <div className=" relative  ">
        <label className="text-gray-700">
          Przewidywalność
          <input
            type="text"
            className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="number"
          />
        </label>
      </div>
      <button className="bg-lime-700 text-white uppercase rounded-lg h-12 col-start-9">
        zapisz
      </button>
      <button className="bg-slate-200 rounded-lg h-12">przelicz</button>
      <h2 className="grid-row-2  col-start-1">Request</h2>
      <div>
        New
        <input
          type="text"
          className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </div>
      <div>
        Review
        <input
          type="text"
          className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </div>
      <div>
        In progress
        <input
          type="text"
          className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </div>
      <div>
        In testing
        <input
          type="text"
          className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </div>
      <div>
        RFD
        <input
          type="text"
          className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </div>
      <div>
        Done
        <input
          type="text"
          className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </div>
      <h2 className="grid-row-3 col-start-1">Bug</h2>
      <div>
        In progresse
        <input
          type="text"
          className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </div>
      <div>
        In testing
        <input
          type="text"
          className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </div>
      <div>
        Closed
        <input
          type="text"
          className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </div>
      <div>
        Review
        <input
          type="text"
          className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </div>
      <div>
        RFD
        <input
          type="text"
          className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </div>
      <div>
        Accepted
        <input
          type="text"
          className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </div>
      <div>
        On Hold
        <input
          type="text"
          className="  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </div>
    </div>
  );
};

export default currentSprintPage;
