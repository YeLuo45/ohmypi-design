# Natives Architecture

> Oh My Pi Rust 原生模块架构

## 1. 概述

Natives 包 (`packages/natives`) 封装了 Rust 实现的高性能原生操作：

| 操作 | Rust Crate | 说明 |
|------|------------|------|
| `textWidth` | `pi-natives` | 计算字符串显示宽度 |
| `wrapText` | `pi-natives` | 文本自动包裹 |
| `grep` | `pi-natives` | 高性能正则搜索 |
| `glob` | `pi-natives` | 文件模式匹配 |
| `highlight` | `pi-natives` | 语法高亮 |

## 2. Rust Crate 结构

```
crates/
└── pi-natives/
    ├── Cargo.toml
    ├── src/
    │   ├── lib.rs
    │   ├── text.rs      # 文本宽度、包裹
    │   ├── grep.rs      # 正则搜索
    │   ├── glob.rs      # 文件匹配
    │   └── highlight.rs  # 语法高亮
    └── benches/         # 性能基准测试
```

## 3. API 设计

### 3.1 TypeScript 绑定

```typescript
// packages/natives/index.ts
import { loadNative } from "./loader";

const natives = loadNative(); // 动态加载 Rust 编译产物

export function textWidth(text: string, options?: TextWidthOptions): number {
  return natives.text_width(text, options ?? {});
}

export function wrapText(
  text: string,
  options: WrapOptions
): string[] {
  return natives.wrap_text(text, options);
}

export function grep(options: GrepOptions): Match[] {
  return natives.grep(options);
}
```

### 3.2 参数类型

```typescript
interface TextWidthOptions {
  // 是否计算 ANSI 转义码
  // 默认: true (考虑颜色)
  ambiguousIsWide?: boolean;

  // 表情符号宽度
  // 默认: 2 (宽字符)
  emojiWidth?: 1 | 2;
}

interface WrapOptions {
  // 最大行宽
  width: number;

  // 单词边界包裹
  wordWrap?: boolean;

  // 保留连续空白
  preserveExisting?: boolean;
}

interface GrepOptions {
  // 正则表达式
  pattern: string;

  // 搜索文件
  files: string[];

  // 显示上下文行数
  context?: number;

  // 是否区分大小写
  caseSensitive?: boolean;

  // 多行模式
  multiline?: boolean;
}
```

## 4. 性能对比

| 操作 | Node.js | Rust Natives | 提升 |
|------|---------|--------------|------|
| `textWidth` | ~50μs | ~2μs | 25x |
| `wrapText` | ~200μs | ~15μs | 13x |
| `grep` | ~500ms | ~50ms | 10x |

## 5. 构建流程

```bash
# 构建 Rust 产物
cargo build --release -p pi-natives

# 输出位置
# target/release/libpi_natives.{so/dylib/dll}
```

### 5.1 加载机制

```typescript
// packages/natives/loader.ts
export function loadNative() {
  const platform = process.platform;
  const arch = process.arch;
  const ext = platform === "win32" ? ".dll" :
               platform === "darwin" ? ".dylib" : ".so";

  const path = resolve(__dirname, `../native/${platform}-${arch}/pi_natives${ext}`);

  return require(path);
}
```

## 6. 移植到 Natives

详见 [Porting to Natives](https://github.com/can1357/oh-my-pi/blob/main/docs/porting-to-natives.md)。

### 6.1 移植检查清单

- [ ] 函数为纯函数，无副作用
- [ ] 无需 DOM/BOM API
- [ ] 处理大量数据 (>1000 items)
- [ ] 性能瓶颈已确认

### 6.2 移植示例

```rust
// crates/pi-natives/src/text.rs
use unicode_width::UnicodeWidthStr;

pub fn text_width(text: &str) -> usize {
    UnicodeWidthStr::width(text)
}

pub fn wrap_text(text: &str, width: usize) -> Vec<String> {
    // 实现...
}
```