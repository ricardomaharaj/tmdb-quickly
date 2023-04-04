export interface TVCredits {
  cast?: CastMember[]
  crew?: CrewMember[]
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
  roles?: Role[]
  total_episode_count?: number
  order?: number
}

interface Role {
  credit_id: string
  character?: string
  episode_count?: number
}

export interface CrewMember {
  adult?: boolean
  gender?: number
  id: number
  known_for_department?: string
  name?: string
  original_name?: string
  popularity?: number
  profile_path?: string
  jobs?: Job[]
  department?: string
  total_episode_count?: number
}

interface Job {
  credit_id: string
  job?: string
  episode_count?: number
}
