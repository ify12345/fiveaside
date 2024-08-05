import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 27,
    paddingHorizontal: 24
  },
  headerDesc: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40
  },
  fullView: {
    flex: 1
  },
  questions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 64
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  chechbox: {
    marginLeft: -24
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
  noAccountText: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 40,
    marginBottom: 155
  }
})

export default styles