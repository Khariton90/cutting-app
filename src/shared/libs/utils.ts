export const setIdNumber = (value: number = 0): number => {
	return new Date().valueOf() + value
}
