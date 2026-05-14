# TUI Rendering

> Oh My Pi 终端 UI 差异化渲染系统

## 1. 概述

TUI 包 (`packages/tui`) 提供高性能的终端渲染：

- **差异化渲染** — 只重绘变化区域
- **终端检测** — 自动适配终端能力
- **流式输出** — 支持实时更新

## 2. 终端能力

```typescript
import { detectTerminal, Capability } from "@oh-my-pi/tui";

const term = detectTerminal(process.env);

console.log(term.capabilities);
// {
//   ansiColors: true,      // 256 色
//   trueColor: true,       // 24 位色
//   hyperlinks: true,      // 超链接
//   unicode: true,         // Unicode
//   sixel: false,          // Sixel 图形
//   kitty: false,          // Kitty 协议
// }
```

## 3. 差异化渲染

```typescript
import { createTUI } from "@oh-my-pi/tui";

const tui = createTUI({ stream: process.stdout });

// 第一次渲染 - 全量
tui.render({
  type: "full",
  content: renderMainUI(),
});

// 后续渲染 - 差异
tui.render({
  type: "diff",
  region: { x: 0, y: 10, width: 80, height: 20 },
  content: newContent,
});

// 清除
tui.render({ type: "clear" });
```

## 4. ANSI 颜色

```typescript
// 使用内置颜色主题
tui.render({
  type: "full",
  theme: "github-dark",
  content: {
    header: [{ text: "Title", color: "#58a6ff" }],
    body: [{ text: "Content", color: "#c9d1d9" }],
    footer: [{ text: "Status", color: "#3fb950" }],
  },
});
```

## 5. 超链接

```typescript
tui.render({
  type: "line",
  content: [
    { text: "Learn more: " },
    {
      text: "Click here",
      hyperlink: "https://example.com",
    },
  ],
});
```