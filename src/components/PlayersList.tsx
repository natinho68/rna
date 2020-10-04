import React from 'react'
import { Text, ScrollView, View } from 'react-native'
import useApiService from '../service/useApiService'
import { DataTable } from 'react-native-paper'
import { playerPosition } from '../helpers/playerPositions'
import { Loader } from './Loader'
import { Player } from '../helpers/sharedInterface'
import { Filter } from './Filter'
import { useNavigation } from '@react-navigation/native'

export const searchPlayerPosition = (ultraPosition: number): string => {
  const result = playerPosition.find((element) => element.id === ultraPosition)
  if (result) return result.minify
  else return 'N/A'
}

export const PlayersList: React.FC = () => {
  const navigation = useNavigation()
  const [sortedPlayer, setSortedPlayer] = React.useState<Player[] | undefined>([])
  const { data, error, isLoading } = useApiService<Player[] | null>('championship/1/2018')
  const [filterByName, setFilterByName] = React.useState<string>('')
  const [filterByPosition, setFilterByPosition] = React.useState<{ value: undefined | number }>({ value: undefined })

  const normalizer = (string: string): string => {
    return string
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }

  React.useEffect(() => {
    const result = data?.filter(
      ({ firstname, lastname, ultraPosition }) =>
        (!filterByName ||
          (firstname !== null && normalizer(firstname).includes(normalizer(filterByName))) ||
          normalizer(lastname).includes(normalizer(filterByName))) &&
        (!filterByPosition.value || ultraPosition === filterByPosition.value)
    )
    setSortedPlayer(result)
  }, [data, filterByName, filterByPosition])

  if (isLoading) return <Loader />
  if (error) return <Text>Erreur: {error.message}</Text>
  if (!data?.length) return <Text>Aucune donnée disponible</Text>
  return (
    <View style={{ flex: 1 }}>
      <Filter
        filterByName={filterByName}
        setFilterByName={setFilterByName}
        filterByPosition={filterByPosition}
        setFilterByPosition={setFilterByPosition}
      />
      <ScrollView>
        <DataTable style={{ backgroundColor: 'white' }}>
          <DataTable.Header style={{ justifyContent: 'space-around' }}>
            <DataTable.Title style={{ flex: 7 }}>Joueur</DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}>Poste</DataTable.Title>
            <DataTable.Title style={{ flex: 4 }}>Équipe</DataTable.Title>
            <DataTable.Title style={{ flex: 3 }}>Note</DataTable.Title>
            <DataTable.Title style={{ flex: 3 }}>Titulaire</DataTable.Title>
          </DataTable.Header>

          {sortedPlayer?.map((player) => (
            <DataTable.Row
              key={player.id}
              onPress={() => {
                navigation.navigate('PlayerDetail', {
                  playerId: player.id,
                  title: player.firstname ? `${player.lastname} ${player.firstname}` : player.lastname,
                })
              }}
            >
              <DataTable.Cell style={{ flex: 7 }}>
                {player.lastname} {player.firstname}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>{searchPlayerPosition(player.ultraPosition)}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 4 }}>{player.club}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 3 }}>{player.stats.avgRate}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 3 }}>{player.stats.sumGoals}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  )
}
