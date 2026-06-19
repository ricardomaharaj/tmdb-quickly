export function toDateStr(date?: string) {
	if (!date) return ""
	return date.substring(0, 10)
}
