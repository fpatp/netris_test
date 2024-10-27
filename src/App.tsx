import { FC, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store/store'
import { getStepsFetch } from './store/steps-slice'
import { fixedTimes } from './utils/fixed-time'
import { Progress, Rectangle } from './types/app'
import { Button, ScrollShadow, Spinner } from '@nextui-org/react'

export const App: FC = () => {
  const [timing, setTiming] = useState<string>('')
  const [count, setCount] = useState<number>(0)
  const [rectangles, setRectangles] = useState<Rectangle[]>([])
  const [checkError, setCheckError] = useState<boolean>(false)
  const { steps, isLoading, isError } = useSelector((state: RootState) => state.reducer)
  const dispatch: AppDispatch = useDispatch()
  const playerRef = useRef<ReactPlayer>()

  useEffect(() => {
    dispatch(getStepsFetch())
  }, [checkError, dispatch])

  const handleSeek = (seconds: number) => {
    playerRef.current?.seekTo(seconds)
  }

  const handleProgress = (progress: Progress) => {
    const progressTime = progress.playedSeconds.toFixed(1)

    if (Math.round(+timing) > Math.round(progress.playedSeconds)) setCount(0)

    setTiming(progressTime)

    setRectangles(
      [...rectangles].filter(
        (item) =>
          +item.duration.toFixed(1) > +progressTime - 1.5 &&
          item.duration.toFixed(1) < progressTime + 1.5
      )
    )

    const part = steps.length / 10
    const partArray = steps.slice(count * part, (count + 1) * part)
    let innerCount = 0

    for (const item of partArray) {
      if (item.timestamp > progress.playedSeconds + 1) break

      innerCount += 1

      if (item.timestamp.toFixed(1) === progressTime) {
        const endTime = item.timestamp + item.duration

        const rectangle = {
          top: item.zone.top,
          left: item.zone.left,
          width: item.zone.width,
          height: item.zone.height,
          duration: endTime,
          timestamp: item.timestamp,
        }

        setRectangles([...rectangles, rectangle])

        break
      }

      if (innerCount === partArray.length) {
        setCount((prevCount) => (prevCount += 1))
      }
    }
  }

  const colorTextButton = (time: number) => {
    return !!rectangles.filter((item) => item.timestamp === time).length
  }

  return isError ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[400px] h-[200px] border border-2 rounded-lg border-black p-5 text-lg">
        <p>Error!</p>
        <p>Oops something went wrong!</p>
        <p>Try again later!</p>
        <div className="flex justify-end mt-8">
          <Button onClick={() => setCheckError(!checkError)}>Close</Button>
        </div>
      </div>
    </div>
  ) : (
    <article className="flex w-screen h-screen p-10 gap-10 bg-black">
      <div className="w-[1280px] h-[720px] flex justify-center items-center relative">
        <ReactPlayer
          ref={playerRef}
          url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          controls
          width="100%"
          height="100%"
          onProgress={(progress) => handleProgress(progress)}
          playing
          progressInterval={40}
        />
        {rectangles.map((item, idx) => {
          const w = Math.round(item.width)
          const h = Math.round(item.height)
          const t = Math.round(item.top)
          const l = Math.round(item.left)
          return (
            <div
              key={idx}
              style={{
                width: w,
                height: h,
                position: 'absolute',
                top: t,
                left: l,
                backgroundColor: 'green',
              }}
            ></div>
          )
        })}
      </div>

      <ScrollShadow offset={5} size={100} hideScrollBar className="w-[250px] h-[800px]">
        <div className="w-full flex flex-col gap-2 border border-red-200 p-3">
          {isLoading ? (
            <Spinner size="lg" className="h-screen"></Spinner>
          ) : (
            steps?.map((item) => {
              return (
                <Button
                  className="w-full h-6"
                  variant="light"
                  color={colorTextButton(item.timestamp) ? 'danger' : 'primary'}
                  key={item.timestamp}
                  onClick={() => handleSeek(item.timestamp)}
                >
                  {fixedTimes(item.timestamp)}
                </Button>
              )
            })
          )}
        </div>
      </ScrollShadow>
    </article>
  )
}

