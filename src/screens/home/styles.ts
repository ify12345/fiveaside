import { StyleSheet } from "react-native";
import { Colors } from "~config/colors";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 21
  },
  headerComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menu: {
    marginRight: 8
  },
  avatarWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    overflow: 'hidden'
  },
  avatar: {
    width: '100%',
    height: '100%'
  },
  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 50,
    flexGrow: 1
  },
  dashboard: {
    padding: 24,
    marginBottom: 24
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  filterWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterIcon: {
    marginRight: 8
  },
  filterView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 24,
    top: 50,
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.platinum,
    zIndex: 1,
    elevation:1
  },
  filterTitle: {
    marginBottom: 4
  },
  filterPicker: {
    marginVertical: 4
  },
  separator: {
    width: 16,
    height: 3,
    borderRadius: 6,
    marginHorizontal: 4
  },
  rowAlignedSpaced: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  card: {
    width: '45%',
    borderRadius: 8,
    paddingTop: 22,
    paddingBottom: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    height: 130
  },
  cardTitle: {
    textAlign: 'center'
  },
  count: {
    marginTop: 12
  },
  btnWrapper: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8
  },
  upcomingList: {
    paddingLeft: 24,
    marginBottom: 32
  },
  pastList: {
    paddingLeft: 24,
    // marginBottom: 50
  },
   listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 24,
    marginBottom: 10
  },
  emptySection: {
    flex: 1,
    paddingHorizontal: 24
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyTitle: {
    marginTop: 24
  },
  centerText: {
    textAlign: 'center'
  }
})

export default styles