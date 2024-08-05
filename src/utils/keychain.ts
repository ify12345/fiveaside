/* eslint-disable consistent-return */
import * as Keychain from 'react-native-keychain'

export default async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return true;
    }
  } catch (e) {
    await Keychain.resetGenericPassword();
    return false
  }
}