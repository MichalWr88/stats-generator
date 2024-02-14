import React from 'react';
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
  const groupedByEpicGroup: Group[] = [];

  issues.reduce((acc, issue) => {
    const epicObj = epicList.find(
      (cfg) => (cfg.type === 'epic' && cfg.epics?.includes(issue.EpicGroup ?? '')) ?? cfg.name === issue.EpicGroup
    );

    if (epicObj) {
      const existIndex = acc.findIndex((group) => group.label === issue.EpicGroup);

      if (existIndex === -1) {
        acc.push({
          label: epicObj.name,
          count: 1,
        });
      } else {
        acc[existIndex] !== undefined && acc[existIndex].count++;
      }
    }

    return acc;
  }, [] as Group[]);

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
    <div>
      {groupedByEpicGroup.map((group) => {
        return (
          <div key={group.label}>
            {group.label} - {group.count}
          </div>
        );
      })}
    </div>
  );
};

export default GroupedByEpicGroup;
