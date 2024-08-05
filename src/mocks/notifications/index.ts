import {Notification} from '~types'
import i18next from '~config/i18next'
import dayjs from 'dayjs'

const {t} = i18next

const NotificationData: Notification[] = [
  {
    id: 1,
    userId: 1,
    createdAt: dayjs().toDate(),
    subject: t('new_appointment', {ns: 'notification'}),
    body: 'Kylie J. just booked an appointment for 7:00 pm today.'
  },
  {
    id: 2,
    userId: 1,
    createdAt: dayjs().toDate(),
    subject: t('new_appointment', {ns: 'notification'}),
    body: 'Kylie J. just booked an appointment for 12:00 pm today.'
  },
  {
    id: 3,
    userId: 1,
    createdAt: dayjs('2024-01-09').toDate(),
    subject: t('new_appointment', {ns: 'notification'}),
    body: 'Kylie J. just booked an appointment for 12:00 pm today.'
  },
  {
    id: 4,
    userId: 1,
    createdAt: dayjs('2024-01-09').toDate(),
    subject: t('new_appointment', {ns: 'notification'}),
    body: 'Kylie J. just booked an appointment for 10:00 am today.'
  },
]

export default NotificationData