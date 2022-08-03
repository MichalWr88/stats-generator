import { Sprint } from "@/models/Sprint";
import {
  ChartData,
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  ChartDataLabels,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

type Props = {
  sprint: Sprint;
  type: keyof Pick<Sprint, "bug" | "request">;
};

const ChartSprintCircle = ({ sprint, type }: Props) => {
  const [data, setData] = useState<ChartData<"pie", number[], string> | null>(
    null
  );

  useEffect(() => {
    if (!sprint) return;
    const chartData: ChartData<"pie", number[], string> = {
      labels: [],
      datasets: [
        {
          label: "My First Dataset",
          data: [],
          backgroundColor: [
            "rgb(155, 159, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 225, 86)",
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(245, 215, 86)",
            "rgb(155, 255, 56)",
          ],
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
    const arrType = sprint[type];
    Object.entries(arrType).forEach(([key, value]) => {
      if (key === "_id" || Number(value) === 0) return;
      chartData.labels?.push(key.toUpperCase());
      chartData.datasets[0].data.push(value);

      return;
    });

    setData(chartData);
    return () => {};
  }, [type, sprint]);

  if (!data) return <div>Loading data ...</div>;
  return (
    <div className="flex flex-wrap p-2">
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: type.toUpperCase(),
              position: "top",
              font: {
                size: 20,
              },
            },
            legend: { display: true, position: "bottom", fullSize: true },

            datalabels: {
              formatter: (val, ctx) => {
                // Grab the label for this value
                const label = ctx.chart.data.labels?.[ctx.dataIndex];

                // // Format the number with 2 decimal places
                // const formattedVal = Intl.NumberFormat("en-US", {
                //   minimumFractionDigits: 0,
                // }).format(val);  ${label}:

                // Put them together
                return ` ${val}`;
              },

              display: true,
              align: "bottom",
              backgroundColor: "",
              borderRadius: 3,
              font: {
                size: 18,
              },
            },
          },
        }}
      />
    </div>
  );
};
export default ChartSprintCircle;
