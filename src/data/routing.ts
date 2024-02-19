
import { type NavLinkData } from '@/models/Routing';



export const navBarData: Array<NavLinkData> = [
  {
    label: 'Główna',
    id: 1,
    path: '/',
    isAuth: false,
    // icon: ImHome,
  },
  {
    label: 'Wykresy',
    id: 2,
    path: '/charts',
    isAuth: false,
    // icon: AiOutlineAreaChart,
  },
  // {
  //   label: 'Najnowszy sprint',
  //   id: 3,
  //   path: '/current-sprint',
  // icon: HiOutlinePresentationChartBar,
  // },
  {
    label: 'Lista sprintów',
    id: 4,
    path: '/sprint-list',
    // icon: MdOutlineBackupTable,
    isAuth: false,
  },
  {
    label: 'dodaj sprint',
    id: 5,
    path: '/add-sprint',
    // icon: MdLibraryAdd,
    isAuth: true,
  },
  {
    label: 'config',
    id: 6,
    path: '/config',
    isAuth: true,
    // icon: GoSettings,
  },
  {
    label: 'instrukcja',
    id: 7,
    path: '/instruction',
    isAuth: false,
    // icon: ImBooks,
  },
];
