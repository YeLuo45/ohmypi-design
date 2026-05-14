# Oh My Pi Design

Design documentation site for [oh-my-pi](https://github.com/can1357/oh-my-pi) — an AI coding agent for the terminal.

**GitHub Repository**: https://github.com/yeluo45/ohmypi-design

## Project Structure

```
ohmypi-design/
├── README.md
├── .github/workflows/deploy.yml
├── docs-site/
│   ├── package.json
│   ├── index.md              # 首页
│   ├── architecture.md       # 架构总览
│   ├── core-systems.md       # 核心系统
│   ├── tool-system.md        # 工具系统
│   ├── session-management.md # 会话管理
│   ├── cli-reference.md      # CLI 参考
│   ├── config-usage.md       # 配置与使用
│   ├── custom-tools.md       # 自定义工具
│   ├── natives-architecture.md # Natives 架构
│   ├── tui-rendering.md      # TUI 渲染
│   ├── skills.md             # Skills
│   ├── mcp-integration.md    # MCP 集成
│   ├── sdk.md                # SDK
│   ├── rpc.md                # RPC 模式
│   └── .vitepress/
│       ├── config.mjs       # VitePress 配置 (青绿色主题)
│       ├── theme/
│       │   ├── index.js
│       │   └── custom.css
│       ├── public/
│       │   └── favicon.svg
│       └── dist/            # 构建产物
```

## Tech Stack

| 技术 | 用途 |
|------|------|
| TypeScript | 主语言 |
| Rust | 性能关键模块 |
| Bun | JavaScript 运行时 |
| VitePress | 文档站点 |

## Packages

| Package | 说明 |
|---------|------|
| `packages/ai` | 多提供商 LLM 客户端 |
| `packages/agent` | Agent 运行时 |
| `packages/coding-agent` | 主 CLI 应用 |
| `packages/tui` | 终端 UI 库 |
| `packages/natives` | Rust 原生绑定 |
| `packages/stats` | 可观测性面板 |
| `packages/utils` | 共享工具 |

## GitHub Pages Deployment

**URL**: https://yeluo45.github.io/ohmypi-design/

**Base Path**: `/ohmypi-design/`

**Setup Required**:
1. Create GitHub repo `ohmypi-design`
2. Add remote: `git remote add origin https://github.com/yeluo45/ohmypi-design.git`
3. Push: `git push -u origin master`
4. GitHub Settings → Pages → Source: GitHub Actions

## Local Development

```bash
cd docs-site
pnpm install
pnpm run dev
```

## License

MIT License - See [oh-my-pi](https://github.com/can1357/oh-my-pi/blob/main/LICENSE)