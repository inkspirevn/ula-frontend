import FlipbookStage from "~/components/FlipbookStage";
import { MENUS } from "~/data/menus";

export default function BanquetMenuRoute() {
	const menu = MENUS.banquet;
	return (
		<FlipbookStage title={menu.title} images={menu.images} toc={menu.toc} />
	);
}
