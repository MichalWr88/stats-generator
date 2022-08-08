import React from 'react';
import ChartSprintsBar from '../ChartSprintsBar';
import { useSprintsContext } from '../store/ChartSprintsContext';

const PredictabilitySprintsStats = () => {
  const { data } = useSprintsContext();

  return (
    <div className="h-screen flex flex-col justify-center">
      <h5 className="uppercase text-indigo-800 font-bold text-2xl text-center">PRzewidywalność zespołu</h5>
      <ChartSprintsBar sprints={data} type="predictability" />
    </div>
  );
};

export default PredictabilitySprintsStats;
