import type { RouteSectionProps } from "@solidjs/router";
import { css } from "styled-system/css";

export default function MenuLayout(props: RouteSectionProps) {
	return (
		<div
			class={css({
				width: "100%",
				height: "100dvh",
				background: "#09090b",
				overflow: "hidden",
			})}
		>
			{props.children}
		</div>
	);
}
