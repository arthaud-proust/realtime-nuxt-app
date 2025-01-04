import { useLocalStorage } from "@vueuse/core";
import { localStorageKey } from "@/utils/localStorage";
import type { RoomSessionDto } from "@/app/Room/application/RoomSession";

const SAVED_ROOMS_LOCAL_STORAGE_KEY = "saved-sessions";
export const useSavedSessions = () => {
  const savedSessions = useLocalStorage<Array<RoomSessionDto>>(
    localStorageKey(SAVED_ROOMS_LOCAL_STORAGE_KEY),
    [],
  );

  const get = (roomId: string) => {
    return toValue(savedSessions).find(
      (savedSession) => savedSession.roomId == roomId,
    );
  };

  const save = (session: RoomSessionDto) => {
    if (get(session.roomId)) {
      return;
    }
    savedSessions.value.unshift(session);
  };

  const forget = (session: RoomSessionDto) => {
    savedSessions.value = savedSessions.value.filter(
      (savedSession) => savedSession.roomId !== session.roomId,
    );
  };

  const list = computed(() => savedSessions.value);

  return {
    get,
    save,
    forget,
    list,
  };
};
