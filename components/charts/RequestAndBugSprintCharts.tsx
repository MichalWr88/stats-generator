import React, { useState } from "react";
import ChartSprintCircle from "../ChartSprintCircle";
import { useSprintsContext } from "../store/ChartSprintsContext";

type Props = {};

const RequestAndBugSprintCharts = (props: Props) => {
  const { data } = useSprintsContext();

  const [activeSprint, setActiveSprint] = useState(data[data.length - 1]);
  return (
    <div className="flex flex-wrap h-screen p-2 w-screen items-center justify-center content-start">
      <h5 className="w-full flex items-center justify-center">
        <div className="font-bold p-2 border-2 border-pink-700 text-center">
        Sprint: #{activeSprint.nr}{" "}
        {new Date(activeSprint.start).toLocaleDateString("pl-PL")}-
        {new Date(activeSprint.end).toLocaleDateString("pl-PL")}
        </div>
      </h5>
      <div className=" h-10 w-2/5">
        <ChartSprintCircle sprint={activeSprint} type="bug" />
      </div>
      <div className="h-10 w-2/5">
        <ChartSprintCircle sprint={activeSprint} type="request" />
      </div>
    </div>
  );
};

export default RequestAndBugSprintCharts;
