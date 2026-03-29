import FlipbookStage from "~/components/FlipbookStage";
import { MENUS } from "~/data/menus";

export default function HomeStyleMenuRoute() {
	const menu = MENUS.home_style;
	return (
		<FlipbookStage title={menu.title} images={menu.images} toc={menu.toc} />
	);
}
