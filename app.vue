<template>
  <div>
    <h1>{{currentTitle}}</h1>
    <strong>00:{{ currentSeconds }}</strong>
  </div>
</template>

<script lang="ts" setup>
type Interval = {
  title: string
  seconds: number
}

const route = useRoute()
const seconds = Number.parseInt(route.query.seconds as string ?? '0')
const interval = Number.parseInt(route.query.interval as string ?? '0')
const pause = Number.parseInt(route.query.pause as string ?? '0')
const currentSeconds = shallowRef(seconds)
const currentTitle = shallowRef('Work')
const intervals: Interval[] = []

for (let i = 0; i < interval; i += 1) {
  intervals.push({ title: 'Work', seconds })
  intervals.push({ title: 'Pause', seconds: pause })
}

intervals.shift()

onMounted(async () => {
  if ('wakeLock' in navigator) {
    await navigator.wakeLock.request('screen')
  }

  const interval = setInterval(() => {
    currentSeconds.value--

    if (currentSeconds.value === 0) {
      const context = new AudioContext()
      const oscillator = context.createOscillator()
      oscillator.type = 'sine'
      oscillator.frequency.value = 800
      oscillator.connect(context.destination)
      oscillator.start();
      setTimeout(function () {
        oscillator.stop()
      }, 100)

      if (intervals.length > 0) {
        const newInterval = intervals.shift() as Interval

        currentSeconds.value = newInterval.seconds
      }
      else {
        clearInterval(interval)
      }
    }
  }, 1_000)
})
</script>
