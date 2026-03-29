import { setupPlugins } from "@responsive-image/vite-plugin";
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
	vite({ router }) {
		if (router === "server") {
		} else if (router === "client") {
		} else if (router === "server-function") {
		}
		return {
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
		};
	},
	server: {
		baseURL: process.env.NITRO_APP_BASE_URL || "/",
		prerender: {
			// crawlLinks: true,
			routes: ["/menu/home_style"], // # TODO
			failOnError: true,
		},
	},
});
