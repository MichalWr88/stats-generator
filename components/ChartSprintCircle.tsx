import { Sprint } from '@/models/Sprint';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import useColors from './api/hooks/useColors';
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
  type: keyof Pick<Sprint, 'bug' | 'request'>;
};

const ChartSprintCircle = ({ sprint, type }: Props) => {
  const colors = useColors();
  const [data, setData] = useState<ChartData<'pie', number[], string> | null>(null);

  useEffect(() => {
    if (!sprint) return;
    const chartData: ChartData<'pie', number[], string> = {
      labels: [],
      datasets: [
        {
          label: 'My First Dataset',
          data: [],
          backgroundColor: [
            colors.green[400],
            colors.indigo[400],
            colors.orange[400],
            colors.red[400],
            colors.cyan[400],
            colors.amber[400],
          ],
          hoverOffset: 4,
        },
      ],
    };
    const arrType = sprint[type];
    Object.entries(arrType).forEach(([key, value]) => {
      if (key === '_id') return;
      chartData.labels?.push(key.toUpperCase());
      chartData.datasets[0].data.push(value);

      return;
    });

    setData(chartData);
  }, [type, sprint, colors.green, colors.indigo, colors.orange, colors.red, colors.cyan, colors.amber]);

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
              position: 'top',
              font: {
                size: 20,
              },
            },
            legend: { display: true, position: 'bottom', fullSize: true },

            datalabels: {
              formatter: (val) => {
                if (val === 0) return '';
                return ` ${val}`;
              },

              display: true,
              align: 'bottom',
              backgroundColor: '',
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
