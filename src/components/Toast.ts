import { Platform, ToastAndroid } from "react-native";
import ToastComponent from 'react-native-tiny-toast'
import { Colors } from "~config/colors";

export default function Toast(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  } else {
    ToastComponent.show(message, {
        duration: 3500,
        containerStyle: {
          backgroundColor: 'white',
          shadowColor: 'rgba(80, 80, 80, 1)',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          borderRadius: 100,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center'
        },
        textStyle: {
          color: Colors.paleBrown,
          fontFamily: 'Avenir-Regular',
          fontSize: 16,
          fontWeight: '400'
        },
        imgSource: require('../../assets/icon.png'),
        imgStyle: {
          width: 30,
          height: 30,
          marginRight: 20
        }
      });
  }
}