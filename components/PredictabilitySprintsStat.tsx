import React, { useContext } from "react";
import ChartSprintsBar from "./ChartSprintsBar";
import { SprintsContext, useSprintsContext } from "./store/ChartSprintsContext";

const PredictabilitySprintsStat = () => {
  const { data } = useSprintsContext();

  return <ChartSprintsBar sprints={data} />;
};

export default PredictabilitySprintsStat;
