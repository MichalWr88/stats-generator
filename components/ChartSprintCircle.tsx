import { Sprint } from "@/models/Sprint";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type Props = {
  sprint: Sprint;
  type: keyof Pick<Sprint,"bug" | "request">;
};

const ChartSprintCircle = ({ sprint, type }: Props) => {
  const [data, setData] = useState<ChartData<
    "pie",
    number[],
    string
  > | null>(null);


  useEffect(() => {
    if (!sprint) return;
    const chartData = {
      title: "dupa jasna",
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
    const arrType = sprint[type]
    Object.entries(arrType).forEach(([key, value]) => {
      if (key === "_id" || Number(value) ===  0) return;
      chartData.labels.push(key);
      chartData.datasets[0].data.push(value);

      return;
    });

    setData(chartData);
    return () => {};
  }, [type, sprint]);

  if (!data) return <div>Loading data ...</div>;
  return (
    <div className="flex flex-col justify-center items-center">
      <h6 className="mr-36 uppercase">{type}</h6>
      <Pie
        data={data}
        options={{
          plugins: {
            legend: { display: true ,position:"right"},

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
