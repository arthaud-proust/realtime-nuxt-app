<template>
  <div>
    <EditUsernameModal v-model:opened="isEditUsernameModalOpen" />

    <Room
      v-if="username && !isUsernameBlank && !isEditUsernameModalOpen"
      :room-id="roomId"
      :username="username"
    />
  </div>
</template>
<script setup lang="ts">
import Room from "@/components/Room.vue";
import EditUsernameModal from "@/components/EditUsernameModal.vue";

const { params } = useRoute();
const roomId = params.id as string;

const { username, isUsernameBlank } = useUsername();

useHead({
  title: humanizeRoomId(roomId),
});

const isEditUsernameModalOpen = ref(toValue(isUsernameBlank));
</script>
