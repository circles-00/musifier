type TTimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

export const getTimeOfDay = (date: Date = new Date()): TTimeOfDay => {
  const hours = date.getHours()

  if (hours > 4 && hours < 12) {
    return 'morning'
  }

  if (hours >= 12 && hours < 18) {
    return 'afternoon'
  }

  return 'evening'
}
