import type { ImageData } from "@responsive-image/core";
import { ResponsiveImage } from "@responsive-image/solid";
import { ChevronLeft, ChevronRight, LayoutGrid, X } from "lucide-solid";
import {
	createEffect,
	createMemo,
	createSignal,
	For,
	onCleanup,
	Show,
} from "solid-js";
import { css } from "styled-system/css";
import { flipbookShell } from "styled-system/recipes";
import { Button } from "~/components/ui/button";
import * as Drawer from "~/components/ui/drawer";
import { IconButton } from "~/components/ui/icon-button";

interface FlipbookStageProps {
	title: string;
	images: ImageData[];
	toc: { label: string; pageIndex: number }[];
}

export default function FlipbookStage(props: FlipbookStageProps) {
	const [pageIndex, setPageIndex] = createSignal(0);
	const [isDesktop, setIsDesktop] = createSignal(false);

	const images = () => props.images;
	const totalPages = () => images().length;
	const totalPapers = () => Math.ceil(totalPages() / 2);

	const papers = createMemo(() => {
		return Array.from({ length: totalPapers() }, (_, i) => ({
			index: i,
			front: images()[i * 2],
			back: images()[i * 2 + 1],
		}));
	});

	const getSpreadIndex = (p: number) => Math.floor((p + 1) / 2);
	const getPageIndexFromSpread = (s: number) => (s === 0 ? 0 : s * 2 - 1);

	createEffect(() => {
		// Keep logic only, CSS handles rendering natively
		const mediaQuery = window.matchMedia("(min-width: 768px)");
		setIsDesktop(mediaQuery.matches);
		const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
		mediaQuery.addEventListener("change", handler);
		onCleanup(() => mediaQuery.removeEventListener("change", handler));
	});

	const next = () =>
		setPageIndex((p) => {
			if (!isDesktop()) return Math.min(totalPages() - 1, p + 1);
			const currentSpread = getSpreadIndex(p);
			const maxSpread = getSpreadIndex(totalPages() - 1);
			const nextSpread = Math.min(maxSpread, currentSpread + 1);
			const targetIndex = getPageIndexFromSpread(nextSpread);
			return Math.min(totalPages() - 1, targetIndex);
		});

	const prev = () =>
		setPageIndex((p) => {
			if (!isDesktop()) return Math.max(0, p - 1);
			const currentSpread = getSpreadIndex(p);
			const prevSpread = Math.max(0, currentSpread - 1);
			const targetIndex = getPageIndexFromSpread(prevSpread);
			return Math.max(0, targetIndex);
		});

	const first = () => setPageIndex(0);
	const last = () => setPageIndex(totalPages() - 1);

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

	const [drawerOpen, setDrawerOpen] = createSignal(false);
	const classes = flipbookShell();

	return (
		<Drawer.Root
			open={drawerOpen()}
			onOpenChange={(e) => setDrawerOpen(e.open)}
		>
			<div class={classes.root}>
				<header class={classes.header}>
					<div
						class={css({
							display: { base: "none", md: "flex" },
							width: "100%",
							justifyContent: "space-between",
							alignItems: "center",
						})}
					>
						<h1 style={{ "font-size": "1.25rem", "font-weight": "bold" }}>
							{props.title}
						</h1>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setDrawerOpen(true)}
						>
							<LayoutGrid size={16} /> Pages
						</Button>
					</div>

					<div class={css({ display: { base: "flex", md: "none" } })}>
						<IconButton
							aria-label="Close"
							variant="plain"
							onClick={() => window.history.back()}
							style={{
								background: "rgba(0,0,0,0.4)",
								color: "white",
								"border-radius": "50%",
							}}
						>
							<X />
						</IconButton>
					</div>
				</header>

				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title>Table of Contents</Drawer.Title>
							<Drawer.CloseTrigger
								asChild={(closeProps: unknown) => (
									<IconButton
										variant="plain"
										size="sm"
										{...(closeProps as Record<string, unknown>)}
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
									gap: "12px",
									padding: "16px 0",
								}}
							>
								<For each={props.toc}>
									{(item) => (
										<Button
											variant={
												pageIndex() === item.pageIndex ? "solid" : "outline"
											}
											onClick={() => {
												setPageIndex(item.pageIndex);
												setDrawerOpen(false);
											}}
											style={{ "justify-content": "flex-start" }}
										>
											{item.label}
										</Button>
									)}
								</For>
							</div>
						</Drawer.Body>
					</Drawer.Content>
				</Drawer.Positioner>

				<main class={classes.stage}>
					<div class={classes.mobileStageInner}>
						<ResponsiveImage src={images()[pageIndex()]} />
					</div>
					<div class={classes.stageInner}>
						<For each={papers()}>
							{(paper) => {
								const isTurned = () =>
									getSpreadIndex(pageIndex()) > paper.index;
								const zIndex = () => {
									const active = isTurned();
									return active
										? paper.index + 1
										: totalPapers() - paper.index + 10;
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

				<Show when={pageIndex() < totalPages() - 1}>
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
					<div
						style={{
							"margin-right": "auto",
							"font-weight": "500",
							"min-width": "60px",
						}}
					>
						{pageIndex() + 1} / {totalPages()}
					</div>
					<div
						style={{
							display: "flex",
							gap: "8px",
							"margin-left": "auto",
							"overflow-x": "auto",
						}}
					>
						<For each={props.toc}>
							{(item) => {
								const isCurrent = () => {
									const currentIndex = pageIndex();
									const spreadIndex = getSpreadIndex(currentIndex);
									const itemSpreadIndex = getSpreadIndex(item.pageIndex);
									return spreadIndex === itemSpreadIndex; // Highlight if on same spread on desktop
								};
								return (
									<Button
										variant={isCurrent() ? "solid" : "plain"}
										size="sm"
										onClick={() => setPageIndex(item.pageIndex)}
									>
										{item.label}
									</Button>
								);
							}}
						</For>
					</div>
				</footer>

				<footer class={classes.mobileBottomNav}>
					<IconButton
						aria-label="Previous"
						variant="plain"
						onClick={prev}
						disabled={pageIndex() === 0}
					>
						<ChevronLeft color="white" />
					</IconButton>
					<div style={{ "font-weight": "500" }}>
						{pageIndex() + 1} / {totalPages()}
					</div>
					<IconButton
						aria-label="Next"
						variant="plain"
						onClick={next}
						disabled={pageIndex() === totalPages() - 1}
					>
						<ChevronRight color="white" />
					</IconButton>
					<IconButton
						aria-label="Pages"
						variant="plain"
						onClick={() => setDrawerOpen(true)}
					>
						<LayoutGrid color="white" />
					</IconButton>
				</footer>
			</div>
		</Drawer.Root>
	);
}
