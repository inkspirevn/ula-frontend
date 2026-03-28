import { setupPlugins } from "@responsive-image/vite-plugin";
import { solidStart } from "@solidjs/start/config";
import { nitroV2Plugin } from "@solidjs/vite-plugin-nitro-2";
import { defineConfig } from "vite";

export default defineConfig(async ({ command }) => {
	return {
		plugins: [
			solidStart(),
			nitroV2Plugin(),
			setupPlugins({
				include: /^[^?]+\.(?:jpg|jpeg|png|webp)\?.*responsive.*$/i,
				formats:
					command === "build"
						? ["avif", "webp", "original"]
						: ["webp", "original"],
			}),
		],
	};
});
