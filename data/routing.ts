import { IconType } from "react-icons/lib";
import { ImHome } from "react-icons/im";
import { AiOutlineAreaChart } from "react-icons/ai";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { MdOutlineBackupTable } from "react-icons/md";
import { GoSettings } from "react-icons/go";



export const navBarData: Array<NavLink> = [
  {
    label: "Główna",
    id: 1,
    path: "/",
    icon: ImHome,
  },
  {
    label: "Wykresy",
    id: 2,
    path: "/charts",
    icon: AiOutlineAreaChart,
  },
  {
    label: "Najnowszy sprint",
    id: 3,
    path: "/latest-sprint",
    icon: HiOutlinePresentationChartBar,
  },
  {
    label: "Lista sprintów",
    id: 4,
    path: "/sprint-list",
    icon: MdOutlineBackupTable,
  },
  {
    label: "config",
    id: 5,
    path: "/works",
    icon: GoSettings,
  },
];
