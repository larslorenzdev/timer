export type Interval = {
  title: string
  seconds: number
}

export type StartOptions = {
  seconds: number
  pause: number
  interval: number
}

export default defineStore('IntervalTimer', () => {
  const { enableLock, disableLock } = useKeepAwakeStore()
  const { playSound } = soundGenerator()
  const current = shallowRef<number>()
  const interval = shallowRef<Interval>()
  const intervals = shallowRef<Interval[]>()
  const remaining = computed(() => intervals.value?.map(interval => interval.seconds).reduce((previousValue, currentValue) => previousValue + currentValue))
  const timeout = shallowRef()
  const isRunning = shallowRef(false)
  const isPaused = shallowRef(false)

  function startTimer(options: StartOptions) {
    intervals.value = generateIntervals(options)
    interval.value = intervals.value.shift() as Interval
    current.value = interval.value.seconds

    enableLock()
    startRunner()

    isRunning.value = true
    isPaused.value = false
  }

  function pauseTimer() {
    disableLock()
    stopRunner()

    isRunning.value = false
    isPaused.value = true
  }

  function resumeTimer() {
    enableLock()
    startRunner()

    isRunning.value = true
    isPaused.value = false
  }

  function stopTimer() {
    disableLock()
    stopRunner()

    intervals.value = undefined
    interval.value = undefined
    current.value = undefined
    isRunning.value = false
    isPaused.value = false
  }

  function generateIntervals(options: StartOptions) {
    const intervals: Interval[] = [
      { title: 'Prepare', seconds: 5 },
    ]

    for (let i = 0; i < options.interval; i += 1) {
      intervals.push({ title: 'Work', seconds: options.seconds })
      intervals.push({ title: 'Pause', seconds: options.pause })
    }

    // Remove the last pause
    intervals.pop()

    return intervals
  }

  function stopRunner() {
    clearInterval(timeout.value)

    timeout.value = undefined
  }

  function startRunner() {
    timeout.value = setInterval(() => {
      if (current.value && intervals.value) {
        current.value--

        if (current.value <= 0) {
          if (intervals.value.length > 0) {
            interval.value = intervals.value.shift() as Interval

            current.value = interval.value.seconds

            if (interval.value.title === 'Pause') {
              playSound(150)

              setTimeout(() => {
                playSound(150)
              }, 200)
            }
            else {
              playSound(150)
            }
          }
          else {
            stopTimer()
            playSound(500)
          }
        }
      }
      else {
        stopTimer()
      }
    }, 1_000)
  }

  return {
    startTimer,
    stopTimer,
    resumeTimer,
    pauseTimer,
    interval,
    remaining,
    current,
    isRunning,
    isPaused,
  }
})
