import { ImHome, ImBooks } from 'react-icons/im';
import { AiOutlineAreaChart } from 'react-icons/ai';
import { HiOutlinePresentationChartBar } from 'react-icons/hi';
import { MdOutlineBackupTable, MdLibraryAdd } from 'react-icons/md';
import { GoSettings } from 'react-icons/go';

import { NavLinkData } from '@/models/Routing';

export const navBarData: Array<NavLinkData> = [
  {
    label: 'Główna',
    id: 1,
    path: '/',
    icon: ImHome,
  },
  {
    label: 'Wykresy',
    id: 2,
    path: '/charts',
    icon: AiOutlineAreaChart,
  },
  {
    label: 'Najnowszy sprint',
    id: 3,
    path: '/current-sprint',
    icon: HiOutlinePresentationChartBar,
  },
  {
    label: 'Lista sprintów',
    id: 4,
    path: '/sprint-list',
    icon: MdOutlineBackupTable,
  },
  {
    label: 'dodaj sprint',
    id: 5,
    path: '/add-sprint',
    icon: MdLibraryAdd,
  },
  {
    label: 'config',
    id: 6,
    path: '/config',
    icon: GoSettings,
  },
  {
    label: 'instrukcja',
    id: 7,
    path: '/instruction',
    icon: ImBooks,
  },
];
