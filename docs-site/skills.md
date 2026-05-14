# Skills

> Oh My Pi Skills 系统

## 1. 概述

Skills 是可复用的任务模板，通过 `/skill-name` 触发。

## 2. 内置 Skills

| Skill | 说明 |
|-------|------|
| `/explain` | 解释代码 |
| `/review` | 代码审查 |
| `/refactor` | 重构建议 |
| `/test` | 生成测试 |
| `/doc` | 生成文档 |
| `/commit` | AI 提交 |

## 3. 自定义 Skill

```bash
# 创建 Skill
mkdir -p .omp/skills/my-skill
cat > .omp/skills/my-skill/SKILL.md << 'EOF'
---
name: my-skill
description: My custom skill
trigger: /my-skill
---

# My Skill

Describe your skill here...
EOF
```

## 4. 使用

```bash
# 触发
omp /my-skill --option value

# 列出
omp skills list
```