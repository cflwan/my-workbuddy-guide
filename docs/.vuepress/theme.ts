import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar/index.js";

export default hopeTheme({
  logo: "/logo.svg",

  author: {
    name: "cfl",
    url: "https://github.com/cflwan",
  },

  repo: "",
  docsDir: "docs",

  navbar,
  sidebar,

  print: false,
  pure: true,
  focus: false,
  breadcrumb: true,
  displayFooter: true,
  footer: "MIT Licensed | 用大白话讲 WorkBuddy",

  pageInfo: ["Author", "Date", "Word", "ReadingTime"],

  blog: false,

  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    gfm: true,
    mark: true,
    tasklist: true,
    tabs: true,
  },

  plugins: {
    copyCode: true,
    copyright: {
      author: "WorkBuddy 大白话指南",
      license: "MIT",
      triggerLength: 100,
      maxLength: 700,
      global: true,
    },
    slimsearch: {
      maxSuggestions: 10,
      locales: {
        "/": {
          placeholder: "搜索你想知道的...",
        },
      },
    },
  },
});
