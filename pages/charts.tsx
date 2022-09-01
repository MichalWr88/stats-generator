import RequestAndBugSprintCharts from '@/components/charts/RequestAndBugSprintCharts';
import SpeedSprintsStats from '@/components/charts/SpeedSprintsStats';
import PredictabilitySprintsStats from '@/components/charts/PredictabilitySprintsStats';
import ChartSprintsContext from '@/components/store/ChartSprintsContext';
import React, { useState } from 'react';
import ReactPageScroller from 'react-page-scroller';
import { IoIosReturnLeft } from 'react-icons/io';
import Link from 'next/link';
import ImoSprintsStats from '@/components/charts/ImoSprintsStats';
import EpicSprintsStats from '@/components/charts/EpicSprintsStats';
import useGetAppConfig from '@/components/api/hooks/useGetAppConfig';

const classActive = 'bg-indigo-500 w-5 h-5 rounded-full shadow-2xl cursor-pointer m-2 ';
const classNonActive = 'w-3 h-3  bg-gray-300 rounded-full shadow-2xl cursor-pointer m-2 hover:scale-150 transition-all';
const ChartsPage = () => {
  useGetAppConfig('epic');
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (nr: number) => {
    setCurrentPage(() => nr);
  };

  // const handleBeforePageChange = (nr: number) => {};

  return (
    <>
      <ChartSprintsContext>
        <ReactPageScroller
          pageOnChange={handlePageChange}
          // onBeforePageScroll={handleBeforePageChange}
          customPageNumber={currentPage}
        >
          <div className=" min-h-full pr-10">
            <PredictabilitySprintsStats />
          </div>
          <div className="min-h-full pr-10">
            <SpeedSprintsStats />
          </div>
          <div className=" min-h-full pr-10">
            <ImoSprintsStats />
          </div>
          <div className=" min-h-full pr-10">
            <EpicSprintsStats />
          </div>
          <div className="min-h-full ">
            <RequestAndBugSprintCharts />
          </div>
        </ReactPageScroller>
      </ChartSprintsContext>
      <Link href={'/'}>
        <a
          title="home"
          type="button"
          className="flex items-center justify-center z-100 m-5 absolute top-1 rounded-full bg-blue-600 text-white  shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg  focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9"
        >
          <IoIosReturnLeft className="text-3xl" />
        </a>
      </Link>
      <div className="absolute top-1/2 right-2 flex flex-col justify-center align-middle items-center">
        <div
          className={`${currentPage === 0 ? classActive : classNonActive}`}
          onClick={() => handlePageChange(0)}
          title="PRZEWIDYWALNOŚĆ ZESPOŁU"
        ></div>
        <div
          className={`${currentPage === 1 ? classActive : classNonActive}`}
          onClick={() => handlePageChange(1)}
          title="PRĘDKOŚĆ ZESPOŁU"
        ></div>
        <div
          className={`${currentPage === 2 ? classActive : classNonActive}`}
          onClick={() => handlePageChange(2)}
          title="INNOVATION VS. MAINTENANCE"
        ></div>
        <div
          className={`${currentPage === 3 ? classActive : classNonActive}`}
          onClick={() => handlePageChange(3)}
          title="epics"
        ></div>
        <div
          className={`${currentPage === 4 ? classActive : classNonActive}`}
          onClick={() => handlePageChange(4)}
          title="bug & request"
        ></div>
      </div>
    </>
  );
};

export default ChartsPage;
