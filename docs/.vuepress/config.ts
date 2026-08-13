import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  dest: "docs/.vuepress/dist",
  lang: "zh-CN",
  title: "WorkBuddy 大白话指南",
  description: "用大白话讲明白 WorkBuddy 怎么用 - 一个普通用户的学习笔记",

  head: [
    ["meta", { name: "robots", content: "index,follow" }],
    ["meta", { name: "author", content: "cfl" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "WorkBuddy 教程,WorkBuddy 怎么用,腾讯 WorkBuddy,AI 办公,AI 工作台,WorkBuddy 指南",
      },
    ],
    ["meta", { name: "theme-color", content: "#2563eb" }],
    ["meta", { name: "format-detection", content: "telephone=no" }],
  ],

  bundler: viteBundler(),
  theme,

  pagePatterns: ["**/*.md", "!.vuepress", "!node_modules"],
  shouldPrefetch: false,
  shouldPreload: false,
});
