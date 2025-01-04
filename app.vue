<template>
	<div class="h-screen">
		<NuxtPage />
	</div>
</template>
<script setup lang="ts">
import { provideUseId } from "@headlessui/vue";

provideUseId(() => useId());
</script>
