export interface Rectangle {
  top: number
  left: number
  width: number
  height: number
  duration: number
  timestamp: number
}

export interface Progress {
  played: number
  playedSeconds: number
  loaded: number
  loadedSeconds: number
}
