import { describe, test } from 'vitest'
import { runGetStepsFetch } from './steps-saga'
import { call, put, takeEvery } from 'redux-saga/effects'


test('runGetStepsFetch', () => {

  describe('fetches steps data', () => {

    const gen = runGetStepsFetch()

    expect(gen.next().value).toEqual(call(() => fetch('/api/XxfnKp')))

    const steps = [{timeStamp: 100}]
    expect(gen.next(steps).value).toEqual(put(getStepsSuccess(steps)))

    expect(gen.next().value).toEqual(put(getStepsError()))

    expect(gen.next().done).toEqual(true)
  })
})