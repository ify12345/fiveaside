import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

async function GoogleAuth () {
  try {
    await GoogleSignin.hasPlayServices();
    // check for already signed in user
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.signOut()
    }
    const userInfo = await GoogleSignin.signIn();
    return userInfo
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('google_canceled')
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      throw new Error('google_play_error')
    } else {
      // some other error happened
      throw new Error('google_other_error')
    }
  }
};

export default GoogleAuth