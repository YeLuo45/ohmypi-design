# Tool System

> Oh My Pi 工具系统：40+ 内置工具 + 自定义扩展

## 1. 内置工具分类

### 1.1 文件操作 (8)

| 工具 | 说明 | 签名 |
|------|------|------|
| `Read` | 读取文件内容 | `(path: string) => string` |
| `Write` | 写入文件 | `(path: string, content: string) => void` |
| `Edit` | 编辑文件 | `(path: string, old: string, new: string) => void` |
| `Glob` | 文件模式匹配 | `(pattern: string) => string[]` |
| `Mkdir` | 创建目录 | `(path: string) => void` |
| `Rm` | 删除文件/目录 | `(path: string) => void` |
| `Cp` | 复制文件 | `(src: string, dest: string) => void` |
| `Mv` | 移动/重命名 | `(src: string, dest: string) => void` |

### 1.2 Git 操作 (6)

| 工具 | 说明 | 签名 |
|------|------|------|
| `git-status` | Git 状态 | `() => GitStatus` |
| `git-diff` | 文件差异 | `(path?: string) => Diff[]` |
| `git-log` | 提交历史 | `(n?: number) => Commit[]` |
| `git-file-diff` | 单文件变更分析 | `(path: string) => Hunk[]` |
| `git-hunk` | 提交块信息 | `(sha: string) => Hunk[]` |
| `git-overview` | 仓库概览 | `() => GitOverview` |

### 1.3 代码搜索 (5)

| 工具 | 说明 | 签名 |
|------|------|------|
| `Grep` | 正则搜索 | `(pattern: string, files?: string[]) => Match[]` |
| `Find` | 文件名搜索 | `(name: string) => string[]` |
| `Search` | Web 搜索 | `(query: string) => SearchResult[]` |
| `SearchCode` | 代码搜索 | `(query: string) => CodeResult[]` |
| `Lookup` | 符号查找 | `(symbol: string) => Definition[]` |

### 1.4 终端执行 (4)

| 工具 | 说明 | 签名 |
|------|------|------|
| `Bash` | 执行命令 | `(cmd: string) => BashResult` |
| `Exec` | 进程执行 | `(cmd: string[], opts?: ExecOpts) => ExecResult` |
| `Spawn` | 异步进程 | `(cmd: string[]) => ChildProcess` |
| `Kill` | 终止进程 | `(pid: number) => void` |

### 1.5 LLM 调用 (3)

| 工具 | 说明 | 签名 |
|------|------|------|
| `Ask` | 询问模型 | `(prompt: string) => string` |
| `Complete` | 补全文本 | `(text: string) => string` |
| `Embed` | 嵌入向量 | `(text: string) => number[]` |

---

## 2. 工具注册

### 2.1 注册内置工具

```typescript
import { registerBuiltinTools } from "@oh-my-pi/agent/tools";

const agent = new Agent({});
registerBuiltinTools(agent);

// 启用/禁用特定工具
agent.enableTool("git-commit");
agent.disableTool("Spawn");
```

### 2.2 注册自定义工具

```typescript
agent.registerTool({
  name: "my-tool",
  description: "执行自定义操作",
  parameters: {
    type: "object",
    properties: {
      input: { type: "string", description: "输入内容" },
    },
    required: ["input"],
  },
  handler: async ({ input }) => {
    return { result: processTool(input) };
  },
});
```

### 2.3 工具参数验证

```typescript
const { success, data, error } = agent.validateToolCall({
  name: "my-tool",
  arguments: { input: "test" },
});

if (!success) {
  return { error: `Invalid arguments: ${error}` };
}
```

---

## 3. MCP 工具

### 3.1 MCP Server 集成

```typescript
import { createMcpClient } from "@oh-my-pi/agent/mcp";

// 连接到 MCP Server
const mcp = await createMcpClient({
  command: "npx",
  args: ["-y", "@modelcontextprotocol/server-filesystem", "/path"],
  env: { ... },
});

// 注册 MCP 工具
for (const tool of mcp.listTools()) {
  agent.registerMcpTool({
    server: mcp,
    tool: tool.name,
    description: tool.description,
    parameters: tool.inputSchema,
  });
}
```

### 3.2 MCP Server 创作

```typescript
// docs/mcp-server-tool-authoring.md 指引
const server = createMcpServer({
  name: "my-server",
  version: "1.0.0",
  tools: [
    {
      name: "my-tool",
      description: "工具描述",
      inputSchema: { type: "object", properties: {...} },
      handler: async (params) => { ... }
    },
  ],
});

server.listen(3000);
```

---

## 4. 工具执行上下文

```typescript
interface ToolContext {
  session: Session;
  cwd: string;
  env: Record<string, string>;
  user: User;
  repo?: Repository;
}

const result = await agent.executeTool({
  name: "Read",
  arguments: { path: "src/index.ts" },
  context: toolContext,
});
```

---

## 5. 工具执行结果

```typescript
interface ToolResult {
  success: boolean;
  output?: string | object;
  error?: string;
  metadata?: {
    duration: number;
    tokens?: number;
    cacheHit?: boolean;
  };
}
```