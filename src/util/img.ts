export const baseImgUrl = `https://image.tmdb.org/t/p` as const

export const imgUrls = {
  original: `${baseImgUrl}/original`,
  w500: `${baseImgUrl}/w500`,
  w94h141: `${baseImgUrl}/w94_and_h141_bestv2`,
  w130h195: `${baseImgUrl}/w130_and_h195_bestv2`,
  w300h450: `${baseImgUrl}/w300_and_h450_bestv2`,
  w320h180: `${baseImgUrl}/w320_and_h180_bestv2`,
  w640h360: `${baseImgUrl}/w640_and_h360_bestv2`,
  w120h133face: `${baseImgUrl}/w120_and_h133_face`,
} as const
