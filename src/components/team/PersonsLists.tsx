'use client';
import React, { useEffect, useState } from 'react';
import { getTwiceWeekListWithPersons, getWeekListWithPersons } from '@/api/teamProvider';
import { getCurrentWeekNumber } from '@/utils/dateHelpers';
import CheckBox from '../shared/Checkbox/CheckBox';
import ListHeader from './ListHeader';




const dailyList = getWeekListWithPersons(new Date().getFullYear());
const presentationList = getTwiceWeekListWithPersons(new Date().getFullYear());

const PersonsLists = () => {
  const [filterDailyList, setFilterDailyList] = useState(true);
  const [filterPresentationList, setFilterPresentationList] = useState(true);

  const [nextClosestDailyList, setNextClosestDailyList] = useState(
    dailyList.filter(({ weekNumber }) => weekNumber >= getCurrentWeekNumber()).slice(0, 2)
  );
  const [nextClosestPresentationList, setNextClosestPresentationList] = useState(
    presentationList.filter(({ weekNumber }) => weekNumber >= getCurrentWeekNumber()).slice(0, 4)
  );
  useEffect(() => {
    const list = dailyList.filter(({ weekNumber }) => weekNumber >= getCurrentWeekNumber());
    if (filterDailyList) {
      setNextClosestDailyList(list.slice(0, 2));
    } else {
      setNextClosestDailyList(list);
    }
    return () => {
      setNextClosestDailyList(list.slice(0, 2));
    };
  }, [filterDailyList]);

  useEffect(() => {
    
    const list = presentationList.filter(({ weekNumber }) => weekNumber >= getCurrentWeekNumber());
    if (filterPresentationList) {
      setNextClosestPresentationList(list.slice(0, 4));
    } else {
        setNextClosestPresentationList(list);
    }
    return () => {
        setNextClosestPresentationList(list.slice(0, 4));
    };
  }, [filterPresentationList]);

  return (
    <>
      <ListHeader
        label="Lista daily"
        headerComponent={
          <CheckBox
            label="filtruj tylko najbliższe"
            checked={filterDailyList}
            handleClick={() => setFilterDailyList((prev) => !prev)}
          />
        }
      >
        <>
          {nextClosestDailyList.map(({ weekNumber, person }) => {
            return (
              <div className={`${getCurrentWeekNumber() === weekNumber ? 'bg-red-500' : ''}`} key={weekNumber}>
                {weekNumber} {person.name}
              </div>
            );
          })}
        </>
      </ListHeader>
      <ListHeader
        label="Lista prezentacji"
        headerComponent={
          <CheckBox
            label="filtruj tylko najbliższe"
            checked={filterPresentationList}
            handleClick={() => setFilterPresentationList((prev) => !prev)}
          />
        }
      >
        <>
          {nextClosestPresentationList.map(({ weekNumber, person }) => {
            return (
              <div className={`${getCurrentWeekNumber() === weekNumber ? 'bg-red-500' : ''}`} key={weekNumber}>
                {weekNumber} {person.name}
              </div>
            );
          })}
        </>
      </ListHeader>
    </>
  );
};

export default PersonsLists;
