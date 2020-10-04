export interface Player {
  club: string
  firstname: string | null
  id: string
  lastname: string
  position: number
  quotation: number
  stats: StatsProps
  teamId: number
  ultraPosition: number
  nbMatch: number
  jerseyNum: number
}

export interface StatsProps {
  avgRate: number
  currentChampionship: number
  percentageStarter: number
  goalByMatch: number
  sumGoals: number
  appearances: {
    starter: number
  }
}

export interface PlayerPosition {
  name: string
  minify: string
  id: number
}
