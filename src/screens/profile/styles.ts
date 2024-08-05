import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 24
  },
  avatarView: {
    alignSelf: 'center',
    marginBottom: 24
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: '100%',
    height: '100%'
  },
  imagePicker: {
    position: 'absolute',
    top: 56,
    left: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    width: 24,
    height: 24,
    borderWidth: .2
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10
  },
  btn: {
    marginTop: 93,
    marginBottom: 50
  }
})

export default styles