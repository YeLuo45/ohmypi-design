# RPC Mode

> Oh My Pi RPC 远程调用模式

## 1. 概述

RPC 模式允许远程调用 Oh My Pi 功能。

## 2. 启动 RPC Server

```bash
omp rpc serve --port 3000
```

## 3. 客户端调用

```typescript
import { createRPCClient } from "@oh-my-pi/agent/rpc";

const client = await createRPCClient({
  url: "http://localhost:3000",
  apiKey: "your-api-key",
});

const response = await client.complete({
  prompt: "Hello",
});

console.log(response.text);
```

## 4. API

| 方法 | 说明 |
|------|------|
| `complete` | 文本补全 |
| `completeStream` | 流式补全 |
| `tools` | 列出可用工具 |
| `invoke` | 调用工具 |

详见 [RPC 文档](https://github.com/can1357/oh-my-pi/blob/main/docs/rpc.md)。