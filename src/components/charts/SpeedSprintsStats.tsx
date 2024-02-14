import React from 'react';
import { useSprintsContext } from '../store/ChartSprintsContext';
import ChartSprintsBar from './ChartSprintsBar';

const SpeedSprintsStats = () => {
  const { data } = useSprintsContext();

  return (
    <div className="h-screen flex flex-col justify-center">
      <h5 className="uppercase text-indigo-800 font-bold text-2xl text-center">Prędkość zespołu</h5>
      <ChartSprintsBar sprints={data} type="speed" />
    </div>
  );
};
export default SpeedSprintsStats;
