export const isNullOrEmpty = {
	String: (value?: string): boolean => !value || /^\s*$/.test(value),
	Number: (value?: number): boolean => !value && value !== 0,
};
