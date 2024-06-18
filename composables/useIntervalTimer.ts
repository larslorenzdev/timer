import useSoundGenerator from '~/composables/useSoundGenerator'

export type Interval = {
  title: string
  seconds: number
}

export type StartOptions = {
  seconds: number
  pause: number
  interval: number
}

export default function () {
  const { playSound } = useSoundGenerator()
  const current = shallowRef<number>()
  const interval = shallowRef<Interval>()
  const intervals = shallowRef<Interval[]>()
  const timeout = shallowRef()
  const isRunning = computed(() => !!timeout.value)
  const error = shallowRef<Error>()

  function startTimer(options: StartOptions) {
    if (!interval.value) {
      intervals.value = generateIntervals(options)
      interval.value = intervals.value.shift() as Interval
      current.value = interval.value.seconds
    }

    timeout.value = setInterval(() => {
      if (current.value && intervals.value) {
        current.value--

        if (current.value <= 0) {
          try {
            playSound(200)
          }
          catch (e) {
            console.error(e)
          }

          if (intervals.value.length > 0) {
            interval.value = intervals.value.shift() as Interval

            current.value = interval.value.seconds
          }
          else {
            stopTimer()
          }
        }
      }
      else {
        stopTimer()
      }
    }, 1_000)
  }

  function pauseTimer() {
    clearInterval(timeout.value)
    timeout.value = undefined
  }

  function stopTimer() {
    clearInterval(timeout.value)
    timeout.value = undefined
    interval.value = undefined
    intervals.value = undefined
    current.value = undefined
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

  return {
    startTimer,
    stopTimer,
    interval,
    current,
    isRunning,
    error,
    pauseTimer,
  }
}
