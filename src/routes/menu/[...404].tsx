import { css } from "styled-system/css";

export default function MenuNotFound() {
	return (
		<div
			class={css({
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				color: "white",
			})}
		>
			<h1 class={css({ fontSize: "2rem", marginBottom: "1rem" })}>
				Menu Not Found
			</h1>
			<p>Please check the URL or select a valid menu.</p>
		</div>
	);
}
