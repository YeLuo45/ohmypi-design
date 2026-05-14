# CLI Reference

> Oh My Pi 命令行接口完整参考

## 1. 主命令

### `omp` / `oh-my-pi`

```bash
# 基本用法
omp [command] [options]

# 帮助
omp --help
omp <command> --help
```

---

## 2. 会话命令

### `omp session`

```bash
# 列出所有会话
omp session list

# 选项:
#   --limit <n>     限制数量 (默认: 10)
#   --model <name>  按模型筛选

# 示例
omp session list --limit 20
```

### `omp session export`

```bash
# 导出会话
omp session export <session-id> [options]

# 选项:
#   -o, --output <path>   输出文件路径
#   --include-artifacts   包含附件
#   --format <format>     格式: json | markdown (默认: json)

# 示例
omp session export abc123 -o session.json
```

### `omp session share`

```bash
# 分享会话
omp session share <session-id>

# 输出分享链接
# https://omp.sh/s/abc123
```

### `omp session fork`

```bash
# 创建分支
omp session fork <session-id> [options]

# 选项:
#   -n, --name <name>   分支名称
#   -d, --description <desc>  分支描述

# 示例
omp session fork abc123 -n "feature-x"
```

### `omp session resume`

```bash
# 恢复会话
omp session resume <source>

# source 可以是:
#   - 文件路径: ./session.json
#   - 分享链接: https://omp.sh/s/abc123
```

### `omp session compact`

```bash
# 压缩上下文
omp session compact [options]

# 选项:
#   --dry-run          预览压缩效果
#   --threshold <n>    压缩阈值 (默认: 0.85)

# 示例
omp session compact --dry-run
```

---

## 3. 提交命令

### `omp commit`

```bash
# AI 提交
omp commit [options]

# 选项:
#   -m, --message <msg>      提交信息
#   --push                   提交后推送
#   --dry-run                预览模式
#   --no-changelog           跳过更新 changelog
#   --context <path>         额外上下文
#   --legacy                 使用传统模式

# 示例
omp commit --push --dry-run
```

### `omp changelog`

```bash
# 生成 changelog
omp changelog [options]

# 选项:
#   --since <tag>           从指定标签
#   --file <path>            输出文件 (默认: CHANGELOG.md)
```

---

## 4. 配置命令

### `omp config`

```bash
# 查看配置
omp config [key]

# 设置配置
omp config set <key> <value>

# 示例
omp config set models.default gpt-4
omp config set theme.dark true
```

---

## 5. 工具命令

### `omp stats`

```bash
# 显示统计面板
omp stats
```

### `omp tools`

```bash
# 列出可用工具
omp tools [options]

# 选项:
#   --builtin              只显示内置工具
#   --custom               只显示自定义工具
#   --mcp                  只显示 MCP 工具
```

---

## 6. 开发命令

### `omp dev`

```bash
# 启动开发模式
omp dev [options]

# 选项:
#   --port <n>             端口 (默认: 3000)
#   --open                 自动打开浏览器
```

---

## 7. 全局选项

| 选项 | 说明 |
|------|------|
| `--help`, `-h` | 显示帮助 |
| `--version`, `-v` | 显示版本 |
| `--debug` | 调试模式 |
| `--quiet`, `-q` | 静默模式 |
| `--trace` | 详细跟踪 |
| `--no-color` | 禁用颜色 |