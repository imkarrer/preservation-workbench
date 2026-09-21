#!/usr/bin/env node
// Parse every ```mermaid block under the given paths (default: docs/, PLAN.md,
// README.md) with the real Mermaid parser, so a diagram that GitHub would
// refuse to render fails here first. Parse only — no Chromium, no rendering.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>");
globalThis.window = dom.window;
globalThis.document = dom.window.document;
const mermaid = (await import("mermaid")).default;
mermaid.initialize({ startOnLoad: false });

function* markdownFiles(p) {
    const st = statSync(p);
    if (st.isDirectory()) {
        for (const e of readdirSync(p)) if (e !== "node_modules") yield* markdownFiles(join(p, e));
    } else if (p.endsWith(".md")) {
        yield p;
    }
}

const roots = process.argv.slice(2);
if (roots.length === 0) roots.push("docs", "PLAN.md", "README.md");

let blocks = 0, failures = 0;
for (const root of roots) {
    for (const file of markdownFiles(root)) {
        const text = readFileSync(file, "utf8");
        const re = /```mermaid\n([\s\S]*?)```/g;
        let m, i = 0;
        while ((m = re.exec(text)) !== null) {
            i++; blocks++;
            const line = text.slice(0, m.index).split("\n").length;
            try {
                await mermaid.parse(m[1]);
            } catch (e) {
                failures++;
                const msg = String(e.message || e).split("\n").slice(0, 3).join(" | ");
                console.error(`${relative(".", file)}:${line} block ${i}: ${msg}`);
            }
        }
    }
}
console.log(`${blocks} mermaid block(s) checked, ${failures} failed`);
process.exit(failures ? 1 : 0);
