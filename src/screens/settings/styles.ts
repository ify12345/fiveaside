import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  links: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 24
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: .4,
    paddingVertical: 12
  }
})

export default styles