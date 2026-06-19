export const appName = "TMDB Quickly"

// https://icon-sets.iconify.design/mdi/
export const iconCodes = {
	person: "icon-[mdi--person-outline]",
	people: "icon-[mdi--person-group]",
	peopleAlt: "icon-[mdi--person-group-outline]",
	image: "icon-[mdi--image-outline]",
	text: "icon-[mdi--card-text-outline]",
	tv: "icon-[mdi--tv]",
	movie: "icon-[mdi--movie-open-outline]",
	video: "icon-[mdi--video-outline]",
	arrowLeft: "icon-[mdi--arrow-left]",
	arrowRight: "icon-[mdi--arrow-right]",
} as const

export const baseImgUrl = `https://image.tmdb.org/t/p` as const

export const imgUrls = {
	original: `${baseImgUrl}/original`,
	w500: `${baseImgUrl}/w500`,
	w94h141: `${baseImgUrl}/w94_and_h141_bestv2`,
	w120h133: `${baseImgUrl}/w120_and_h133_face`,
	w130h195: `${baseImgUrl}/w130_and_h195_bestv2`,
	w138h175: `${baseImgUrl}/w138_and_h175_face`,
	w220h330: `${baseImgUrl}/w220_and_h330_face`,
	w300h450: `${baseImgUrl}/w300_and_h450_bestv2`,
	w320h180: `${baseImgUrl}/w320_and_h180_bestv2`,
	w640h360: `${baseImgUrl}/w640_and_h360_bestv2`,
} as const
