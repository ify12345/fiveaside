import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1
  },
  form: {
    paddingHorizontal: 24,
    paddingTop: 4
  },
  title: {
    fontSize: 16,
    marginBottom: 16
  },
  occurenceView: {
    paddingHorizontal: 24,
    paddingVertical: 16
  },
  occurenceTitle: {
    fontSize: 16,
    marginBottom: 16
  },
  intervalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  inputWrapper: {
    width: '70%',
    marginRight: 10
  },
  input: {
    marginBottom: 0
  },
  durationPickerWrapper: {
    marginRight: 24,
    borderRadius: 4,
    backgroundColor: 'rgba(128, 132, 148, 0.24)',
    height: 52,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 62,
    justifyContent: 'flex-end'
  }
})

export default styles