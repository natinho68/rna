import React, { useEffect } from 'react'
import { ScrollView, Text } from 'react-native'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import useApiService from '../service/useApiService'
import { Player } from '../helpers/sharedInterface'
import { Loader } from './Loader'
import { searchPlayerPosition } from './PlayersList'
import { CardItem } from './CardItem'

type ParamList = {
  PlayerDetail: {
    playerId: string
    title: string
  }
}

export const PlayerDetail: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'PlayerDetail'>>()
  const navigation = useNavigation()
  const playerId = route.params.playerId.replace('player_', '')
  const { data, error, isLoading } = useApiService<Player | null>(`player/${playerId}?season=2018`)

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    })
  }, [route.params.title, navigation])

  if (isLoading) return <Loader />
  if (error) return <Text>Erreur: {error.message}</Text>
  if (!data) return <Text>Aucune donnée disponible</Text>

  return (
    <ScrollView>
      <CardItem title="Infos" data={searchPlayerPosition(data.ultraPosition)} />
      <CardItem title="Numéro" data={data.jerseyNum} />
      <CardItem title="But" data={data.stats.sumGoals} />
      <CardItem title="But/match" data={data.stats.goalByMatch ?? 0} />
      <CardItem
        title="Titulaire"
        data={`${data.stats.appearances.starter} fois sur ${data.nbMatch} matchs (${Math.round(
          data.stats.percentageStarter * 100
        )}%)`}
      />
      <CardItem title="Note moyenne" data={data.stats.avgRate} />
    </ScrollView>
  )
}
