import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State, Steps } from '../types/slice'

const initialState: State = {
  steps: [],
  isLoading: false,
  isError: false,
}

const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    getStepsFetch: (state) => {
      state.isLoading = true
    },
    getStepsSuccess: (state, action: PayloadAction<Steps[]>) => {
      state.steps = action.payload
      state.isLoading = false
    },
    getStepsError: (state) => {
      state.isLoading = false
      state.isError = true
    },
  },
})

const { actions, reducer } = stepsSlice
export const { getStepsFetch, getStepsSuccess, getStepsError } = actions
export default reducer
