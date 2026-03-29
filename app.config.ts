import { setupPlugins } from "@responsive-image/vite-plugin";
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
	vite({ router }: { router: "server" | "client" | "server-function" }) {
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
		// Vinxi maps `NITRO_APP_BASE_URL` to `import.meta.env.SERVER_BASE_URL`
		baseURL: process.env.NITRO_APP_BASE_URL || "/",
		prerender: {
			crawlLinks: true,
			failOnError: true,
		},
	},
});
