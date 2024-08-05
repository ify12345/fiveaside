import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  title: {
    marginTop: 16
  },
  btn: {
    marginTop: 120
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16
  },
  radioCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 10,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageView: {
    marginVertical: 16
  },
  imageWrapper: {
    width: 104,
    height: 104,
    borderRadius: 4
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden'
  },
  imageName: {
    maxWidth: 104
  },
  listBtn: {
    width: '90%',
    marginVertical: 48,
    alignSelf: 'center'
  }
})

export default styles