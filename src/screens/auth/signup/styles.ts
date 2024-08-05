import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 27,
    paddingHorizontal: 24
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  headerDesc: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24
  },
  stepView: {
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 24
  },
  fullView: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1
  },
  btnSeparator: {
    marginVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  line: {
    width: '43%',
    borderBottomWidth: .5
  },
  createBtn: {
    marginTop: 16
  },
  loginText: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 40,
    marginBottom: 38
  }
})

export default styles