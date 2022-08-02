import React, { useEffect, useState } from "react";
import type { ChartData, InteractionItem } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
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
import useColors from "./api/hooks/useColors";
type Props = {
  sprints: Array<SprintWithStats>;
  type: keyof Pick<SprintWithStats, "predictability"> | "speed" | null;
};
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ChartDataLabels
);

const ChartSprintsBar = ({ sprints, type = null }: Props) => {
  const colors = useColors()
  const [data, setData] = useState<ChartData<"bar", number[], string> | null>(
    null
  );

  useEffect(() => {
    if (!sprints.length) return;
    const chartData = {
      labels: [],
      datasets: [
        {
          label:
            type === "predictability"
              ? "Przewid. ost 3 sprinty"
              : type === "speed"
              ? "Prędkość zespołu"
              : type,
          type: "line",
          data: [],
          backgroundColor: "red",
          borderColor: "red",
          hoverOffset: 4,
          datalabels: {
            anchor: "end",
            align: "start",
          },
        },
        {
          label:
            type === "predictability"
              ? "Przewidywalność zespołu"
              : type === "speed"
              ? "Prędkość zespołu"
              : type,
          data: [],
          backgroundColor: colors.indigo[900],
          hoverOffset: 4,
          datalabels: {
            anchor: "middle",
            align: "start",
            formatter: (value: string) => {
              return value + "%";
            },
            color: "white",
            font: {
              weight: "bold",
            },
          },
        },
      ],
    };

    chartData.labels = sprints.map(
      (spr: SprintWithStats) =>
        `#${spr.nr} ${new Date(spr.start).toLocaleDateString("pl-Pl", {
          day: "2-digit",
          month: "2-digit",
        })}-${new Date(spr.end).toLocaleDateString("pl-Pl", {
          day: "2-digit",
          month: "2-digit",
        })}`
    );
    chartData.datasets[1].data = sprints.map(
      (spr: SprintWithStats) => spr.predictability
    );
    chartData.datasets[0].data = sprints.map(
      (spr: SprintWithStats, index) => spr.predictabilityThree
    );

    setData(chartData);
    return () => {};
  }, [sprints, type]);
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
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                return label + " " + context.raw + "%";
              },
            },
          },
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
        elements: {
          line: {
            fill: true,
            tension: 0.3,
          },
          point: {
            hoverRadius: 7,
            radius: 5,
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      }}
    />
  );
};

export default ChartSprintsBar;
