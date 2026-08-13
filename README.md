# WorkBuddy 大白话指南

用大白话讲明白 WorkBuddy 怎么用 - 个人 WorkBuddy 学习笔记导航站。

## 技术栈

- VuePress 2 + VuePress Theme Hope
- Vite bundler
- TypeScript

## 快速开始

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 构建静态站点
```

## 项目结构

```
my-workbuddy-guide/
├── docs/
│   ├── index.md              # 首页
│   ├── guide/                # 学习路线
│   ├── start/                # 快速上手（9篇）
│   ├── features/             # 功能详解（9篇）
│   ├── recipes/              # 实战案例（9篇）
│   ├── manual/               # 参考手册
│   └── .vuepress/            # 配置
├── package.json
├── LICENSE
└── README.md
```

## 部署

部署到 Cloudflare Pages：
```bash
npm run build
npx wrangler pages deploy docs/.vuepress/dist --project-name=my-workbuddy-guide
```

## License

MIT
