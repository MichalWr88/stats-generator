import { SprintWithStats } from "@/models/Sprint";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { setStatsSpritnts } from "utils/SprintsMapper";
import { getAllSprints } from "../api/dataProvider";

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
  const [data, setData] = useState<Array<SprintWithStats>>([]);

  useEffect(() => {
    getAllSprints().then((resp) => {
      setData(() => {
        return setStatsSpritnts(resp.data.reverse()).splice(2);
      });
    });
    return () => {};
  }, []);

  return (
    <SprintsContext.Provider value={{ data }}>
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
