// @refresh reload
import { applySSR } from "@responsive-image/core/thumbhash/ssr";
import { mount, StartClient } from "@solidjs/start/client";

// Decode ThumbHash LQIP placeholders before app mounts
applySSR();

mount(() => <StartClient />, document.getElementById("app") as HTMLElement);
