import React, { Dispatch } from 'react'
import { TextInput } from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select'
import { StyleSheet, View } from 'react-native'

interface SearchProps {
  setFilterByName: Dispatch<React.SetStateAction<string>>
  filterByName: string
  setFilterByPosition: Dispatch<React.SetStateAction<{ value: undefined | number }>>
  filterByPosition: { value: undefined | number }
}

export const Filter: React.FC<SearchProps> = ({
  setFilterByName,
  filterByName,
  setFilterByPosition,
  filterByPosition,
}) => {
  const styles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
  })

  const placeholder = {
    label: '- Tous les postes -',
    value: null,
    color: '#9EA0A4',
  }

  return (
    <View>
      <TextInput
        label="Rechercher un joueur"
        theme={{ colors: { text: 'black' } }}
        value={filterByName}
        underlineColor="black"
        onChangeText={(text) => setFilterByName(text)}
      />
      <RNPickerSelect
        value={filterByPosition.value}
        placeholder={placeholder}
        onValueChange={(itemValue) => setFilterByPosition({ value: itemValue })}
        items={[
          { label: 'Gardien', value: 10, key: 10 },
          { label: 'Défenseur', value: 20, key: 20 },
          { label: 'Latéral', value: 21, key: 21 },
          { label: 'Milieu défensif', value: 31, key: 31 },
          { label: 'Milieu offensif', value: 32, key: 32 },
          { label: 'Attaquant', value: 40, key: 40 },
        ]}
        style={{
          ...styles,
          placeholder: {
            color: 'black',
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
    </View>
  )
}
