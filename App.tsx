import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Screens from '~screens';
import { useColorScheme, StatusBar, Linking, View } from 'react-native';
import { AppDefaultTheme } from '~config/theme';
import { PaperProvider } from 'react-native-paper';
import {useFonts} from 'expo-font';
import {Provider} from 'react-redux'
import store, {persistor} from '~redux/store';
import {PersistGate} from 'redux-persist/integration/react'
import {init} from '~config/i18next'
import Toast from 'react-native-toast-message'
import toastConfig from '~utils/toast';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging'
import notifee, { AuthorizationStatus, EventType } from '@notifee/react-native'
import displayNotification from '~utils/notification';
import { CopilotProvider } from 'react-native-copilot';
import CustomToolTip from '~components/CustomToolTip';

SplashScreen.preventAutoHideAsync();

const createChannel = async () => {
  const channel = await notifee.createChannel({
    id: 'default',
    vibration: true,
    name: 'Default Channel'
  })
  return channel
}

async function requestUserPermission() {
  const permission = await notifee.requestPermission();
  if (permission.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    await createChannel()
  }
}

function onMessageHandler(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
  // console.log('foreground', remoteMessage)
  displayNotification(remoteMessage)
}

export default function App() {

  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    'Avenir-Regular': require('~assets/fonts/Avenir-Regular.ttf'),
    'Avenir-Medium': require('~assets/fonts/Avenir-Medium.ttf'),
    'Avenir-Bold': require('~assets/fonts/Avenir-Bold.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      setTimeout(async() => {
        await SplashScreen.hideAsync()
      }, 3000)
    }
  }, [fontsLoaded])

  useEffect(() => {
    requestUserPermission()
    const messageSubscription = messaging().onMessage(onMessageHandler);
    return () => {
      messageSubscription();
    }
  }, [])

  // Bootstrap sequence function
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification) {
      // console.log('Notification caused application to open', initialNotification.notification);
      // console.log('Press action used to open the app', initialNotification.pressAction);
    }
  }

  useEffect(() => {
    bootstrap()
      .then(() => setLoading(false))
      .catch();
  }, []);

  useEffect(() => notifee.onForegroundEvent(async({ type, detail }) => {
    const {notification} = detail;
      if (type === EventType.PRESS) {
        if (notification?.data?.link) {
          const {link} = notification.data;
          const validLink = await Linking.canOpenURL(link as string);
          if (validLink) {
            Linking.openURL(link as string);
          }
        }
      }
  }), [])

  if (!fontsLoaded && loading) {
    return null;
  }

  const onBeforeLift = async () => {
    await init();
  };

  function ThemedApp() {
    const scheme = useColorScheme();
    const theme = useMemo(() => scheme === 'light' ? AppDefaultTheme : AppDefaultTheme, [scheme])
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} onBeforeLift={onBeforeLift}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <NavigationContainer
              theme={theme}
              onReady={onLayoutRootView}
            >
              <StatusBar
                backgroundColor='white'
                barStyle="dark-content"
              />
              {/* <Screens /> */}
              <CopilotProvider labels={{next: 'NEXT', finish: 'FINISH', skip: 'SKIP', previous: 'PREVIOUS'}} stepNumberComponent={() => (<View />)} tooltipComponent={CustomToolTip}>
                <Screens />
              </CopilotProvider>
              <Toast config={toastConfig} />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
        </PersistGate>
      </Provider>
    )
  }

  return (
    <ThemedApp />
  );
}
