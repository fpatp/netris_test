import { call, put, takeEvery } from 'redux-saga/effects'
import { getStepsError, getStepsSuccess } from './steps-slice'
import { Steps } from '../types/slice'

export function* runGetStepsFetch() {
  const response: Response = yield call(() => fetch('/api/XxfnKp'))
  const steps: Steps[] = yield response.json()

  if (response.ok) {
    yield put(getStepsSuccess(steps))
  } else {
    yield put(getStepsError())
  }
}

export function* stepsSaga() {
  yield takeEvery('steps/getStepsFetch', runGetStepsFetch)
}
