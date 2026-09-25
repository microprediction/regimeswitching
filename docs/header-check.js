// One canonical header, byte-identical on every page of the site.
const fs = require("fs"); const path = require("path");
const dir = path.join(__dirname); const pages = fs.readdirSync(dir).filter(f => f.endsWith(".html"));
const grab = s => { const m = s.match(/<header class="site-header">[\s\S]*?<\/header>/); return m ? m[0] : null; };
const ref = grab(fs.readFileSync(path.join(dir, "index.html"), "utf8")); let bad = 0;
for (const p of pages) { const h = grab(fs.readFileSync(path.join(dir, p), "utf8")); if (h !== ref) { console.log("header differs: " + p); bad++; } }
console.log(bad ? bad + " page(s) differ" : "header check passed: one header on " + pages.length + " pages"); process.exit(bad ? 1 : 0);
