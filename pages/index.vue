<template>
	<UContainer :ui="{ constrained: 'max-w-xl' }">
		<div class="min-h-dvh flex flex-col justify-center items-center">
			<Head>
				<Title>App</Title>
			</Head>

			<header class="w-full h-14 flex items-center justify-end">
				<UButton
					variant="ghost"
					trailing-icon="i-heroicons-user-20-solid"
					v-if="!isUsernameBlank"
					@click="isEditUsernameModalOpen = true"
				>
					{{ username }}
				</UButton>
				<EditUsernameModal v-model:opened="isEditUsernameModalOpen" />
			</header>

			<div
				class="grow flex flex-col justify-center items-center gap-2 w-full"
			>
				<UInput
					autofocus
					size="lg"
					v-model="roomToJoinId"
					placeholder="E.g. magic-cow"
					autocomplete="off"
					:ui="{ icon: { trailing: { pointer: '' } } }"
					@keyup.enter="joinRoom"
				>
					<template #trailing>
						<UButton
							:disabled="isBlank(roomToJoinId)"
							color="gray"
							variant="link"
							:padded="false"
							@click="joinRoom"
						>
							Join
						</UButton>
					</template>
				</UInput>
				<p class="text-center">Or</p>
				<UButton
					:to="newRoomUrl"
					icon="i-heroicons-arrow-right"
					size="lg"
					label="Create a new room"
					:trailing="true"
				/>
			</div>
		</div>

		<div
			v-if="savedSessions.list.value.length"
			class="-mt-16 w-full flex flex-col gap-2 pb-4"
		>
			<p class="text-center">Saved sessions</p>
			<UCard
				class="relative"
				v-for="session in savedSessions.list.value"
				:key="session.id"
			>
				<NuxtLink
					:to="`/room/${session.roomId}`"
					class="absolute inset-0"
				/>
				<div class="flex items-center justify-between gap-2">
					<div>
						<p class="capitalize">
							{{ humanizeRoomId(session.roomId) }}
						</p>
						<p class="text-neutral-500 italic">
							As {{ session.data.username }}
						</p>
					</div>

					<UButton
						variant="ghost"
						color="red"
						icon="i-heroicons-trash"
						size="md"
						@click="savedSessions.forget(session)"
					/>
				</div>
			</UCard>
		</div>
	</UContainer>
</template>
<script setup lang="ts">
import { generate } from "random-words";
import EditUsernameModal from "@/components/EditUsernameModal.vue";
import { humanizeRoomId, stringifyRoomId } from "@/shared/utils/room";

const { username, isUsernameBlank } = useUsername();
const savedSessions = useSavedSessions();

const isEditUsernameModalOpen = ref(toValue(isUsernameBlank));

const newRoomId = (generate(2) as [string, string]).join("-");
const newRoomUrl = `/room/${newRoomId}`;

const roomToJoinId = ref<string>();
const joinRoom = () => {
	const roomToJoinIdValue = stringifyRoomId(toValue(roomToJoinId) ?? "");

	if (!isBlank(roomToJoinIdValue)) {
		navigateTo(`/room/${roomToJoinIdValue}`);
	}
};
</script>
