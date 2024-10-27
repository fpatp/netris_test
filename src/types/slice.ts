interface Zone {
  left: number
  top: number
  width: number
  height: number
}

export interface Steps {
  timestamp: number
  duration: number
  zone: Zone
}

export interface State {
  steps: Steps[]
  isLoading: boolean
  isError: boolean
}
