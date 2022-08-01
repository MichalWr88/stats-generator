import PredictabilitySprintsStat from "@/components/PredictabilitySprintsStat";
import ChartSprintsContext from "@/components/store/ChartSprintsContext";
import React, { useState } from "react";
import ReactPageScroller from "react-page-scroller";
type Props = {};

const ChartsPage = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (nr: number) => {
    setCurrentPage(nr);
  };

  const handleBeforePageChange = (nr: number) => {
    console.log(nr);
  };

  return (
    <ChartSprintsContext>
      <ReactPageScroller
        pageOnChange={handlePageChange}
        onBeforePageScroll={handleBeforePageChange}
        customPageNumber={currentPage}
      >
        <div className=" min-h-full">
          <PredictabilitySprintsStat />
        </div>
        <div className="bg-gray-600 min-h-full">Predkosc</div>
        <div className="bg-yellow-500 min-h-full">Imo</div>
        <div className="bg-purple-500 min-h-full">Epic</div>
        <div className="bg-indigo-500 min-h-full">Request and bugs</div>
      </ReactPageScroller>
    </ChartSprintsContext>
  );
};

export default ChartsPage;
