import { setupPlugins } from "@responsive-image/vite-plugin";
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig(async ({ command }) => {
	return {
		resolve: {
			alias: {
				"styled-system": "/styled-system",
			},
		},
		plugins: [
			solidStart(),
			nitro({ prerender: { crawlLinks: true } }),
			setupPlugins({
				include: /^[^?]+\.(?:jpg|jpeg|png|webp)\?.*responsive.*$/i,
				...(command === "build"
					? { format: ["avif", "webp", "original"] }
					: {}),
			}),
		],
	};
});
