import React, { useEffect, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { SprintWithStats } from '@/models/Sprint';

type ChartType = keyof Pick<SprintWithStats, 'predictability'> | 'speed' | null;
type Props = {
  sprints: Array<SprintWithStats>;
  type?: ChartType;
};
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
const isPredictability = (type: ChartType) => {
  return type === 'predictability';
};

const ChartSprintsBar = ({ sprints, type = null }: Props) => {
  const colors = useColors();
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    if (!sprints.length) return;
    const chartData: ChartData = {
      labels: [],
      datasets: [
        {
          label: isPredictability(type) ? 'Przewid. ost 3 sprinty' : type === 'speed' ? 'Prędkość zespołu' : undefined,
          type: 'line' as const,
          data: [],
          backgroundColor: 'transparent',
          borderColor: colors.red[600],
          pointBackgroundColor: colors.red[600],
          datalabels: {
            formatter: (value: string) => {
              return `${value} ${isPredictability(type) ? '%' : ''}`;
            },
            font: {
              weight: 'bold',
            },
            anchor: 'end',
            align: 'top',
            backgroundColor: colors.white,
            color: colors.red[600],
            borderRadius: 10,
            borderColor: colors.red[600],
            borderWidth: 1,
          },
        },
        {
          label: isPredictability(type) ? 'Przewidywalność zespołu' : type === 'speed' ? 'Prędkość zespołu' : undefined,
          data: [],
          backgroundColor: colors.indigo[900],
          // hoverOffset: 4,
          datalabels: {
            anchor: 'center',
            align: 'start',
            formatter: (value: string) => {
              return `${value} ${isPredictability(type) ? '%' : ''}`;
            },
            color: 'white',
            font: {
              weight: 'bold',
            },
          },
        },
      ],
    };

    chartData.labels = sprints.map(
      (spr: SprintWithStats) =>
        `#${spr.nr} ${new Date(spr.start).toLocaleDateString('pl-Pl', {
          day: '2-digit',
          month: '2-digit',
        })}-${new Date(spr.end).toLocaleDateString('pl-Pl', {
          day: '2-digit',
          month: '2-digit',
        })}`
    );
    chartData.datasets[1].data = sprints.map((spr: SprintWithStats) =>
      isPredictability(type) ? Number(spr.predictability) : spr.delivered
    );
    chartData.datasets[0].data = sprints.map((spr: SprintWithStats) =>
      isPredictability(type) ? Number(spr.predictabilityThree) : Number(spr.speedThree)
    );

    setData(chartData);
  }, [sprints, type, colors.indigo, colors.white, colors.red]);
  if (!data) return <div>Loading data ...</div>;
  return (
    <Chart
      height={'22vh'}
      width={'50vh'}
      type="bar"
      data={data}
      options={{
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.dataset.label || '';
                return `${label} ${context.raw} ${isPredictability(type) ? '%' : ''}`;
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
