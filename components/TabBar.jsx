import { StyleSheet, View } from "react-native"
import TabBarButton from "./TabBarButton"

// https://reactnavigation.org/docs/bottom-tab-navigator/#props
function TabBar({ state, descriptors, navigation }) {
  const primaryColor = "#0891b2"
  const greyColor = "#737373"

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        if (["_sitemap", "+not-found"].includes(route.name)) {
          return null
        }

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          })
        }

        return (
          <TabBarButton
            key={route.name}
            style={styles.tabBarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? primaryColor : greyColor}
            label={label}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: 25,
    shadowColor: "#000",
    shadowradius: 10,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10
    }
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5
  }
})

export default TabBar
