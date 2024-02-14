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
  epics?: Array<string>;
  label: string;
  data: Array<number>;
  backgroundColor: string;
};
const setGr = (data: SprintWithStats[], epicList: Array<AppConfigResponse>, colors: DefaultColors): Group => {
  console.log({ data, epicList });
  const filteredEpicList = epicList.filter((cfg) => cfg.type === 'epic') as Array<EpicConfigResponse>;
  const labels: Array<string> = [];
  const datasets: Array<Dataset> = filteredEpicList.map((group) => {
    return {
      epics: group.epics,
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

    const allEpicGroups = Object.fromEntries(
      filteredEpicList.map((cfg) => {
        return [cfg.name, 0];
      })
    );

    issues.forEach((issue) => {
      const epicObj = filteredEpicList.find(
        (cfg) => cfg.epics?.includes(issue.EpicGroup ?? '') ?? cfg.name === issue.EpicGroup
      );
      if (epicObj) {
        const inEpicsList = epicObj.epics?.includes(issue.EpicGroup ?? '');
        if (inEpicsList) {
          allEpicGroups[epicObj.name] = Number(allEpicGroups[epicObj.name]) + Number(issue.Hours);
          return;
        }
        allEpicGroups[epicObj.name] = Number(allEpicGroups[epicObj.name]) + Number(issue.Hours);
      }
    });

    const mappedresult = { ...allEpicGroups };

    Object.entries(mappedresult).forEach(([key, value]) => {
      const index = datasets.findIndex((data) => (data.epics ? data.epics.includes(key ?? '') : data.label === key));
      if (index === -1) return;
      datasets?.[index]?.data.push(Number(Number(value).toFixed(2)));
    });
  });
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
