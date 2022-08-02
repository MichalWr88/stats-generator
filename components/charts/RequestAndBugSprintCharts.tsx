import React, { useState } from "react";
import ChartSprintCircle from "../ChartSprintCircle";
import { useSprintsContext } from "../store/ChartSprintsContext";

type Props = {};

const RequestAndBugSprintCharts = (props: Props) => {
  const { data } = useSprintsContext();

  const [activeSprint, setActiveSprint] = useState(data[data.length - 1]);
  return (
    <div className="grid grid-cols-2 relative grid-rows-6  h-screen">
      <h5 className="col-span-2 self-end font-bold	place-self-center p-2 border-2 border-pink-700">
        Sprint: #{activeSprint.nr}{" "}
        {new Date(activeSprint.start).toLocaleDateString("pl-PL")}-
        {new Date(activeSprint.end).toLocaleDateString("pl-PL")}
      </h5>
      <div className="row-span-2 row-start-2">
        <ChartSprintCircle sprint={activeSprint} type="bug" />
      </div>
      <div className="row-span-2 row-start-2">
        <ChartSprintCircle sprint={activeSprint} type="request" />
      </div>
    </div>
  );
};

export default RequestAndBugSprintCharts;
