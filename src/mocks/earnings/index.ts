import dayjs from "~config/dayjs";
import { AppointmentStatus, Earning } from "~types";

const EarningData: Earning[] = [
  {
    id: 1,
    createdAt: dayjs('2024-01-11 16:00').toDate(),
    service: 'French Braid',
    price: 150,
    status: AppointmentStatus.confirmed

  },
  {
    id: 2,
    createdAt: dayjs('2024-01-10 16:00').toDate(),
    service: 'Pigtail Braid',
    price: 300,
    status: AppointmentStatus.confirmed
  },
  {
    id: 3,
    createdAt: dayjs('2024-01-10 16:00').toDate(),
    service: 'Cornrow Braid',
    price: 100,
    status: AppointmentStatus.confirmed
  },
  {
    id: 4,
    createdAt: dayjs('2024-01-10 16:00').toDate(),
    service: 'Fishtail Braid',
    price: 175,
    status:  AppointmentStatus.confirmed
  }
]

export default EarningData