import { useLocalStorage } from "@vueuse/core";
import { localStorageKey } from "@/utils/localStorage";

const USERNAME_LOCAL_STORAGE_KEY = "username";
export const useUsername = () => {
	const savedUsername = useLocalStorage<string | undefined>(
		localStorageKey(USERNAME_LOCAL_STORAGE_KEY),
		undefined,
	);

	const isUsernameBlank = computed(() => isBlank(toValue(username)));

	const username = computed({
		get: () => toValue(savedUsername),
		set: (v) => (savedUsername.value = v?.trim()),
	});

	return {
		username,
		isUsernameBlank,
	};
};
