import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import { EventResponse } from 'src/models/Events';

const getWeekNumber = (current: string | Date) => {
  const currentDate = new Date(current);
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil(days / 7);
};

const currentWeek = getWeekNumber(new Date());

const lastWeek = getWeekNumber(new Date(new Date().getFullYear(), 11, 31));

type EventConfigObj = {
  name: string;
  className: string;
};

const teamListDaily: Array<EventConfigObj> = [
  {
    name: 'Michał',
    className: 'bg-yellow-400',
  },
  {
    name: 'Daniel',
    className: 'bg-red-400',
  },
  {
    name: 'Marcin',
    className: 'bg-violet-400',
  },
  {
    name: 'Marek',
    className: 'bg-lime-400',
  },
  {
    name: 'Tomek',
    className: 'bg-blue-400',
  },
];
const teamListRetro: Array<EventConfigObj> = [
  {
    name: 'Michał',

    className: 'bg-slate-400',
  },
  {
    name: 'Marcin',

    className: 'bg-slate-400',
  },
  {
    name: 'Daniel',

    className: 'bg-slate-400',
  },
  {
    name: 'Marek',

    className: 'bg-slate-400',
  },
  {
    name: 'Tomek',

    className: 'bg-slate-400',
  },
];

const generateEvents = (offset: number, arrConfig: Array<EventConfigObj>) => {
  const events = [];
  let startDate = new Date(`2023-01-01`);
  while (startDate.getDay() != 1) {
    startDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1));
  }
  let endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + offset));

  for (let index = 0; index < lastWeek; index++) {
    const mod = index % arrConfig.length;

    // if (endDate.getDate() > 5) {
    //   endDate = new Date(startDate.setDate(startDate.getDate() - 1));
    // }
    events.push({
      title: arrConfig[mod].name,
      start: startDate,
      end: endDate,
      allDay: true,
      className: arrConfig[mod].className,
      classNames: ['uppercase p-1'],
      textColor: 'black',
      editable: true,
    });
    startDate = new Date(new Date(endDate).setDate(new Date(endDate).getDate()));
    // if (endDate.getDate() === 5) {
    //   endDate = new Date(startDate.setDate(startDate.getDate() + 2));
    // }
    endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + offset));
  }
  console.log(events);
  return events;
};

const generateRetroEvents = (offset: number, arrConfig: Array<EventConfigObj>) => {
  const events = [];
  let startDate = new Date(`2023-01-03`);
  while (startDate.getDay() !== 1) {
    startDate = new Date(startDate.setDate(startDate.getDate() + 1));
  }
  let endDate = startDate;

  for (let index = 1; index < lastWeek; index++) {
    const mod = index % arrConfig.length;
    // console.log(startDate, endDate);

    events.push({
      title: arrConfig[mod].name,
      start: startDate,
      end: endDate,
      allDay: true,
      editable: true,
      classNames: ['uppercase p-1 text-center bg-blue-800'],
      textColor: 'white',
    });
    startDate = new Date(endDate.setDate(endDate.getDate() + offset));
    endDate = startDate;
  }
  return events;
};

type EventShowCalendar = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  className: string;
  classNames: string[];
  textColor: string;
  editable: boolean;
};

const mapMongoEventsToSHowCalendarEvents = (mongoEvents: Array<EventResponse>): Array<EventShowCalendar> => {
  const mapped = mongoEvents.map((ev) => {
    return {
      id: ev._id as string,
      title: ev.user.name,
      start: ev.start.toString(),
      end: ev.end.toString(),
      allDay: ev.allDay,
      className: ev.user.bgColorDaily,
      classNames: ['uppercase p-1'],
      textColor: 'black',
      editable: true,
    };
  });
  console.log(mapped);
  return mapped;
};
const CalendarWrapper = () => {
  const [events, setEvents] = useState<null | Array<EventShowCalendar>>(null);

  useEffect(() => {
    fetch('/api/mongo/events/getAll')
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        if (!resp) return;
        setEvents(() => mapMongoEventsToSHowCalendarEvents(resp));
      });
  }, []);

  const clickAction = (action: unknown) => {
    console.log(action);
  };
  const selectAction = (action: unknown) => {
    console.log(action);
  };
  const eventAddAction = (action: unknown) => {
    console.log(action);
  };
  const eventChangeAction = (action: unknown) => {
    console.log(action);
  };
  const eventRemoveAction = (action: unknown) => {
    console.log(action);
  };
  const onDragStop = (action: unknown) => {
    console.log(action);
  };
  console.log(getWeekNumber(new Date()));

  if (!events) return <div>Events calendar is empty</div>;
  return (
    <FullCalendar
      height={'100%'}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,multiMonthYear',
      }}
      multiMonthMaxColumns={2}
      eventDisplay="block"
      showNonCurrentDates={true}
      droppable={true}
      eventDragStop={onDragStop}
      plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
      initialView="multiMonthYear"
      weekends={true}
      firstDay={1}
      eventClick={clickAction}
      select={selectAction}
      eventAdd={eventAddAction}
      eventChange={eventChangeAction}
      eventRemove={eventRemoveAction}
      events={[
        ...events,
        { date: '2023-08-15', display: 'background', name: 'święto', backgroundColor: 'blue', title: 'wieto' },
      ]}
    />
  );
};

export default CalendarWrapper;
