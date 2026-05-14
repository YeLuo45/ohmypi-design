# Configuration & Usage

> Oh My Pi 配置系统详解

## 1. 配置层级

### 1.1 配置优先级 (低 → 高)

1. **默认配置** — 内置默认值
2. **全局配置** — `~/.omp/config.json`
3. **项目配置** — `.omp/config.json`
4. **环境变量** — `OMP_*` 前缀
5. **命令行参数** — 最高优先级

### 1.2 配置文件

```json
// ~/.omp/config.json (全局)
{
  "version": "1.0.0",
  "models": {
    "default": "claude-3-opus",
    "coder": "claude-3-sonnet",
    "fallback": "gpt-4"
  },
  "theme": {
    "dark": true,
    "transparency": true
  },
  "logging": {
    "level": "info",
    "path": "~/.omp/logs/"
  }
}
```

```json
// .omp/config.json (项目)
{
  "extends": "~/.omp/config.json",
  "models": {
    "default": "claude-3-sonnet"
  },
  "exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "**/.git/**"
  ]
}
```

---

## 2. 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `OMP_API_KEY` | API 密钥 | `sk-xxx` |
| `OMP_MODEL` | 默认模型 | `gpt-4` |
| `OMP_THEME` | 主题 | `dark` |
| `OMP_LOG_LEVEL` | 日志级别 | `debug` |
| `OMP_CONFIG` | 配置文件路径 | `./config.json` |

---

## 3. 模型配置

### 3.1 多模型配置

```json
{
  "models": {
    "default": "claude-3-opus",
    "coder": "claude-3-sonnet",
    "fast": "gpt-3.5-turbo",
    "fallback": ["claude-3-opus", "gpt-4", "gpt-3.5-turbo"]
  }
}
```

### 3.2 提供商配置

```json
{
  "providers": {
    "openai": {
      "apiKey": "sk-xxx",
      "baseUrl": "https://api.openai.com/v1",
      "organization": "org-xxx"
    },
    "anthropic": {
      "apiKey": "sk-ant-xxx",
      "baseUrl": "https://api.anthropic.com"
    }
  }
}
```

---

## 4. 终端设置

### 4.1 终端检测

Oh My Pi 自动检测终端能力：

```typescript
// 自动检测项
const capabilities = {
  ansiColors: boolean;      // 256 色支持
  trueColor: boolean;       // 24 位颜色
  hyperlinks: boolean;      // 超链接
  unicode: boolean;         // Unicode 完整支持
  sixel: boolean;           // 图形协议
 kitty: boolean;           // Kitty 图形协议
};
```

### 4.2 主题配置

```json
{
  "theme": {
    "dark": "github-dark",
    "light": "github-light",
    "syntax": {
      "theme": "github-dark",
      " фон": "#0d1117"
    }
  }
}
```

---

## 5. 使用示例

### 5.1 基本使用

```bash
# 启动交互式会话
omp

# 发送单条消息
omp "Explain this code"
omp "Explain this code" --model claude-3-opus
```

### 5.2 项目级使用

```bash
# 在项目中初始化
cd my-project
omp init

# 自动读取 .omp/config.json
omp "Fix the bug"
```

### 5.3 MCP 使用

```bash
# 列出已配置的 MCP 服务器
omp mcp list

# 添加 MCP 服务器
omp mcp add filesystem -y @modelcontextprotocol/server-filesystem .

# 调用 MCP 工具
omp "List files in /tmp" --use-mcp filesystem
```