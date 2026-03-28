import { ResponsiveImage } from "@responsive-image/solid";
import { ChevronLeft, ChevronRight, LayoutGrid, X } from "lucide-solid";
import { createEffect, createSignal, For, onCleanup, Show } from "solid-js";
import img1 from "~/assets/1.png?responsive";
import img2 from "~/assets/2.png?responsive";
import img3 from "~/assets/3.png?responsive";
import img4 from "~/assets/4.png?responsive";

import { Button } from "~/components/ui/button";
import * as Drawer from "~/components/ui/drawer";
import { IconButton } from "~/components/ui/icon-button";
import { flipbookShell } from "../../styled-system/recipes";

const images = [img1, img2, img3, img4];
const totalPages = images.length;
const totalPapers = Math.ceil(totalPages / 2);

const papers = Array.from({ length: totalPapers }, (_, i) => ({
	index: i,
	front: images[i * 2],
	back: images[i * 2 + 1],
}));

// A page `p` belongs to a spread. Cover is spread 0. Inside pages are spread 1...
const getSpreadIndex = (p: number) => Math.floor((p + 1) / 2);
const getPageIndexFromSpread = (s: number) => (s === 0 ? 0 : s * 2 - 1);

export default function MenuPage() {
	const [pageIndex, setPageIndex] = createSignal(0);
	const [isDesktop, setIsDesktop] = createSignal(false);

	createEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 768px)");
		setIsDesktop(mediaQuery.matches);
		const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
		mediaQuery.addEventListener("change", handler);
		onCleanup(() => mediaQuery.removeEventListener("change", handler));
	});

	const next = () =>
		setPageIndex((p) => {
			if (!isDesktop()) return Math.min(totalPages - 1, p + 1);
			const currentSpread = getSpreadIndex(p);
			const maxSpread = getSpreadIndex(totalPages - 1);
			const nextSpread = Math.min(maxSpread, currentSpread + 1);
			return Math.min(totalPages - 1, getPageIndexFromSpread(nextSpread));
		});

	const prev = () =>
		setPageIndex((p) => {
			if (!isDesktop()) return Math.max(0, p - 1);
			const currentSpread = getSpreadIndex(p);
			const prevSpread = Math.max(0, currentSpread - 1);
			return getPageIndexFromSpread(prevSpread);
		});

	const first = () => setPageIndex(0);
	const last = () => setPageIndex(totalPages - 1);

	createEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowRight") next();
			if (e.key === "ArrowLeft") prev();
			if (e.key === "Home") first();
			if (e.key === "End") last();
		};
		window.addEventListener("keydown", handleKeyDown);
		onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
	});

	const classes = flipbookShell();

	return (
		<div class={classes.root}>
			<header class={classes.header}>
				<div>
					<h1 style={{ "font-size": "1.25rem", "font-weight": "bold" }}>
						Menu
					</h1>
				</div>
				<div style={{ display: "flex", gap: "8px" }}>
					<Drawer.Root>
						<Drawer.Trigger
							asChild={(props: unknown) => (
								<Button
									variant="outline"
									size="sm"
									{...(props as Record<string, unknown>)}
								>
									<LayoutGrid size={16} /> Pages
								</Button>
							)}
						/>
						<Drawer.Backdrop />
						<Drawer.Positioner>
							<Drawer.Content>
								<Drawer.Header>
									<Drawer.Title>Navigation</Drawer.Title>
									<Drawer.CloseTrigger
										asChild={(props: unknown) => (
											<IconButton
												variant="plain"
												size="sm"
												{...(props as Record<string, unknown>)}
											>
												<X />
											</IconButton>
										)}
									/>
								</Drawer.Header>
								<Drawer.Body>
									<div
										style={{
											display: "flex",
											"flex-direction": "column",
											gap: "8px",
										}}
									>
										<For each={images}>
											{(_, index) => (
												<Button
													variant={
														pageIndex() === index() ? "solid" : "outline"
													}
													onClick={() => setPageIndex(index())}
												>
													Page {index() + 1}
												</Button>
											)}
										</For>
									</div>
								</Drawer.Body>
							</Drawer.Content>
						</Drawer.Positioner>
					</Drawer.Root>
				</div>
			</header>

			<main class={classes.stage}>
				<Show
					when={isDesktop()}
					fallback={
						<div class={classes.mobileStageInner}>
							<ResponsiveImage src={images[pageIndex()]} />
						</div>
					}
				>
					<div class={classes.stageInner}>
						<For each={papers}>
							{(paper) => {
								const isTurned = () =>
									getSpreadIndex(pageIndex()) > paper.index;
								const zIndex = () => {
									const active = isTurned();
									return active
										? paper.index + 1
										: totalPapers - paper.index + 10;
								};

								return (
									<div
										class={classes.paper}
										data-turned={isTurned()}
										style={{ "--z-index": zIndex() }}
									>
										<div class={classes.front}>
											<Show when={paper.front}>
												<ResponsiveImage src={paper.front} />
											</Show>
										</div>
										<div class={classes.back}>
											<Show when={paper.back}>
												<ResponsiveImage src={paper.back} />
											</Show>
										</div>
									</div>
								);
							}}
						</For>
					</div>
				</Show>
			</main>

			<Show when={pageIndex() > 0}>
				<button
					type="button"
					onClick={prev}
					class={classes.controlBtn}
					data-side="left"
					aria-label="Previous Page"
				>
					<ChevronLeft />
				</button>
			</Show>

			<Show when={pageIndex() < totalPages - 1}>
				<button
					type="button"
					onClick={next}
					class={classes.controlBtn}
					data-side="right"
					aria-label="Next Page"
				>
					<ChevronRight />
				</button>
			</Show>

			<footer class={classes.bottomNav}>
				<div style={{ "margin-right": "auto", "font-weight": "500" }}>
					{pageIndex() + 1} / {totalPages}
				</div>
				<div style={{ display: "flex", gap: "8px", "margin-left": "auto" }}>
					<For each={images}>
						{(_, index) => (
							<Button
								variant={pageIndex() === index() ? "solid" : "plain"}
								size="sm"
								onClick={() => setPageIndex(index())}
							>
								{index() + 1}
							</Button>
						)}
					</For>
				</div>
			</footer>
		</div>
	);
}
