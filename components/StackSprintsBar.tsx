import React, { useEffect, useState } from "react";
import type { ChartData, InteractionItem } from "chart.js";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";
import { SprintWithStats } from "@/models/Sprint";
type Props = {
  sprints: Array<SprintWithStats>;
};
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const StackSprintsBar = ({sprint}: Props) => {
    const [data, setData] = useState<ChartData<"bar", number[], string> | null>(
        null
      );
    
      useEffect(() => {
        if (!sprints.length) return;
        const chartData = {
          title: "dupa jasna",
          labels: [],
          datasets: [
            {
              label: "My First Dataset",
              data: [],
              backgroundColor:'blue',
              // borderColor:"grey",
              // borderColor:[
              //   "rgb(155, 159, 132)",
              //   "rgb(54, 162, 235)",
              //   "rgb(255, 225, 86)",
              //   "rgb(255, 99, 132)",
              //   "rgb(54, 162, 235)",
              //   "rgb(245, 215, 86)",
              //   "rgb(155, 255, 56)",
              // ],
              hoverOffset: 4,
            },
          ],
        };
    
        chartData.labels = sprints.map((spr: SprintWithStats) => `${spr.nr}`);
        chartData.datasets[0].data = sprints.map((spr: SprintWithStats) => spr.delivered);
    
        setData(chartData);
        return () => {};
      }, [sprints]);
      if (!data) return <div>Loading data ...</div>;
      return <Chart type="bar" data={data} />;
}

export default StackSprintsBar