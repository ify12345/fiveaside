import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 24
  },
  searchInput: {
    width: '100%',
    paddingHorizontal: 8,
    fontFamily: 'Avenir-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15
  },
  listView: {
    marginHorizontal: 24,
    flex: 1
  }
})

export default styles