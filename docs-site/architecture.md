# Architecture

> Oh My Pi 核心架构：基于 Bun + TypeScript + Rust 的 Monorepo AI 编程助手

## 1. Overview

| 指标 | 数值 |
|------|------|
| 语言 | TypeScript + Rust |
| 运行时 | Bun + Node.js |
| 核心包 | 7 个 |
| 架构风格 | Monorepo (Bun workspace) |

## 2. Package Structure

### 2.1 核心包

| Package | 路径 | 说明 |
|---------|------|------|
| `packages/ai` | `src/ai/` | 多提供商 LLM 客户端，支持流式输出 |
| `packages/agent` | `src/agent/` | Agent 运行时，工具调用和状态管理 |
| `packages/coding-agent` | `src/coding-agent/` | **主 CLI 应用** (核心焦点) |
| `packages/tui` | `src/tui/` | 终端 UI 库，差异化渲染 |
| `packages/natives` | `src/natives/` | 原生文本/图像/grep 操作绑定 |
| `packages/stats` | `src/stats/` | 本地可观测性面板 (`omp stats`) |
| `packages/utils` | `src/utils/` | 共享工具 (logger, streams, temp files) |

### 2.2 Rust 核心

| Crate | 路径 | 说明 |
|-------|------|------|
| `pi-natives` | `crates/pi-natives/` | 性能关键的文本/grep 操作 |

## 3. 技术栈

### 3.1 Bun Over Node

使用 Bun API 优先，Node.js 作为备选：

```typescript
// 文件读写 - 优先 Bun
const text = await Bun.file(path).text();
const data = await Bun.file(path).json();
await Bun.write(path, data);

// 进程执行 - 优先 Bun Shell
import { $ } from "bun";
const result = await $`git status`.cwd(dir).quiet().nothrow();

// HTTP 服务
Bun.serve({
  port: 3000,
  fetch(req) { ... }
});
```

### 3.2 TypeScript 规范

- **禁止使用 `any`** — 除非绝对必要
- **禁止使用 `ReturnType<>`** — 使用实际类型名
- **禁止内联导入** — 不使用 `await import()` 或动态类型导入
- **Barrel exports** — 优先 `export * from "./module"`
- **类私有字段** — 使用 ES `#private` 字段

### 3.3 Rust Natives

性能关键操作使用 Rust 实现：

```typescript
// packages/natives 封装 Rust 原生操作
import { textWidth, wrapText, grep } from "@oh-my-pi/pi-natives";
```

## 4. 数据流

```
User Input (Terminal)
       │
       ▼
┌─────────────────┐
│  coding-agent   │  ← 主 CLI 入口
│   (packages/    │
│  coding-agent)  │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌────────┐
│  TUI  │ │ Agent  │
│(render)│ │(reason)│
└───┬───┘ └────┬───┘
    │          │
    ▼          ▼
┌────────┐ ┌───────┐
│ Stats  │ │ AI    │
│Dashboard│ │Client │
└────────┘ └───┬───┘
              │
              ▼
         ┌────────┐
         │LLM API │
         │(Multi  │
         │Provider)│
         └────────┘
```

## 5. 会话管理

会话系统支持：

| 功能 | 说明 |
|------|------|
| Export | 导出会话为可分享格式 |
| Share | 分享会话给其他用户 |
| Fork | 从当前状态创建分支 |
| Resume | 从保存状态恢复 |

### 5.1 上下文压缩

自动压缩对话上下文以维持模型窗口效率：

```typescript
// 触发压缩条件
if (contextLength > maxTokens * 0.85) {
  await agent.compact();
}
```

## 6. 工具系统

### 6.1 内置工具 (40+)

| 类别 | 工具数 | 示例 |
|------|--------|------|
| 文件操作 | 8 | Read, Write, Edit, Glob |
| Git 操作 | 6 | Status, Diff, Commit, Log |
| 代码搜索 | 5 | Grep, Find, Search |
| 终端执行 | 4 | Bash, Exec, Spawn |
| LLM 调用 | 3 | Ask, Complete, Embed |

### 6.2 自定义工具

```typescript
// 注册自定义工具
agent.registerTool({
  name: "my-tool",
  description: "工具描述",
  parameters: { ... },
  handler: async (params) => { ... }
});
```

## 7. 配置系统

### 7.1 多层配置

1. **全局配置** — `~/.omp/config.json`
2. **项目配置** — `.omp/config.json`
3. **会话配置** — 命令行参数覆盖

### 7.2 模型配置

```json
{
  "models": {
    "default": "gpt-4",
    "coder": "claude-3-opus",
    "fallback": "gpt-3.5-turbo"
  }
}
```

## 8. MCP 集成

Model Context Protocol 支持：

```typescript
// 创建 MCP Server 工具
agent.registerMcpTool({
  server: "my-mcp-server",
  tool: "my-tool",
  parameters: { ... }
});
```

## 9. 开发工作流

### 9.1 包管理

使用 Bun workspace：

```bash
# 安装所有依赖
bun install

# 添加依赖到指定包
bun add <pkg> --workspace packages/ai

# 构建所有包
bun run build
```

### 9.2 类型检查

```bash
# 全局类型检查
bun run typecheck

# 单包类型检查
bun run typecheck --filter=@oh-my-pi/ai
```