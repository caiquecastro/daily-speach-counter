export function formatTime(time: number = 0) {
  const totalSeconds = time / 1000;
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds}`;
}
