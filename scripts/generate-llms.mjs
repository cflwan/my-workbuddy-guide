/**
 * generate-llms.mjs - 构建前生成 llms.txt（AI 搜索入口文件）
 *
 * 用法：node scripts/generate-llms.mjs
 * 已挂入 package.json 的 build 脚本（vuepress build 之前自动跑）
 *
 * 产物：docs/.vuepress/public/llms.txt
 * 作用：ChatGPT / Perplexity 等 AI 搜索引擎读取的站点地图，
 *       帮助 AI 理解站点结构并正确引用你的内容。
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = join(__dirname, "..", "docs");
const OUT_PATH = join(DOCS_DIR, ".vuepress", "public", "llms.txt");

// ======= 站点配置（换站时只改这里）=======
const SITE = {
  name: "WorkBuddy 大白话指南",
  url: "https://my-workbuddy-guide.pages.dev",
  description:
    "用大白话讲明白腾讯 WorkBuddy 怎么用：快速上手、功能详解、实战案例，一个普通开发者的学习笔记。",
  topics: ["WorkBuddy 教程", "WorkBuddy 怎么用", "AI 办公", "腾讯 WorkBuddy", "WorkBuddy 指南"],
};

// 分类目录 => 展示名
const SECTION_NAMES = {
  guide: "学习路线",
  start: "快速上手",
  features: "功能详解",
  recipes: "实战案例",
  manual: "参考手册",
};

/** 递归收集所有 md 文件（排除 .vuepress） */
function collectMdFiles(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === ".vuepress" || entry === "node_modules") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectMdFiles(full, acc);
    } else if (entry.endsWith(".md")) {
      acc.push(full);
    }
  }
  return acc;
}

/** 从 frontmatter 提取 title / description */
function parseFrontmatter(content) {
  const fm = {};
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return fm;
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*"?(.+?)"?\s*$/);
    if (kv) fm[kv[1]] = kv[2];
  }
  if (!fm.title) {
    const h1 = content.match(/^#\s+(.+)$/m);
    if (h1) fm.title = h1[1].trim();
  }
  return fm;
}

const files = collectMdFiles(DOCS_DIR);
const lines = [];

lines.push(`# ${SITE.name}`);
lines.push("");
lines.push(`> ${SITE.description}`);
lines.push("");
lines.push(` Topics: ${SITE.topics.join(", ")}`);
lines.push("");
lines.push(`Site URL: ${SITE.url}`);
lines.push("");

// 按 section 分组
const groups = {};
for (const file of files) {
  const rel = relative(DOCS_DIR, file);
  const section = rel.split("/")[0] === "index.md" ? "root" : rel.split("/")[0];
  (groups[section] ??= []).push({ file, rel });
}

lines.push("## 页面清单");
lines.push("");

const sectionOrder = ["root", ...Object.keys(SECTION_NAMES)];
for (const section of sectionOrder) {
  const items = groups[section];
  if (!items || items.length === 0) continue;

  const sectionTitle =
    section === "root" ? "首页" : (SECTION_NAMES[section] ?? section);
  lines.push(`### ${sectionTitle}`);
  lines.push("");

  for (const { file, rel } of items) {
    const fm = parseFrontmatter(readFileSync(file, "utf-8"));
    const urlPath = rel.replace(/\.md$/, "").replace(/(^|\/)index$/, "$1");
    const url = `${SITE.url}/${urlPath}`;
    const desc = fm.description ? `：${fm.description}` : "";
    lines.push(`- [${fm.title ?? rel}](${url})${desc}`);
  }
  lines.push("");
}

writeFileSync(OUT_PATH, lines.join("\n"), "utf-8");
console.log(`✅ llms.txt 已生成：${OUT_PATH}（${files.length} 个页面）`);
