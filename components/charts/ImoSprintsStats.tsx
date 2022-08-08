import { SprintWithStats, TypeofworkList } from '@/models/Sprint';
import React, { useEffect, useState } from 'react';
import { useSprintsContext } from '../store/ChartSprintsContext';

import useColors from '../../components/api/hooks/useColors';
import { DefaultColors } from 'tailwindcss/types/generated/colors';
import dynamic from 'next/dynamic';

const StackedSprintsBar = dynamic(() => import('./StackedSprintsBar'), {
  ssr: false,
});

type Group = { labels: Array<string>; datasets: Array<Dataset> };

type Dataset = {
  label: TypeofworkList;
  data: Array<number>;
  backgroundColor: string;
};
const setGr = (data: SprintWithStats[], colors: DefaultColors): Group => {
  const labels: Array<string> = [];
  const datasets: Array<Dataset> = [
    {
      label: 'Organization',
      backgroundColor: colors.green[300],
      data: [],
    },
    {
      label: 'Bugs',
      data: [],
      backgroundColor: colors.red[300],
    },
    {
      label: 'Innovation',
      data: [],
      backgroundColor: colors.indigo[300],
    },
    {
      label: 'Maintenance',
      data: [],
      backgroundColor: colors.orange[300],
    },
  ];
  data.forEach((sprint) => {
    const { nr, start, end, issues } = sprint;
    labels.push(
      `#${nr} ${new Date(start).toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
      })} ${new Date(end).toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
      })}`
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let index = -1;

    const result = issues.reduce(function (r, a) {
      if (!a.Typeofwork) return;
      r[a.Typeofwork] = r[a.Typeofwork] || 0;
      r[a.Typeofwork] = r[a.Typeofwork] + Number(a.Hours);
      return r;
    }, Object.create(null));

    Object.entries(result).forEach(([key, value]) => {
      const index = datasets.findIndex((data) => data.label === key);
      datasets[index].data.push(Number(Number(value).toFixed(2)));
    });

    issues.forEach((issue) => {
      index = datasets.findIndex((data) => data.label === issue.Typeofwork);
    });
  });
  console.log({ labels, datasets });
  return { labels, datasets };
};

const ImoSprintsStats = () => {
  const colors = useColors();
  const { data } = useSprintsContext();

  const [grupped, setGrupped] = useState<Group | null>(null);

  useEffect(() => {
    setGrupped(setGr(data, colors));
  }, [data, colors]);
  if (!grupped) return <div> Loading data....</div>;
  return (
    <div className="h-screen flex flex-col justify-center">
      <h5 className="uppercase text-indigo-800 font-bold text-2xl text-center">Innovation vs. Maintenance</h5>
      <StackedSprintsBar group={grupped} />;
    </div>
  );
};

export default ImoSprintsStats;
