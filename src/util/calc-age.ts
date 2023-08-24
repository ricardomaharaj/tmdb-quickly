export function calcAge(birthday: string, deathday?: string) {
  let age = 0
  const start = new Date(birthday.replaceAll('-', '/'))
  let end = new Date()
  if (deathday) end = new Date(deathday.replaceAll('-', '/'))
  age = end.getFullYear() - start.getFullYear()
  return age
}
