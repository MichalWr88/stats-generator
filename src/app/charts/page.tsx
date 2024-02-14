'use client';
import Link from 'next/link';
import { useState } from 'react';
import { IoIosReturnLeft } from 'react-icons/io';
import ReactPageScroller,{} from 'react-page-scroller';
import EpicSprintsStats from '@/components/charts/EpicSprintsStats';
import ImoSprintsStats from '@/components/charts/ImoSprintsStats';
import PredictabilitySprintsStats from '@/components/charts/PredictabilitySprintsStats';
import RequestAndBugSprintCharts from '@/components/charts/RequestAndBugSprintCharts';
import SpeedSprintsStats from '@/components/charts/SpeedSprintsStats';
import ChartSprintsContext from '@/components/store/ChartSprintsContext';
import useGetAppConfig from '@/hooks/useGetAppConfig';

const classActive = 'bg-indigo-500 w-5 h-5 rounded-full shadow-2xl cursor-pointer m-2 ';
const classNonActive = 'w-3 h-3  bg-gray-300 rounded-full shadow-2xl cursor-pointer m-2 hover:scale-150 transition-all';
const ChartsPage = () => {
  useGetAppConfig('epic');
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (nr: number) => {
    setCurrentPage(() => nr);
  };



  return (
    <>
      <ChartSprintsContext>
        <ReactPageScroller
          pageOnChange={handlePageChange}
          // onBeforePageScroll={handleBeforePageChange}
          customPageNumber={currentPage}
        >
          <div className="min-h-full pr-10 ">
            <PredictabilitySprintsStats />
          </div>
          <div className="min-h-full pr-10">
            <SpeedSprintsStats />
          </div>
          <div className="min-h-full pr-10 ">
            <ImoSprintsStats />
          </div>
          <div className="min-h-full pr-10 ">
            <EpicSprintsStats />
          </div>
          <div className="min-h-full ">
            <RequestAndBugSprintCharts />
          </div>
        </ReactPageScroller>
      </ChartSprintsContext>
      <Link href={'/'}>
        <button
          title="home"
          className="absolute left-0 flex items-center justify-center m-5 text-white transition duration-150 ease-in-out bg-blue-600 rounded-full shadow-lg z-100 top-1 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:ring-0 active:bg-blue-800 active:shadow-lg w-9 h-9"
        >
          <IoIosReturnLeft className="text-3xl" />
        </button>
      </Link>
      <div className="absolute flex flex-col items-center justify-center align-middle top-1/2 right-2">
        <button
          className={`${currentPage === 0 ? classActive : classNonActive}`}
          onClick={() => handlePageChange(0)}
          title="PRZEWIDYWALNOŚĆ ZESPOŁU"
        ></button>
        <button
          className={`${currentPage === 1 ? classActive : classNonActive}`}
          onClick={() => handlePageChange(1)}
          title="PRĘDKOŚĆ ZESPOŁU"
        ></button>
        <button
          className={`${currentPage === 2 ? classActive : classNonActive}`}
          onClick={() => handlePageChange(2)}
          title="INNOVATION VS. MAINTENANCE"
        ></button>
        <button
          className={`${currentPage === 3 ? classActive : classNonActive}`}
          onClick={() => handlePageChange(3)}
          title="epics"
        ></button>
        <button
          className={`${currentPage === 4 ? classActive : classNonActive}`}
          onClick={() => handlePageChange(4)}
          title="bug & request"
        ></button>
      </div>
    </>
  );
};

export default ChartsPage;
