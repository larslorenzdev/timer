export default function () {
  const context = new AudioContext()

  function playSound(ms: number) {
    const oscillator = context.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.value = 800
    oscillator.connect(context.destination)
    oscillator.start()

    setTimeout(function () {
      oscillator.stop()
    }, ms)
  }

  return {
    playSound,
  }
}
