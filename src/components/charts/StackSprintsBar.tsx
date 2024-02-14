import {
  type ChartData,
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
import  { useEffect, useState } from 'react';

import { Chart } from 'react-chartjs-2';
import { type SprintWithStats } from '@/models/Sprint';

type Props = {
  sprints: Array<SprintWithStats>;
};
ChartJS.register(
  Chart as unknown as ChartJS,
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
  SubTitle
);

const StackSprintsBar = ({ sprints }: Props) => {
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    if (!sprints.length) return;
    const chartData = {
      labels: sprints.map((spr: SprintWithStats) => `${spr.nr}`),
      datasets: [
        {
          label: 'My First Dataset',
          data: sprints.map((spr: SprintWithStats) => spr.delivered),
          backgroundColor: 'blue',
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

    setData(chartData);
  }, [sprints]);
  if (!data) return <div>Loading data ...</div>;
  return <Chart type="bar" data={data} />;
};

export default StackSprintsBar;
