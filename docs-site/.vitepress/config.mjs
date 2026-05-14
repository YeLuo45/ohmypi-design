import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Oh My Pi Design",
  description: "Oh My Pi AI Coding Agent 设计文档 — 终端 AI 编程助手",

  head: [
    ["link", { rel: "icon", href: "/favicon.svg" }],
    ["meta", { name: "theme-color", content: "#00b894" }],
  ],

  base: "/ohmypi-design/",

  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "架构", link: "/architecture" },
      { text: "核心系统", link: "/core-systems" },
      { text: "CLI", link: "/cli-reference" },
      { text: "会话管理", link: "/session-management" },
      { text: "工具系统", link: "/tool-system" },
    ],

    sidebar: [
      {
        text: "概述",
        items: [
          { text: "首页", link: "/" },
          { text: "架构总览", link: "/architecture" },
        ],
      },
      {
        text: "核心系统",
        items: [
          { text: "核心系统", link: "/core-systems" },
          { text: "工具系统", link: "/tool-system" },
          { text: "会话管理", link: "/session-management" },
          { text: "TUI 渲染", link: "/tui-rendering" },
        ],
      },
      {
        text: "CLI 参考",
        items: [
          { text: "CLI 参考", link: "/cli-reference" },
          { text: "配置与使用", link: "/config-usage" },
        ],
      },
      {
        text: "扩展开发",
        items: [
          { text: "自定义工具", link: "/custom-tools" },
          { text: "MCP 集成", link: "/mcp-integration" },
          { text: "Skills", link: "/skills" },
        ],
      },
      {
        text: "开发指南",
        items: [
          { text: "Natives 架构", link: "/natives-architecture" },
          { text: "SDK 参考", link: "/sdk" },
          { text: "RPC 模式", link: "/rpc" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/can1357/oh-my-pi" },
    ],
  },

  markdown: {
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
  },
});