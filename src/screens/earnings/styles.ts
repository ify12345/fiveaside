import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 24
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 23
  },
  list: {
    flexGrow: 1
  },
  card: {
    borderWidth: 0.4,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  rowSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  service: {
    width: '80%'
  }
})

export default styles