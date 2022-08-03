import { TypeofworkList } from "@/models/Sprint";
import {
  ChartData,
  Chart as ChartJS,
  ChartTypeRegistry,
  BubbleDataPoint,
  ScatterDataPoint,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

// import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";
type Group = { labels: Array<string>; datasets: Array<Dataset> };

type Dataset = {
  label: TypeofworkList;
  data: Array<number>;
};
type Props = {
  group: Group;
};

// ChartJS.register(ChartjsPluginStacked100);
const StackedSprintsBar = ({ group }: Props) => {

  const [data, setData] = useState<ChartData<"bar", number[], unknown> | null>(
    null
  );

  useEffect(() => {
    if (!group) return;
    const chartData = {
      labels: group.labels,
      datasets: group.datasets,
    };

    setData(chartData);
    return () => {};
  }, [group]);
  if (!data) return <div>Loading data ...</div>;

  return (
    <Chart
      height={"22vh"}
      width={"50vh"}
      type="bar"
      data={data}
      options={{
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
          // stacked100: {
          //   enable: true,
          //   replaceTooltipLabel: false,
          // },
          datalabels: {
            formatter: (_value, context) => {
              const data = context.chart.data as unknown as ChartData<
                keyof ChartTypeRegistry,
                (number | ScatterDataPoint | BubbleDataPoint | null)[],
                unknown
              > & { calculatedData: { [key: number]: Array<number> } };
              const { datasetIndex, dataIndex } = context;
              return `${data.calculatedData[datasetIndex][dataIndex]}%`;
            },
          },
          // tooltip: {
          //   callbacks: {
          //     label: function (context) {
          //       let label = context.dataset.label || "";
          //       return `${label} ${context.raw} ${"%"}`;
          //     },
          //   },
          // },
        },

        // Core options
        // aspectRatio: 2 / 2,
        layout: {
          padding: {
            top: 0,
            right: 16,
            bottom: 0,
            left: 8,
          },
        },
        // elements: {
        //   line: {
        //     fill: true,
        //     tension: 0.3,
        //   },
        //   point: {
        //     hoverRadius: 7,
        //     radius: 5,
        //   },
        // },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            beginAtZero: true,
            stacked: true,
          },
        },
      }}
    />
  );
};

export default StackedSprintsBar;
