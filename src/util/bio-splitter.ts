const capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const prefixes = ['Dr', 'Mr', 'Ms', 'Mrs', 'Jr', 'Lt', 'Vol', 'Inc']

export function bioSplitter(bio: string) {
  bio = bio.replaceAll('. ', '.\n')

  prefixes.forEach((prefix) => {
    bio = bio.replaceAll(`${prefix}.\n`, `${prefix}.\ `)
  })

  capitals.forEach((prefix) => {
    bio = bio.replaceAll(`${prefix}.\n`, `${prefix}.\ `)
  })

  return bio.split('\n')
}
