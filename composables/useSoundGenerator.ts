export default function () {
  const context = new AudioContext()

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })

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
