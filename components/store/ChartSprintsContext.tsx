import { SprintWithStats } from "@/models/Sprint";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { setStatsSpritnts } from "utils/SprintsMapper";
import useGetSprints from "../api/hooks/useGetSprints";

export interface ContextData {
  data: Array<SprintWithStats>;
}

type Props = {
  children: ReactNode;
};
export const SprintsContext = React.createContext<ContextData | null>({
  data: [],
});

const ChartSprintsContext = ({ children }: Props) => {
  const [sprintsList, setSprintsList] = useState<Array<SprintWithStats>>([]);
  const { data } = useGetSprints();
  useEffect(() => {
    if (!data) return;
    const list = data.data.reverse();

    setSprintsList(() => {
      return setStatsSpritnts(list).splice(2);
    });

    return () => {
      setSprintsList([]);
    };
  }, [data]);

  return (
    <SprintsContext.Provider value={{ data: sprintsList }}>
      {children}
    </SprintsContext.Provider>
  );
};
export const useSprintsContext = () => {
  const context = useContext(SprintsContext);
  if (!context) {
    throw Error("ChartSprintsContext is undefined");
  }
  return context;
};
export default ChartSprintsContext;
