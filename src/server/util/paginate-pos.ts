const perPage = 12

export function getPaginatePos(page: number) {
  const start = (page - 1) * perPage
  const end = page * perPage

  return { start, end }
}
