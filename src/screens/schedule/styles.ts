import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  tabView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  tab: {
    width: '49.5%',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  fab: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 24,
    borderRadius: 100,
    elevation: 1,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowRadius: 12,
    shadowOffset: {
      width: 2,
      height: 0
    },
    shadowOpacity: 0.8
  }
})

export default styles