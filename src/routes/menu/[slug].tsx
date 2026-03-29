import { useParams } from "@solidjs/router";
import { Show } from "solid-js";
import FlipbookStage from "~/components/FlipbookStage";
import { MENUS } from "~/data/menus";

export default function MenuRoute() {
	const params = useParams();
	const menu = () => {
		const slug = params.slug;
		return slug ? MENUS[slug] : undefined;
	};

	return (
		<Show
			when={menu()}
			fallback={
				<div
					style={{
						display: "flex",
						"flex-direction": "column",
						"align-items": "center",
						"justify-content": "center",
						height: "100dvh",
						color: "white",
						background: "#09090b",
					}}
				>
					<h1 style={{ "font-size": "2rem", "margin-bottom": "1rem" }}>
						Menu Not Found
					</h1>
					<p>Please check the URL or select a valid menu.</p>
				</div>
			}
		>
			{(m) => (
				<FlipbookStage title={m().title} images={m().images} toc={m().toc} />
			)}
		</Show>
	);
}
