<template>
	<main class="h-dvh overflow-y-auto overscroll-none">
		<UContainer :ui="{ constrained: 'max-w-xl' }">
			<div class="min-h-screen relative flex flex-col items-center">
				<header
					class="sticky top-0 w-full h-14 shrink-0 bg-white flex gap-2 items-center"
				>
					<UButton
						to="/"
						icon="i-heroicons-arrow-left"
						variant="ghost"
					/>

					<div
						class="flex flex-wrap grow items-center justify-between gap-2"
					>
						<span class="capitalize">{{
							humanizeRoomId(roomId)
						}}</span>

						<UBadge
							v-if="isConnected"
							color="green"
							variant="soft"
							class="capitalize"
							icon="i-heroicons-signal-16-solid"
							:trailing="false"
						>
							{{ transport }}
						</UBadge>
						<UBadge
							v-else
							color="red"
							variant="soft"
							icon="i-heroicons-signal-slash-16-solid"
							:trailing="false"
							>Disconnected
						</UBadge>
					</div>
				</header>
			</div>
		</UContainer>
	</main>
</template>

<script setup lang="ts">
import { useRoom } from "@/composables/useRoom";
import { humanizeRoomId } from "@/shared/utils/room";

const props = defineProps<{
	roomId: string;
	username: string;
}>();

const { isConnected, transport } = useRoom({
	roomId: props.roomId,
	username: props.username,
});
</script>
