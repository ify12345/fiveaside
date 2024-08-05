import { StyleSheet } from "react-native";
import { Colors } from "~config/colors";

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
   listContentContainer: {
    flexGrow: 1,
    paddingBottom: 10,
    paddingHorizontal: 24
  },
  sectionHeader: {
    marginBottom: 8,
    color: Colors.black
  },
  card: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  statusIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8
  }
})

export default styles