import React, { useEffect, useState } from "react";
import type { ChartData, InteractionItem } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Chart } from "react-chartjs-2";
import { SprintWithStats } from "@/models/Sprint";
import useColors from "./api/hooks/useColors";

type ChartType = keyof Pick<SprintWithStats, "predictability"> | "speed" | null;
type Props = {
  sprints: Array<SprintWithStats>;
  type?: ChartType;
};

const isPredictability = (type: ChartType) => {
  return type === "predictability";
};
ChartJS.register(...registerables);
const ChartSprintsBar = ({ sprints, type = null }: Props) => {
  const colors = useColors();
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    if (!sprints.length) return;
    const chartData: ChartData = {
      labels: [],
      datasets: [
        {
          label: isPredictability(type)
            ? "Przewid. ost 3 sprinty"
            : type === "speed"
            ? "Prędkość zespołu"
            : undefined,
          type: "line" as const,
          data: [],
          backgroundColor: "red",
          borderColor: "red",
          datalabels: {
            formatter: (value: string) => {
              return `${value} ${isPredictability(type) ? "%" : ""}`;
            },
            font: {
              weight: "bold",
            },
            anchor: "end",
            align: "top",
            backgroundColor: colors.white,
            borderRadius: 10,
          },
        },
        {
          label: isPredictability(type)
            ? "Przewidywalność zespołu"
            : type === "speed"
            ? "Prędkość zespołu"
            : undefined,
          data: [],
          backgroundColor: colors.indigo[900],
          // hoverOffset: 4,
          datalabels: {
            anchor: "center",
            align: "start",
            formatter: (value: string) => {
              return `${value} ${isPredictability(type) ? "%" : ""}`;
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
    chartData.datasets[1].data = sprints.map((spr: SprintWithStats) =>
      isPredictability(type) ? Number(spr.predictability) : spr.delivered
    );
    chartData.datasets[0].data = sprints.map((spr: SprintWithStats, index) =>
      isPredictability(type)
        ? Number(spr.predictabilityThree)
        : Number(spr.speedThree)
    );

    setData(chartData);
    return () => {};
  }, [sprints, type, colors.indigo, colors.white]);
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
                return `${label} ${context.raw} ${
                  isPredictability(type) ? "%" : ""
                }`;
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
