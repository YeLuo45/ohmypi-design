---
layout: home

hero:
  name: "Oh My Pi Design"
  text: "AI Coding Agent for Terminal"
  tagline: "基于 pi-mono 的 AI 编程助手 — TypeScript + Rust + Bun"
  image:
    src: /banner.png
    alt: Oh My Pi
  features:
    - icon: 🔧
      title: + Commit Tool
      details: AI 驱动的 Git 提交，自动分析变更生成规范提交信息
    - icon: 💾
      title: 会话管理
      details: 支持导出/分享/分支/恢复，内置上下文压缩
    - icon: 🎨
      title: TUI 渲染
      details: 差异化渲染的高性能终端 UI 库
    - icon: 🔌
      title: MCP 集成
      details: 内置 MCP Server 工具创作支持
    - icon: ⚡
      title: Natives 架构
      details: Rust 原生绑定实现高性能文本/图像处理
    - icon: 🛠️
      title: 自定义工具
      details: 灵活的自定义工具、Hook 和 Skills 系统

features:
  - icon: 🔧
    title: 多模型支持
    details: 支持多种 LLM 提供商和模型，内置模型发现和回退机制
  - icon: 📦
    title: Monorepo 架构
    details: 7 个核心包，清晰的模块边界和依赖关系
  - icon: 🚀
    title: Bun 运行时
    details: 基于 Bun 的高性能 JavaScript 运行时
---

<div class="hero-footer">
  <p>基于 <a href="https://github.com/badlogic/pi-mono">pi-mono</a> by @mariozechner</p>
  <p class="tech-stack">
    <span class="badge">TypeScript</span>
    <span class="badge">Rust</span>
    <span class="badge">Bun</span>
    <span class="badge">Node.js</span>
  </p>
</div>

<style>
.hero-footer {
  text-align: center;
  margin-top: 2rem;
  color: #7fc9b8;
}

.hero-footer a {
  color: #00b894;
}

.tech-stack {
  margin-top: 0.5rem;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  margin: 0.25rem;
  background: rgba(0, 184, 148, 0.15);
  border: 1px solid rgba(0, 184, 148, 0.3);
  border-radius: 1rem;
  font-size: 0.85rem;
}
</style>