# SDK

> Oh My Pi 编程接口

## 1. 安装

```bash
npm install @oh-my-pi/agent
# 或
bun add @oh-my-pi/agent
```

## 2. 基本使用

```typescript
import { createAgent } from "@oh-my-pi/agent";

const agent = await createAgent({
  model: "claude-3-opus",
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const response = await agent.complete({
  prompt: "Explain this code: " + code,
});

console.log(response.text);
```

## 3. 流式输出

```typescript
const stream = agent.completeStream({
  prompt: "Write a function",
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text);
}
```

## 4. 工具调用

```typescript
const agent = await createAgent({
  tools: ["Read", "Write", "Bash"],
});

const result = await agent.run({
  prompt: "Read src/index.ts and explain it",
});
```

详见 [SDK 文档](https://github.com/can1357/oh-my-pi/blob/main/docs/sdk.md)。