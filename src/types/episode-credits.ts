export interface EpisodeCredits {
  cast?: CastMember[]
  crew?: CrewMember[]
  guest_stars?: GuestStar[]
  id: number
}

export interface CastMember {
  adult?: boolean
  gender?: number
  id: number
  known_for_department?: string
  name?: string
  original_name?: string
  popularity?: number
  profile_path?: string
  character?: string
  credit_id: string
  order?: number
}

export interface CrewMember {
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
