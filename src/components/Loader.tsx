import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

export const Loader = (): JSX.Element => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color={colors.background} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})
