import { setupPlugins } from "@responsive-image/vite-plugin";
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
	server: {
		prerender: {
			crawlLinks: true,
		},
	},
	vite: {
		resolve: {
			alias: {
				"styled-system": "/styled-system",
			},
		},
		plugins: [
			setupPlugins({
				include:
					/^[^?]+\.(avif|gif|heif|jpeg|jpg|png|tiff|webp)\?.*responsive.*$/,
			}),
		],
	},
});
