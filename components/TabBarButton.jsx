import { Text, StyleSheet, Pressable } from "react-native"
import React from "react"
import { ICONS } from "../assets/icons"

const TabBarButton = props => {
  const { routeName, color, label } = props

  return (
    <Pressable {...props} style={styles.container}>
      {ICONS[routeName]({
        color
      })}
      <Text>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5
  }
})

export default TabBarButton
