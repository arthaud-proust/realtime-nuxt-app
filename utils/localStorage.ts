export const BASE_LOCAL_STORAGE_KEY = "app";
export const localStorageKey = (key: string) =>
	`${BASE_LOCAL_STORAGE_KEY}-${key}`;
