// ─────────────────────────────────────────────────────────────────
// push_to_github.js  —  Generic GitHub push script
// Usage: node push_to_github.js <project-name>
//
// Pushes ALL files in this folder (except .env, push_to_github.js,
// and node_modules) into a subfolder named <project-name> in your
// GitHub repo. No hardcoded project list — works for any project.
// ─────────────────────────────────────────────────────────────────

const fs   = require("fs");
const path = require("path");
const https = require("https");

// ── Load .env ────────────────────────────────────────────────────
require("dotenv").config();

const TOKEN    = process.env.GITHUB_TOKEN;
const USERNAME = process.env.GITHUB_USERNAME;
const REPO     = "ai-transformation-ba-wellbeing-platform";

if (!TOKEN || !USERNAME) {
  console.error("❌  Missing GITHUB_TOKEN or GITHUB_USERNAME in .env");
  process.exit(1);
}

// ── Get project name from command line ───────────────────────────
const PROJECT = process.argv[2];

if (!PROJECT) {
  console.error("❌  Please provide a project name.");
  console.error("    Usage: node push_to_github.js <project-name>");
  console.error("    Example: node push_to_github.js project-e");
  process.exit(1);
}

// ── Files to skip (always) ───────────────────────────────────────
const SKIP = new Set([
  ".env",
  "push_to_github.js",
  "package.json",
  "package-lock.json",
  ".gitignore",
]);

// ── Collect files to push ────────────────────────────────────────
const allFiles = fs.readdirSync(".").filter(f => {
  if (SKIP.has(f))         return false;   // skip utility files
  if (f.startsWith("."))   return false;   // skip hidden files
  if (f === "node_modules") return false;  // skip node_modules
  if (fs.statSync(f).isDirectory()) return false; // skip folders
  return true;
});

if (allFiles.length === 0) {
  console.error("❌  No files found to push.");
  console.error("    Drop your project files into this folder first, then run the script.");
  process.exit(1);
}

console.log(`\n📁  Project  : ${PROJECT}`);
console.log(`📦  Repo     : ${USERNAME}/${REPO}`);
console.log(`📄  Files    : ${allFiles.join(", ")}\n`);

// ── GitHub API helper ────────────────────────────────────────────
function githubRequest(method, apiPath, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: "api.github.com",
      path: apiPath,
      method,
      headers: {
        "Authorization": `token ${TOKEN}`,
        "User-Agent":    USERNAME,
        "Accept":        "application/vnd.github.v3+json",
        "Content-Type":  "application/json",
        ...(data ? { "Content-Length": Buffer.byteLength(data) } : {}),
      },
    };

    const req = https.request(options, res => {
      let raw = "";
      res.on("data", chunk => raw += chunk);
      res.on("end", () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, body: raw }); }
      });
    });

    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

// ── Get existing file SHA (needed for updates) ───────────────────
async function getSHA(filePath) {
  const res = await githubRequest(
    "GET",
    `/repos/${USERNAME}/${REPO}/contents/${filePath}`
  );
  if (res.status === 200) return res.body.sha;
  return null;
}

// ── Push one file ────────────────────────────────────────────────
async function pushFile(localFile) {
  const remotePath = `${PROJECT}/${localFile}`;
  const content    = fs.readFileSync(localFile);
  const encoded    = content.toString("base64");
  const sha        = await getSHA(remotePath);

  const payload = {
    message: sha
      ? `Update ${localFile} in ${PROJECT}`
      : `Add ${localFile} to ${PROJECT}`,
    content: encoded,
    ...(sha ? { sha } : {}),
  };

  const res = await githubRequest(
    "PUT",
    `/repos/${USERNAME}/${REPO}/contents/${remotePath}`,
    payload
  );

  if (res.status === 200 || res.status === 201) {
    console.log(`✅  ${localFile}  →  ${remotePath}`);
  } else {
    console.error(`❌  Failed to push ${localFile}`);
    console.error(`    Status: ${res.status}`);
    console.error(`    Message: ${res.body?.message || "Unknown error"}`);
  }
}

// ── Main ─────────────────────────────────────────────────────────
(async () => {
  console.log("🚀  Pushing files to GitHub...\n");

  for (const file of allFiles) {
    await pushFile(file);
  }

  console.log(`\n🎉  Done! View your repo at:`);
  console.log(`    https://github.com/${USERNAME}/${REPO}/tree/main/${PROJECT}\n`);
})();
