// Quick sanity check: syntax-check every JS module and make sure relative imports resolve.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = new URL("../src/", import.meta.url).pathname;
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    statSync(p).isDirectory() ? walk(p) : p.endsWith(".js") && files.push(p);
  }
})(root);

let bad = 0;
for (const f of files) {
  const r = spawnSync(process.execPath, ["--check", f], { encoding: "utf8" });
  if (r.status !== 0) { bad++; console.error("SYNTAX", f, r.stderr); }
  for (const m of readFileSync(f, "utf8").matchAll(/from\s+["'](\.[^"']+)["']/g)) {
    if (!existsSync(resolve(dirname(f), m[1]))) { bad++; console.error("MISSING IMPORT", f, "→", m[1]); }
  }
}
console.log(bad ? `${bad} problem(s)` : `OK — ${files.length} modules checked`);
process.exit(bad ? 1 : 0);
