import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { type DefaultColors } from 'tailwindcss/types/generated/colors';
import useColors from '@/hooks/useColors';
import useGetAppConfig from '@/hooks/useGetAppConfig';
import { type AppConfigResponse, type EpicConfigResponse } from '@/models/AppConfig';
import { type SprintWithStats } from '@/models/Sprint';
import { useSprintsContext } from '../store/ChartSprintsContext';


const StackedSprintsBar = dynamic(() => import('./StackedSprintsBar'), {
  ssr: false,
});

type Group = { labels: Array<string>; datasets: Array<Dataset> };

type Dataset = {
  label: string;
  data: Array<number>;
  backgroundColor: string;
};
const setGr = (data: SprintWithStats[], epicList: Array<AppConfigResponse>, colors: DefaultColors): Group => {
  const filteredEpicList = epicList.filter((cfg) => cfg.type === 'epic') as Array<EpicConfigResponse>;
  const labels: Array<string> = [];
  const datasets: Array<Dataset> = filteredEpicList.map((group) => {
    return {
      label: group.name,
      backgroundColor: colors[group.colorPalette][group.numPalette],
      data: [],
    };
  });

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
    let indexx = -1;
    const result = issues.reduce((r, a) => {
      if (!a.EpicGroup) return r;
      r[a.EpicGroup] = r[a.EpicGroup] || 0;
      r[a.EpicGroup] = r[a.EpicGroup] + Number(a.Hours);

      return r;
    }, Object.create(null));

    const allEpicGroups = Object.fromEntries(
      filteredEpicList.map((cfg) => {
        return [cfg.name, 0];
      })
    );

    const mappedresult = { ...allEpicGroups, ...result };

    Object.entries(mappedresult).forEach(([key, value]) => {
      const index = datasets.findIndex((data) => data.label === key);
      if (index === -1) return;
      datasets[index].data.push(Number(Number(value).toFixed(2)));
    });

    issues.forEach((issue) => {
      indexx = datasets.findIndex((data) => data.label === issue.EpicGroup);
    });
  });
  console.log({ labels, datasets });
  return { labels, datasets };
};

const EpicSprintsStats = () => {
  const colors = useColors();
  const { data: epicList = [] } = useGetAppConfig('epic');
  const { data } = useSprintsContext();

  const [grouped, setGrouped] = useState<Group | null>(null);

  useEffect(() => {
    setGrouped(setGr(data, epicList, colors));
  }, [epicList, data, colors]);
  if (!grouped) return <div> Loading data....</div>;
  return (
    <div className="flex flex-col justify-center h-screen">
      <h5 className="text-2xl font-bold text-center text-indigo-800 uppercase">Epics</h5>
      <StackedSprintsBar group={grouped} />;
    </div>
  );
};

export default EpicSprintsStats;
