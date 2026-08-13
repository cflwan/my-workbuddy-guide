import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/guide/": [
    {
      text: "学习路线",
      icon: "map",
      prefix: "/guide/",
      children: ["index.md"],
    },
  ],

  "/start/": [
    {
      text: "快速上手",
      icon: "rocket",
      prefix: "/start/",
      children: [
        "00-index.md",
        "01-what-is-workbuddy.md",
        "02-installation.md",
        "03-first-task.md",
        "04-interface.md",
        "05-create-task.md",
        "06-conversation.md",
        "07-results.md",
        "08-task-management.md",
      ],
    },
  ],

  "/features/": [
    {
      text: "功能详解",
      icon: "book",
      prefix: "/features/",
      children: [
        "00-index.md",
        "01-connectors.md",
        "02-experts.md",
        "03-skills.md",
        "04-automations.md",
        "05-mcp.md",
        "06-memory.md",
        "07-file-access.md",
        "08-sharing.md",
      ],
    },
  ],

  "/recipes/": [
    {
      text: "实战案例",
      icon: "lightbulb",
      prefix: "/recipes/",
      children: [
        "00-index.md",
        "01-write-report.md",
        "02-data-analysis.md",
        "03-make-ppt.md",
        "04-deep-research.md",
        "05-batch-files.md",
        "06-write-code.md",
        "07-design.md",
        "08-email.md",
      ],
    },
  ],

  "/manual/": [
    {
      text: "参考手册",
      icon: "gear",
      prefix: "/manual/",
      children: ["00-index.md"],
    },
  ],

  "/": [
    {
      text: "导航",
      icon: "home",
      children: [
        "/guide/",
        "/start/",
        "/features/",
        "/recipes/",
        "/manual/",
      ],
    },
  ],
});
