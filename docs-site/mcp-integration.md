# MCP Integration

> Oh My Pi Model Context Protocol 集成

## 1. MCP 概述

MCP 允许连接外部工具服务器。

## 2. 内置 MCP Servers

```bash
# 文件系统
npx -y @modelcontextprotocol/server-filesystem .

# Git
npx -y @modelcontextprotocol/server-github

# Slack
npx -y @modelcontextprotocol/server-slack
```

## 3. 配置

```json
{
  "mcp": {
    "servers": [
      {
        "name": "filesystem",
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
      }
    ]
  }
}
```

## 4. 使用

```bash
# 列出 MCP 工具
omp tools --mcp

# 调用
omp "Read package.json" --use-mcp filesystem
```