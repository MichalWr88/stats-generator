import RequestAndBugSprintCharts from "@/components/charts/RequestAndBugSprintCharts";
import SpeedSprintsStats from "@/components/charts/SpeedSprintsStats";
import PredictabilitySprintsStats from "@/components/charts/PredictabilitySprintsStats";
import ChartSprintsContext from "@/components/store/ChartSprintsContext";
import React, { useState } from "react";
import ReactPageScroller from "react-page-scroller";
import { IoIosReturnLeft } from "react-icons/io";
import Link from "next/link";
import ImoSprintsStats from "@/components/charts/ImoSprintsStats";
import EpicSprintsStats from "@/components/charts/EpicSprintsStats";
const ChartsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (nr: number) => {
    setCurrentPage(nr);
  };

  const handleBeforePageChange = (nr: number) => {};

  return (
    <>
      <ChartSprintsContext>
        <ReactPageScroller
          pageOnChange={handlePageChange}
          onBeforePageScroll={handleBeforePageChange}
          customPageNumber={currentPage}
        >
          <div className=" min-h-full">
            <PredictabilitySprintsStats />
          </div>
          <div className="min-h-full">
            <SpeedSprintsStats />
          </div>
          <div className=" min-h-full">
            <ImoSprintsStats />
          </div>
          <div className=" min-h-full">
            <EpicSprintsStats />
          </div>
          <div className="min-h-full">
            <RequestAndBugSprintCharts />
          </div>
        </ReactPageScroller>
      </ChartSprintsContext>
      <Link href={"/"}>
        <a
          title="home"
          type="button"
          className="flex items-center justify-center z-100 m-5 absolute top-1 rounded-full bg-blue-600 text-white  shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg  focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9"
        >
          <IoIosReturnLeft className="text-3xl" />
        </a>
      </Link>
    </>
  );
};

export default ChartsPage;
