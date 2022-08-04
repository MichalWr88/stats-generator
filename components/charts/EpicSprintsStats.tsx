import { EpicGroups, SprintWithStats, TypeofworkList } from "@/models/Sprint";
import React, { useEffect, useState } from "react";
import { useSprintsContext } from "../store/ChartSprintsContext";

import useColors from "../api/hooks/useColors";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import dynamic from "next/dynamic";
import { allEpicGroups, epicGroups } from "@/data/epicGroups";

const StackedSprintsBar = dynamic(() => import("./StackedSprintsBar"), {
  ssr: false,
});

type Group = { labels: Array<string>; datasets: Array<Dataset> };

type Dataset = {
  label: EpicGroups;
  data: Array<number>;
  backgroundColor: string;
};
const setGr = (data: SprintWithStats[], colors: DefaultColors): Group => {
  const labels: Array<string> = [];
  const datasets: Array<Dataset> = epicGroups.map((group) => {
    let dataset = {
      label: group,
      backgroundColor: "red",
      data: [],
    };
    switch (group) {
      case "CIC":
        dataset.backgroundColor = colors.red[300];
        break;
      case "NLW":
        dataset.backgroundColor = colors.indigo[400];
        break;
      case "Company Verification":
        dataset.backgroundColor = colors.orange[400];
        break;
      case "CBL":
        dataset.backgroundColor = colors.gray[400];
        break;

      default:
        break;
    }
    return dataset;
  });

  data.forEach((sprint) => {
    const { nr, start, end, issues } = sprint;
    labels.push(
      `#${nr} ${new Date(start).toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
      })} ${new Date(end).toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
      })}`
    );
    let index = -1;
    console.log(issues);
    const result = issues.reduce(function (r, a) {
      console.log(result);
      if (!a.EpicGroup) return r;
      r[a.EpicGroup] = r[a.EpicGroup] || 0;
      r[a.EpicGroup] = r[a.EpicGroup] + Number(a.Hours);

      return r;
    }, Object.create(null));
    const mappedresult = { ...allEpicGroups, ...result };
    console.log(result);
    Object.entries(mappedresult).forEach(([key, value]) => {
      const index = datasets.findIndex((data) => data.label === key);
      if (index === -1) return;
      datasets[index].data.push(Number(Number(value).toFixed(2)));
    });

    issues.forEach((issue) => {
      index = datasets.findIndex((data) => data.label === issue.EpicGroup);
    });
  });
  console.log({ labels, datasets });
  return { labels, datasets };
};

const EpicSprintsStats = () => {
  const colors = useColors();
  const { data } = useSprintsContext();

  const [grupped, setGrupped] = useState<Group | null>(null);

  useEffect(() => {
    setGrupped(setGr(data, colors));
    return () => {};
  }, [data, colors]);
  if (!grupped) return <div> Loading data....</div>;
  return (
    <div className="h-screen flex flex-col justify-center">
      <h5 className="uppercase text-indigo-800 font-bold text-2xl text-center">
        Epics
      </h5>
      <StackedSprintsBar group={grupped} />;
    </div>
  );
};

export default EpicSprintsStats;
