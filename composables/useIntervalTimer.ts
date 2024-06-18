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
  const current = shallowRef(0)
  const interval = shallowRef<Interval>()
  const timeout = shallowRef()
  const isRunning = computed(() => !!interval.value)

  function startTimer(options: StartOptions) {
    const intervals = generateIntervals(options)

    interval.value = intervals.shift() as Interval
    current.value = interval.value.seconds

    timeout.value = setInterval(() => {
      current.value--

      if (current.value <= 0) {
        playSound(200)

        if (intervals.length > 0) {
          interval.value = intervals.shift() as Interval

          current.value = interval.value.seconds
        }
        else {
          stopTimer()
        }
      }
    }, 1_000)
  }

  function stopTimer() {
    clearInterval(timeout.value)
    timeout.value = undefined
  }

  function generateIntervals(options: StartOptions) {
    const intervals: Interval[] = []

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
  }
}
