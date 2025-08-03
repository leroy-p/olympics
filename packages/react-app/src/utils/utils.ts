export async function sleep(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms))
}

export function getTextClassName(index: number): string {
  switch (index) {
    case 1:
      return 'gold'
    case 2:
      return 'silver'
    case 3:
      return 'bronze'
    default:
      return ''
  }
}
