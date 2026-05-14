# Session Management

> Oh My Pi 会话管理系统：导出、分享、分支、恢复

## 1. 会话概述

```typescript
interface Session {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
  model: string;
  tools: string[];
  context: SessionContext;
  metadata: SessionMetadata;
}
```

## 2. 会话操作

### 2.1 导出

```bash
# 导出会话
omp session export <session-id> -o session.json

# 包含附件
omp session export <session-id> --include-artifacts -o session.json
```

### 2.2 分享

```bash
# 生成分享链接
omp session share <session-id>

# 输出: https://omp.sh/s/abc123
```

### 2.3 分支

```bash
# 从当前会话创建分支
omp session fork <session-id> -n "feature-x"

# 在分支中继续工作
omp session use abc123
```

### 2.4 恢复

```bash
# 从文件恢复
omp session resume session.json

# 从分享恢复
omp session resume https://omp.sh/s/abc123
```

---

## 3. 上下文压缩

### 3.1 压缩触发条件

```typescript
const COMPACT_THRESHOLD = 0.85; // 上下文达到 85% 时压缩

function shouldCompact(context: Context): boolean {
  return context.usedTokens > context.maxTokens * COMPACT_THRESHOLD;
}
```

### 3.2 压缩策略

```typescript
interface CompactionStrategy {
  // 保留最近 N 条消息
  keepRecentMessages: number;

  // 保留重要消息 (如系统提示)
  preserveSystemMessages: boolean;

  // 合并相似消息
  mergeSimilarMessages: boolean;

  // 摘要长度
  summaryLength: number;
}

const defaultStrategy: CompactionStrategy = {
  keepRecentMessages: 10,
  preserveSystemMessages: true,
  mergeSimilarMessages: true,
  summaryLength: 500,
};
```

### 3.3 压缩执行

```bash
# 手动触发压缩
omp session compact

# 查看压缩统计
omp session compact --dry-run
```

---

## 4. 自动记忆

### 4.1 记忆类型

| 类型 | 说明 | 持久化 |
|------|------|--------|
| `project` | 项目上下文 | `.omp/memory/` |
| `user` | 用户偏好 | `~/.omp/memory/` |
| `session` | 会话级记忆 | 会话内 |

### 4.2 记忆存储

```typescript
// 自动保存到 .omp/memory/
const memory = await agent.getMemory({
  type: "project",
  key: "architecture-decisions",
});

// 记忆被用于上下文增强
const enhanced = await agent.enhanceContext(original, {
  includeMemory: true,
  memoryScope: ["project", "user"],
});
```