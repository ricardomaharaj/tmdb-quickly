export interface Season {
  _id: string
  air_date?: string
  episodes?: Episode[]
  name?: string
  overview?: string
  id: number
  poster_path?: string
  season_number?: number
}

interface Episode {
  air_date?: string
  episode_number?: number
  id: number
  name?: string
  overview?: string
  production_code?: string
  runtime?: number
  season_number?: number
  show_id: number
  still_path?: string
  vote_average?: number
  vote_count?: number
  crew?: CrewMember[]
  guest_stars?: GuestStar[]
}

interface CrewMember {
  job?: string
  department?: string
  credit_id: string
  adult?: boolean
  gender?: number
  id: number
  known_for_department?: string
  name?: string
  original_name?: string
  popularity?: number
  profile_path?: string
}

interface GuestStar {
  character?: string
  credit_id: string
  order?: number
  adult?: boolean
  gender?: number
  id: number
  known_for_department?: string
  name?: string
  original_name?: string
  popularity?: number
  profile_path?: string
}
