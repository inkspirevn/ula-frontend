import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "~/app.css";

export default function App() {
	return (
		<Router
			// Uses @app.config.ts baseURL via Vinxi
			base={import.meta.env.SERVER_BASE_URL || undefined}
			root={(props) => (
				<MetaProvider>
					<Title>ULA menus</Title>
					<Suspense>{props.children}</Suspense>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
