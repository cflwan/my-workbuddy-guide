---
description: "MCP 配置 - 接入更多外部工具"
---

# MCP 配置

## MCP 是个啥

MCP 全称 Model Context Protocol，听着唬人，其实就一句话：它是个标准接口，让 AI 能调用外部工具。

打个比方：WorkBuddy 本身会聊天、会写代码，但它天生不会操作你的浏览器，不会读你本地某个特定文件夹。

MCP 就是给它装"插件"的口子。你配一个 MCP 服务器，WorkBuddy 就多一项本事。配个 Playwright，它就能操控浏览器；配个 filesystem，它就能读写指定目录。

## 在哪配

配置文件在 `~/.workbuddy/mcp.json`。

这个文件不存在的话，自己建一个。结构是个 JSON，里面列出你要启用的 MCP 服务器。

## 一个配置长啥样

举个 filesystem 的例子，大概这样：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/你的名字/Documents"]
    }
  }
}
```

关键字段：
- `mcpServers` - 所有服务器的总入口
- 里面的每个 key（比如 `filesystem`）是服务名，自己起
- `command` - 启动这个服务用的命令
- `args` - 命令参数，最后一个通常是你要让它访问的路径

## 几个常用 MCP

**Playwright（浏览器自动化）**：让 WorkBuddy 能开浏览器、点击、截图、抓网页内容。适合自动化测试、爬取数据、网页截图。

**filesystem（文件系统）**：让 WorkBuddy 能读写指定目录的文件。适合批量处理本地文件、读取配置、写日志。

**GitHub**：让 WorkBuddy 能操作 GitHub 仓库。适合管 issue、看 PR、自动提交。

::: tip 装前查一下
MCP 服务器列表会变，具体有哪些可用、怎么配，建议先查官方文档或社区。
:::

## 怎么启用

1. 编辑 `~/.workbuddy/mcp.json`
2. 按格式加一个服务器配置
3. 保存
4. 重启 WorkBuddy（或者让它重新加载配置）
5. 在应用里确认这个 MCP 服务已经连上

连上之后，WorkBuddy 在对话时会自动识别能用上的 MCP 工具，你不用显式调用。多个一起配就往 `mcpServers` 里多写几个 key，格式一样。

## 排查问题

**连不上**
- 命令对不对，`npx` 是否装了（需要 Node.js）
- 路径写对没，绝对路径别写错
- 看应用里的连接状态，有没有报错

**工具没生效**
- 确认配置保存了
- 确认重启了 WorkBuddy
- 在对话里明确让它用那个工具试试

**报权限错**
- filesystem 这种要确认路径权限
- 有些 MCP 要额外配 API key 或 token

## 安全提醒

::: tip 注意权限边界
MCP 配的就是"给 AI 多大开的权限"。filesystem 给了 `/` 就是全盘可读写，危险。给具体子目录就行。
:::

别随便配来路不明的 MCP 服务器。它能让 AI 执行命令、读写文件，等于给它开了后门。用官方的、社区验证过的。

## 我的建议

::: tip 按需配
别贪多。用到哪个配哪个。配一堆用不上的，启动慢还容易出问题。
:::

新手建议从 filesystem 开始配，最简单也最实用。能跑通了再试复杂的。
