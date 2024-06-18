export function formatTime(seconds: number) {
  const calculatedMinutes = Math.floor(seconds / 60)
  const calculatedSeconds = seconds % 60

  return `${calculatedMinutes.toString().padStart(2, '0')}:${calculatedSeconds.toString().padStart(2, '0')}`
}
