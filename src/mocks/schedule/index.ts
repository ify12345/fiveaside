import dayjs from "~config/dayjs";
import { Schedule, ScheduleStatus } from "~types";

const ScheduleData: Schedule[] = [
  {
    id: '1',
    status: ScheduleStatus.open,
    date: dayjs().toDate().toString(),
    start: '08:00',
    end: '05:30',
    breaks: [
      {
        id: '1',
        breakStart: '14:05',
        breakEnd: '15:00'
      }
    ]
  },
  {
    id: '2',
    status: ScheduleStatus.open,
    date: dayjs().add(1, 'day').toDate().toString(),
    start: '10:00',
    end: '07:05'
  },
  {
    id: '3',
    status: ScheduleStatus.closed,
    date: dayjs().add(2, 'day').toDate().toString(),
    start: '14:00',
    end: '23:45'
  },
  {
    id: '4',
    status: ScheduleStatus.open,
    date: dayjs().add(3, 'day').toDate().toString(),
    start: '07:00',
    end: '08:35'
  },
  {
    id: '5',
    status: ScheduleStatus.open,
    date: dayjs().add(4, 'day').toDate().toString(),
    start: '02:00',
    end: '04:50'
  }
]

export default ScheduleData