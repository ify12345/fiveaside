/* eslint-disable import/no-cycle */
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native'
import dayjs from "~config/dayjs";

export default function displayNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
  const {notification, data} = remoteMessage
  return notifee.displayNotification({
    title: notification?.title,
    body: notification?.body,
    android: {
      largeIcon: require('../../assets/icon.png'),
      channelId: 'default'
    },
    ios: {
      sound: 'default',
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true
      }
    },
    data
  })
}

type TriggerNotification = {
  id: string
  title: string
  body: string
  appointmentDate: Date
  hour: number
  minute: number

}

export const createTriggerNotification = async ({
  id,
  title,
  body,
  appointmentDate,
  hour,
  minute
}: TriggerNotification) => {
  // const date = new Date(appointmentDate)
  // "2024-05-22T15:30:00.000Z"
  // const date = new Date(Date.now())
  // const date = new Date(Date.now())
  // console.log(dayjs(appointmentDate, 'MM/DD/YYYY hh:mm A'))
  const date = dayjs(appointmentDate, 'MM/DD/YYYY hh:mm A').toDate()
  // console.log(date)
  
  date.setHours(hour)
  date.setMinutes(minute)

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime()
  }
  await notifee.createTriggerNotification(
    {
      id,
      title,
      body,
      android: {
        largeIcon: require('../../assets/icon.png'),
        channelId: 'default',
        sound: 'default',
      },
      ios: {
        sound: 'default',
        foregroundPresentationOptions: {
          alert: true,
          badge: true,
          sound: true
        }
      }
    },
    trigger
  )
}

export const createAppointmentNotifications = async ({
  id,
  date,
  client
}: {id: number, date: Date, client: string}) => {
  // get 30mins before date
  const initialTime = dayjs(date, 'MM/DD/YYYY hh:mm A').subtract(dayjs.duration({minutes: 30}))
  const initialHour = dayjs(initialTime).get('hour')
  const initialMinute = dayjs(initialTime).get('minutes')
  // actual time
  const hour = dayjs(date, 'MM/DD/YYYY hh:mm A').get('hour')
  const minute = dayjs(date, 'MM/DD/YYYY hh:mm A').get('minutes')
  // create initial notification
  await createTriggerNotification({
    id: `${id.toString(10)}-initial`,
    title: 'Upcoming Appointment',
    body: `Upcoming appointment with ${client} at ${hour}:${minute}`,
    appointmentDate: date,
    hour: initialHour,
    minute: initialMinute
  })
  // create actual time notification
  await createTriggerNotification({
    id: `${id.toString(10)}-actual`,
    title: 'Upcoming Appointment',
    body: `Upcoming appointment with ${client} at ${hour}:${minute}`,
    appointmentDate: date,
    hour,
    minute
  })

  // const notifications = await notifee.getTriggerNotifications()
  // console.log('notifications', notifications)
}