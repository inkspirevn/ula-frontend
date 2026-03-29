import type { ImageData } from "@responsive-image/core";
import img1 from "~/assets/1.png?responsive";
import img2 from "~/assets/2.png?responsive";
import img3 from "~/assets/3.png?responsive";
import img4 from "~/assets/4.png?responsive";

export interface MenuData {
	title: string;
	images: ImageData[];
	toc: { label: string; pageIndex: number }[];
}

export const MENUS: Record<string, MenuData> = {
	home_style: {
		title: "Home Style Menu",
		images: [img1, img2, img3, img4],
		toc: [
			{ label: "Cover", pageIndex: 0 },
			{ label: "Cơm Nhà 1-2", pageIndex: 1 },
			{ label: "Cơm Nhà 3-4", pageIndex: 2 },
			{ label: "Back", pageIndex: 3 },
		],
	},
	banquet: {
		title: "Banquet Menu (Coming Soon)",
		images: [img1], // Placeholder
		toc: [{ label: "Cover", pageIndex: 0 }],
	},
};
