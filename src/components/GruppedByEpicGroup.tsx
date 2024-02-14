import { useState, useEffect } from 'react';
import useGetAppConfig from '@/hooks/useGetAppConfig';
import { type Issue } from '@/models/Sprint';
type Props = {
  issues: Array<Issue>;
};

type Group = {
  label: string;
  count: number;
};

const GroupedByEpicGroup = ({ issues }: Props) => {
  const { data: epicList = [] } = useGetAppConfig('epic');
  const [groupedByEpicGroup, setGroupedByEpicGroup] = useState<Group[]>([]);

  useEffect(() => {
    const grouped = issues.reduce((acc, issue) => {
      const epicObj = epicList.find(
        (cfg) => (cfg.type === 'epic' && cfg.epics?.includes(issue.EpicGroup ?? '')) ?? cfg.name === issue.EpicGroup
      );
      if (epicObj) {
        const existIndex = acc.findIndex((group) => group.label === issue.EpicGroup);
        console.log(existIndex);

        if (existIndex === -1) {
          acc = [
            ...acc,
            {
              label: epicObj.name,
              count: 1,
            },
          ];
        } else {
          acc[existIndex] !== undefined && acc[existIndex].count++;
        }
      }
      console.log(acc);
      return acc;
    }, [] as Group[]);
    setGroupedByEpicGroup(grouped);
    return () => {
      setGroupedByEpicGroup([]);
    };
  }, [issues]);

  // issues.forEach((issue) => {
  //   const epicObj = epicList.find(
  //     (cfg) => (cfg.type === 'epic' && cfg.epics?.includes(issue.EpicGroup ?? '')) ?? cfg.name === issue.EpicGroup
  //   );

  //   if (epicObj) {
  //     const existIndex = groupedByEpicGroup.findIndex((group) => group.label === issue.EpicGroup);

  //     if (existIndex === -1) {
  //       groupedByEpicGroup.push({
  //         label: epicObj.name,
  //         count: 1,
  //       });
  //     } else {
  //       groupedByEpicGroup[existIndex] !== undefined && groupedByEpicGroup[existIndex].count++;
  //     }
  //   }
  // });

  console.log(groupedByEpicGroup);

  return (
    <div className="flex justify-center gap-2 m-2">
      {groupedByEpicGroup.map((group) => {
        return (
          <div key={group.label} className='border-2 p-2 border-blue-500 border-solid'>
            {group.label} - {group.count}
          </div>
        );
      })}
    </div>
  );
};

export default GroupedByEpicGroup;
