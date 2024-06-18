export default function () {
  const context = new AudioContext()

  // Bugfix for iOS where audio player gets blocked without permission
  if (shouldRequestAudio()) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  }

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

  function shouldRequestAudio() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  }

  return {
    playSound,
  }
}
