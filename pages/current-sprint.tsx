import SprintForm from "@/components/SprintForm";
import React from "react";

type Props = {};

const CurrentSprintPage = () => {
  return (
    <>
      <SprintForm />
      <div className="grid grid-cols-10 p-6  gap-4 items-end justify-center grid-rows-10">
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
      </div>
    </>
  );
};

export default CurrentSprintPage;
