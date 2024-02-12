import React from 'react';
import { type Issue } from '@/models/Sprint';

type Props = {
  issues: Array<Issue>;
};

const GroupedByEpicGroup = ({ issues }: Props) => {
  const groupedByEpicGroup = issues.reduce<Issue>((grouped, issue) => {
    const key = issue.EpicGroup as keyof Issue;
    if (!key) {
      return grouped;
    }
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(issue);
    return grouped;
  }, {});

  console.log(groupedByEpicGroup);

  return <div>GroupedByEpicGroup</div>;
};

export default GroupedByEpicGroup;
