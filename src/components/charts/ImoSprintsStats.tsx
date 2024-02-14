import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { type DefaultColors } from 'tailwindcss/types/generated/colors';
import { allImoGroups } from '@/data/epicGroups';
import useColors from '@/hooks/useColors';
import { type TypeofworkList, type SprintWithStats } from '@/models/Sprint';
import { useSprintsContext } from '../store/ChartSprintsContext';

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

    const result = issues.reduce(
      (r, a) => {
        if (!a.Typeofwork) return;
        r[a.Typeofwork] = r[a.Typeofwork] || 0;
        r[a.Typeofwork] = r[a.Typeofwork] + Number(a.Hours);

        return r;
      },
      {
        Organization: 0,
        Bugs: 0,
        Innovation: 0,
        Maintenance: 0,
      }
    );
    const mappedresult = { ...allImoGroups, ...result };
    Object.entries(mappedresult).forEach(([key, value]) => {
      const index = datasets.findIndex((data) => data.label === key);
      datasets[index].data.push(Number(Number(value).toFixed(2)));
    });
  });

  return { labels, datasets };
};

const ImoSprintsStats = () => {
  const colors = useColors();
  const { data } = useSprintsContext();

  const [grouped, setGrouped] = useState<Group | null>(null);

  useEffect(() => {
    setGrouped(setGr(data, colors));
  }, [data, colors]);
  if (!grouped) return <div> Loading data....</div>;
  return (
    <div className="flex flex-col justify-center h-screen">
      <h5 className="text-2xl font-bold text-center text-indigo-800 uppercase">Innovation vs. Maintenance</h5>
      <StackedSprintsBar group={grouped} />;
    </div>
  );
};

export default ImoSprintsStats;
