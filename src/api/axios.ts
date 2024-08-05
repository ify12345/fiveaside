/* eslint-disable consistent-return */
import Axios from "axios";
import * as Keychain from 'react-native-keychain';

async function AxiosBase() {
  let credentials = await Keychain.getGenericPassword();
  credentials = credentials as { service: string, username: string, password: string, storage: string }
  return Axios.create({
    baseURL: 'https://app.theouchless.com/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'appliction/json',
      'Authorization': `Bearer ${credentials.password}`
    },
    timeout: 200000
  })
}

export default AxiosBase;