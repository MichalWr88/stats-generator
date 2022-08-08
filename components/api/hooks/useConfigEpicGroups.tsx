import { ConfigMapperGroup } from '@/models/Sprint';
import { useMemo } from 'react';
import useColors from './useColors';

const useConfigEpicGroups = () => {
  const colors = useColors();
  const configMapperGroup = useMemo(() => {
    const arr: Array<ConfigMapperGroup> = [
      {
        name: 'NLW',
        epics: ['CSS-3371', 'CSS-3682', 'CSS-3753', 'CSS-2417'],
        texts: ['NLW', 'Oppportunity'],
        color: colors.violet[400],
      },
      {
        name: 'CIC',
        epics: ['CSS-1169', 'CSS-3062', 'CSS-2849', 'CSS-2542', 'CSS-2118'],
        texts: ['cic', 'ssi'],
        color: colors.indigo[200],
      },
      {
        name: 'Synerise Adapter',
        epics: ['CSS-4557', 'CSS-4122'],
        texts: ['Synerise', 'Adapter'],
        color: colors.yellow[200],
      },
      {
        name: 'Company Monitor',
        epics: ['CSS-2198'],
        texts: ['Monitor', 'CM'],
        color: colors.stone[100],
      },
      {
        name: 'Company Verification',
        epics: ['CSS-1739', 'CSS-2665'],
        texts: ['Verification', 'CV'],
        color: colors.orange[200],
      },
      {
        name: 'Compliance',
        epics: ['CSS-2058'],
        texts: ['Compliance', 'COC'],
        color: colors.cyan[400],
      },

      {
        name: 'RCP',
        epics: [],
        texts: ['RCP'],
        color: colors.red[300],
      },
      {
        name: 'CBL',
        epics: [],
        texts: ['CBL'],
        color: colors.fuchsia[300],
      },
      {
        name: 'Sherlock',
        epics: [],
        texts: ['Sherlock'],
        color: colors.teal[300],
      },
      {
        name: 'CEDC',
        epics: [],
        texts: ['CEDC'],
        color: colors.orange[300],
      },
      {
        name: 'Billings',
        epics: [],
        texts: ['Billings'],
        color: colors.green[400],
      },
      {
        name: 'Transoffice',
        epics: [],
        texts: ['Transoffice'],
        color: colors.teal[400],
      },
      {
        name: 'API Facade',
        epics: [],
        texts: ['Facade'],
        color: colors.yellow[500],
      },
    ];

    return arr;
  }, [
    colors.cyan,
    colors.fuchsia,
    colors.green,
    colors.indigo,
    colors.orange,
    colors.red,
    colors.stone,
    colors.teal,
    colors.violet,
    colors.yellow,
  ]);

  return configMapperGroup;
};

export default useConfigEpicGroups;
