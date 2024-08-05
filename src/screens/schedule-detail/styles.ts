import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8
  },
  switchView: {
    alignItems: 'center',
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 10,
    paddingTop: 38,
    marginBottom: 24
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26
  },
  breakTitle: {
    fontSize: 16,
  },
  addBtn: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  addText: {
    marginLeft: 4
  }
})

export default styles