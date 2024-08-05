import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  account: {
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 24
  },
  accountNumber: {
    fontFamily: 'Avenir-Regular',
    fontWeight: '400',
    fontSize: 12
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconWrapper: {
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  editIcon: {
    marginRight: 15
  }
})

export default styles