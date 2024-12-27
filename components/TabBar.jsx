import { StyleSheet, View } from "react-native"
import { useLinkBuilder, useTheme } from "@react-navigation/native"
import { Text, PlatformPressable } from "@react-navigation/elements"
import { AntDesign, Feather } from "@expo/vector-icons"

// https://reactnavigation.org/docs/bottom-tab-navigator/#props
function TabBar({ state, descriptors, navigation }) {
  const { buildHref } = useLinkBuilder()

  const icons = {
    index: props => <AntDesign name='home' size={26} {...props} />,
    explore: props => <Feather name='compass' size={26} {...props} />,
    create: props => <AntDesign name='pluscircleo' size={26} {...props} />,
    profile: props => <AntDesign name='user' size={26} {...props} />
  }

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
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
            key={route.key}
          >
            {icons[route.name]({
              color: isFocused ? primaryColor : greyColor
            })}
            <Text
              style={{
                color: isFocused ? primaryColor : greyColor,
                fontSize: 11
              }}
            >
              {label}
            </Text>
          </PlatformPressable>
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
