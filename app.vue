<template>
	<div class="h-dvh">
		<NuxtPage />
	</div>
</template>
<script setup lang="ts">
import { provideUseId } from "@headlessui/vue";

provideUseId(() => useId());
</script>
