// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@nuxt/test-utils/module"],
	compatibilityDate: "2024-08-24",
	nitro: {
		experimental: {
			websocket: true,
		},
	},
	typescript: {
		tsConfig: {
			compilerOptions: {
				paths: {
					"@": ["."],
					"@/*": ["./*"],
				},
			},
		},
		typeCheck: true,
	},
	colorMode: {
		preference: "light",
	},
});
