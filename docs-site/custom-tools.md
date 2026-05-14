# Custom Tools

> Oh My Pi 自定义工具、Hook 和 Skills 开发指南

## 1. 自定义工具

### 1.1 工具定义

```typescript
// my-tools.ts
import { createTool } from "@oh-my-pi/agent";

export const myTools = [
  createTool({
    name: "web-fetch",
    description: "获取网页内容",
    parameters: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "网页 URL",
        },
        options: {
          type: "object",
          properties: {
            timeout: { type: "number", default: 30000 },
            headers: { type: "object" },
          },
        },
      },
      required: ["url"],
    },
    handler: async ({ url, options = {} }) => {
      const response = await fetch(url, {
        timeout: options.timeout,
        headers: options.headers,
      });
      return {
        status: response.status,
        contentType: response.headers.get("content-type"),
        body: await response.text(),
      };
    },
  }),

  createTool({
    name: "image-generate",
    description: "生成图片",
    parameters: {
      type: "object",
      properties: {
        prompt: { type: "string" },
        size: {
          type: "string",
          enum: ["256x256", "512x512", "1024x1024"],
          default: "1024x1024",
        },
      },
      required: ["prompt"],
    },
    handler: async ({ prompt, size }) => {
      // 调用图片生成 API
      const result = await generateImage({ prompt, size });
      return { url: result.url };
    },
  }),
];
```

### 1.2 注册工具

```bash
# 通过配置文件注册
# .omp/config.json
{
  "tools": {
    "register": [
      "./my-tools.ts",
      "@my-org/my-tool-package"
    ]
  }
}
```

```typescript
// 或通过代码注册
agent.registerTools(myTools);
```

---

## 2. Hooks

### 2.1 Hook 类型

| Hook | 时机 | 用途 |
|------|------|------|
| `before-tool` | 工具执行前 | 参数验证、日志 |
| `after-tool` | 工具执行后 | 结果处理、错误恢复 |
| `before-model` | 模型调用前 | 上下文增强、缓存 |
| `after-model` | 模型调用后 | 响应处理、后处理 |
| `on-error` | 错误发生时 | 错误处理、告警 |

### 2.2 Hook 实现

```typescript
agent.addHook({
  name: "log-tool-calls",
  type: "before-tool",
  handler: async (ctx) => {
    console.log(`[Tool] ${ctx.tool.name}`, ctx.tool.arguments);
    ctx.startTime = Date.now();
  },
});

agent.addHook({
  name: "track-usage",
  type: "after-tool",
  handler: async (ctx) => {
    const duration = Date.now() - ctx.startTime;
    await stats.record({
      event: "tool_used",
      tool: ctx.tool.name,
      duration,
      success: !ctx.error,
    });
  },
});
```

---

## 3. Skills

### 3.1 Skill 结构

```
.omp/
└── skills/
    └── my-skill/
        ├── SKILL.md          # Skill 定义
        ├── prompts/
        │   └── expand.md     # 展开提示
        └── scripts/
            └── validate.sh   # 验证脚本
```

### 3.2 SKILL.md 格式

```markdown
---
name: my-skill
description: 执行特定任务的 Skill
trigger: /my-skill
---

# My Skill

This skill helps with ...

## Usage

`/my-skill [options]`

## Options

- `--option1`: Description
```

### 3.3 使用 Skill

```bash
# 触发 Skill
omp /my-skill --option1 value

# 列出可用 Skills
omp skills list

# 安装 Skill
omp skills install ./my-skill
omp skills install https://registry.omp.sh/skills/my-skill
```

---

## 4. MCP Server 开发

### 4.1 创建 MCP Server

```typescript
// mcp-server.ts
import { createMcpServer } from "@oh-my-pi/agent/mcp";

const server = createMcpServer({
  name: "my-mcp-server",
  version: "1.0.0",
  tools: [
    {
      name: "my-tool",
      description: "我的工具",
      inputSchema: {
        type: "object",
        properties: {
          input: { type: "string" },
        },
      },
      handler: async ({ input }) => {
        return { result: doSomething(input) };
      },
    },
  ],
});

server.listen(3000);
```

### 4.2 连接到 Oh My Pi

```bash
# 启动 MCP Server
node mcp-server.ts &

# 在配置中注册
# .omp/config.json
{
  "mcp": {
    "servers": [
      {
        "name": "my-mcp-server",
        "command": "node",
        "args": ["./mcp-server.js"],
        "url": "http://localhost:3000"
      }
    ]
  }
}
```