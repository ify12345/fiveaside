import {registerRootComponent} from 'expo'
import messaging from '@react-native-firebase/messaging'
import notifee, {EventType} from '@notifee/react-native'
import displayNotification from '~utils/notification'
import {Linking} from 'react-native'
import App from './App'

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('background', remoteMessage)
  notifee.onBackgroundEvent(async () => {
    displayNotification(remoteMessage)
  })
})

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification} = detail;
  if (type === EventType.PRESS) {
    if (notification.data.link) {
      const {link} = notification.data;
      const validLink = await Linking.canOpenURL(link);
      if (validLink) {
        Linking.openURL(link);
      }
    }
  }
});

registerRootComponent(App)