import { StyleSheet } from "react-native";

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
  email: {
    fontSize: 16
  },
  fullView: {
    flex: 1
  },
  cell: {
    width: 64,
    height: 64,
    borderRadius: 4,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Avenir-Bold',
    fontWeight: '600',
    lineHeight: 30,
    fontSize: 20
  },
  btn: {
    marginTop: 64,
    marginBottom: 24
  },
  resendText: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16,
  },
  switchMediumText: {
    marginTop: 24,
    textDecorationLine: 'underline',
  }
})

export default styles