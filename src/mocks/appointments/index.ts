import { AppointmentStatus } from "~types";
import dayjs from 'dayjs'

const AppointmentsData = [
  {
    id: 1,
    startTime: dayjs().toDate(),
    status: AppointmentStatus.upcoming,
    clientName: 'Mary Jane',
    // address: 'Maryland, Baltmore',
    clientImage: require('~assets/images/braider.png'),
    saloon: ''
  },
  {
    id: 2,
    startTime: dayjs().add(1, 'day').toDate(),
    status: AppointmentStatus.upcoming,
     clientName: 'Mary Jane',
    // address: 'Maryland, Baltmore',
    clientImage: require('~assets/images/braider.png'),
    saloon: ''
  },
  {
    id: 3,
    startTime: dayjs().add(2, 'day').toDate(),
    status: AppointmentStatus.upcoming,
    clientName: 'Mary Jane',
    // address: 'Maryland, Baltmore',
    clientIimage: require('~assets/images/braider.png'),
    saloon: ''
  },
  {
    id: 4,
    startTime: dayjs().toDate(),
    status: AppointmentStatus.completed,
     clientName: 'Mary Jane',
    // address: 'Maryland, Baltmore',
    clientIimage: require('~assets/images/braider.png'),
    saloon: ''
  },
  {
    id: 5,
    startTime: dayjs().toDate(),
    status: AppointmentStatus.canceled,
     clientName: 'Mary Jane',
    // address: 'Maryland, Baltmore',
    clientIimage: require('~assets/images/braider.png'),
    saloon: ''
  },
  {
    id: 6,
    startTime: dayjs('2024-01-15 03:00').toDate(),
    status: AppointmentStatus.completed,
     clientName: 'Mary Jane',
    // address: 'Maryland, Baltmore',
    clientImage: require('~assets/images/braider.png'),
    saloon: ''
  },
  {
    id: 7,
    startTime: dayjs('2024-01-13 10:00').toDate(),
    status: AppointmentStatus.completed,
     clientName: 'Mary Jane',
    // address: 'Maryland, Baltmore',
    clientImage: require('~assets/images/braider.png'),
    salon: ''
  }
]

export default AppointmentsData