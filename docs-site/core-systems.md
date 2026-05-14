# Core Systems

> Oh My Pi 核心子系统详解

## 1. AI Package (`packages/ai`)

### 1.1 多提供商客户端

```typescript
import { createAI } from "@oh-my-pi/ai";

// 支持的提供商
const ai = createAI({
  provider: "openai", // openai | anthropic | opencode | local
  model: "gpt-4",
  apiKey: process.env.OPENAI_API_KEY,
  streaming: true,
});

// 流式调用
for await (const chunk of ai.complete("Hello")) {
  process.stdout.write(chunk);
}
```

### 1.2 模型发现与回退

```typescript
// 自动发现可用模型
const models = await ai.discoverModels();

// 故障自动回退
const response = await ai.withFallback([
  "claude-3-opus",
  "claude-3-sonnet",
  "gpt-4",
  "gpt-3.5-turbo",
]).complete(prompt);
```

---

## 2. Agent Package (`packages/agent`)

### 2.1 Agent 运行时

```typescript
import { Agent } from "@oh-my-pi/agent";

const agent = new Agent({
  ai,
  tools: [...defaultTools],
  systemPrompt: await Bun.file("prompts/agent.md").text(),
});

for await (const event of agent.run(userMessage)) {
  console.log(event);
}
```

### 2.2 状态管理

```typescript
interface AgentState {
  session: Session;
  context: Message[];
  tools: Tool[];
  model: string;
  compacting: boolean;
}

// 状态快照
const snapshot = agent.snapshot();
await Bun.write("session.json", JSON.stringify(snapshot));

// 状态恢复
agent.restore(snapshot);
```

---

## 3. TUI Package (`packages/tui`)

### 3.1 差异化渲染

```typescript
import { createTUI } from "@oh-my-pi/tui";

const tui = createTUI({
  stream: process.stdout,
  capabilities: detectTerminalCapabilities(),
});

// 高效更新
tui.render({
  type: "diff",  // 只更新变化的部分
  region: { x: 0, y: 10, width: 80, height: 20 },
  content: newContent,
});
```

### 3.2 终端检测

```typescript
import { detectTerminal, Capability } from "@oh-my-pi/tui";

const term = detectTerminal(process.env);

if (term.supports(Capability.ANSI_COLORS)) {
  // 使用颜色
}

if (term.supports(Capability.HYPERLINKS)) {
  // 支持超链接
}
```

---

## 4. Natives Package (`packages/natives`)

### 4.1 Rust 原生操作

```typescript
import { textWidth, wrapText, grep, glob } from "@oh-my-pi/pi-natives";

// 文本宽度计算 (考虑 ANSI 转义码)
const width = textWidth("Hello \x1b[31mWorld\x1b[0m"); // = 11

// 文本包裹
const lines = wrapText(text, { width: 80, wordWrap: true });

// 高性能 grep
const matches = grep({
  pattern: "function \\w+",
  files: await glob("**/*.ts"),
  context: 2,
});
```

---

## 5. Stats Package (`packages/stats`)

### 5.1 本地可观测性

```bash
# 启动统计面板
omp stats

# 输出示例
┌─────────────────────────────────────┐
│  Oh My Pi Stats Dashboard          │
├─────────────────────────────────────┤
│  Sessions:     42                   │
│  Tokens:       1.2M (~$3.40)       │
│  Avg Session:  156 messages         │
│  Top Model:    claude-3-opus (67%)  │
└─────────────────────────────────────┘
```

---

## 6. Utils Package (`packages/utils`)

### 6.1 共享工具

| 工具 | 说明 |
|------|------|
| `logger` | 结构化日志，带日志级别和输出目标 |
| `streams` | `readStream`, `readLines` 封装 |
| `temp` | 临时文件/目录管理 |
| `errors` | `isEnoent`, `is ECONNREFUSED` 等错误判断 |

### 6.2 日志示例

```typescript
import { createLogger } from "@oh-my-pi/pi-utils";

const log = createLogger({
  level: "debug",
  destination: "file",
  path: "./logs/omp.log",
});

log.info("Agent started", { sessionId: "abc123" });
log.debug("Tool call", { tool: "read", args: [...] });
log.error("API failed", { error: err.message });
```