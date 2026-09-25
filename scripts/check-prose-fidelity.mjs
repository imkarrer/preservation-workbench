#!/usr/bin/env node
// Prove a deck commit changed the prose ONLY by tokenizing names.
//
// The rule (upstream doc/process.md): wrapping existing letters in {NAME}
// refs is allowed; adding, removing or rewording anything is not. This
// compares each changed page's prose against its committed version with all
// markup normalised away, so a single altered word fails loudly.
//
// Usage: check-prose-fidelity.mjs <lektor-repo> [baseRef]
import { execFileSync } from "node:child_process";

const repo = process.argv[2];
const base = process.argv[3] || "HEAD";

const changed = execFileSync("git", ["-C", repo, "diff", "--name-only", base, "--", "content/"],
    { encoding: "utf8" }).split("\n").filter(f => f.endsWith("contents.lr"));

// Prose fields only — the figure <script> is code, not narrative.
// Lektor separates top-level fields with `---` and flow-block fields with
// `----`, each on its own line. Split on those rather than regex lookahead,
// so a field that runs to end-of-file is still captured.
function prose(text) {
    const withoutFigures = text.replace(/<figure[\s\S]*?<\/figure>/g, "");
    const chunks = withoutFigures.split(/^-{3,4}$/m);
    const wanted = /^(statement|proof|guide):/;
    return chunks
        .filter(c => wanted.test(c.trimStart()))
        .map(c => c.trimStart().replace(wanted, ""))
        .join("\n");
}

// Reduce to bare words: strip {NAME}, {NAME|target}, markdown emphasis,
// HTML tags, [!just ...] refs and whitespace differences.
function normalise(s) {
    return s
        .replace(/\{([^}|:]+)(?:\|[^}:]+)?(?::[^}]+)?\}/g, "$1")  // {AB|x} -> AB
        .replace(/\[!just[^\]]*\]/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/[*_`]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

let failures = 0;
for (const file of changed) {
    let before;
    try {
        before = execFileSync("git", ["-C", repo, "show", `${base}:${file}`], { encoding: "utf8" });
    } catch { console.log(`NEW  ${file} (no committed version to compare)`); continue; }
    const after = execFileSync("cat", [`${repo}/${file}`], { encoding: "utf8" });

    const a = normalise(prose(before)), b = normalise(prose(after));
    if (a === b) { console.log(`OK   ${file}`); continue; }

    failures++;
    console.error(`FAIL ${file} — prose differs beyond tokenization`);
    const aw = a.split(" "), bw = b.split(" ");
    for (let i = 0, j = 0; i < aw.length || j < bw.length; i++, j++) {
        if (aw[i] !== bw[j]) {
            console.error(`  at word ${i}: committed "${aw.slice(i, i + 12).join(" ")}"`);
            console.error(`             working   "${bw.slice(j, j + 12).join(" ")}"`);
            break;
        }
    }
}
console.log(`${changed.length} page(s) checked, ${failures} failed`);
process.exit(failures ? 1 : 0);
