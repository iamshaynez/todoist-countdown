# Todoist Important Days / Todoist 重要日子

[English](#english) | [中文](#中文)

---

## English

### 📅 Overview

**Todoist Important Days** is a beautiful and intuitive countdown/countup timer application that integrates seamlessly with Todoist. Transform your task management experience by visualizing important dates, deadlines, and milestones with elegant countdown and countup timers.

> **Important Days are not just a due date** - they're moments that matter.

### ✨ Features

#### 🎯 Dual Timer Modes
- **CountDown Timer**: Track time remaining until important deadlines
- **CountUp Timer**: Monitor time elapsed since significant events

#### 🎨 Smart Display Modes
- **Days Mode**: Show total days (e.g., "15 Days" or "1 Day")
- **Months + Days Mode**: Display in months and days format (e.g., "2 m 15 d")
- **Weeks Mode**: Present in weeks format (e.g., "3 w")
- **Click to Switch**: Tap the date number to cycle through display modes

#### 🌍 Internationalization
- **Bilingual Support**: English and Chinese languages
- **Smart Pluralization**: Automatic singular/plural forms ("1 Day" vs "2 Days")
- **Localized Formats**: Culturally appropriate date and time representations

#### 🎭 Beautiful UI/UX
- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Interactive Cards**: Hover effects and smooth animations
- **Usage Guide**: Built-in help modal with detailed instructions

### 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand
- **Routing**: React Router DOM 7
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript ESLint

### 🚀 Quick Start

#### Prerequisites
- Node.js 18+ 
- npm, pnpm, or yarn
- Todoist account with API access

#### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/todoist-countdown.git
cd todoist-countdown

# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Start development server
npm run dev
# or
pnpm dev
# or
yarn dev
```

#### Configuration

1. **Get Todoist API Key**:
   - Go to [Todoist Settings > Integrations](https://todoist.com/prefs/integrations)
   - Generate a new API token
   - Copy the token

2. **Configure the Application**:
   - Open the application in your browser
   - Click the "Settings" button in the top-right corner
   - Paste your API key in the "API Key" field
   - Click "Save"

### 📖 Usage Guide

#### CountDown Timer
1. In Todoist, add the `@CountDown` tag to any task
2. Set a due date for the task
3. The application will automatically display a countdown timer
4. Perfect for: deadlines, exams, project deliveries, events

**Example**:
```
Submit final report @CountDown
Due: 2024-12-31
```

#### CountUp Timer
1. In Todoist, add the `@CountUp` tag to any task
2. Enter the start date in the first 10 characters of the task description
3. Use the format: `YYYY-MM-DD`
4. The application will calculate days elapsed from that date
5. Perfect for: anniversaries, habit tracking, project milestones

**Example**:
```
Daily exercise habit @CountUp
Description: 2024-01-01 Started my fitness journey...
```

### 🎮 Interactive Features

- **Display Mode Switching**: Click on the date number to cycle through different display formats
- **Real-time Updates**: Automatic refresh of countdown/countup values
- **Responsive Design**: Optimized viewing experience across all devices
- **Error Handling**: Graceful error messages and recovery options

### 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run check        # Type check without emitting
```

### 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 中文

### 📅 项目概述

**Todoist 重要日子** 是一个美观直观的倒计时/正计时应用程序，与 Todoist 无缝集成。通过优雅的倒计时和正计时器可视化重要日期、截止日期和里程碑，提升您的任务管理体验。

> **重要的日子不仅仅是截止日期** - 它们是重要的时刻。

### ✨ 功能特性

#### 🎯 双重计时模式
- **倒计时器**：跟踪距离重要截止日期的剩余时间
- **正计时器**：监控自重要事件以来经过的时间

#### 🎨 智能显示模式
- **天数模式**：显示总天数（如 "15 天" 或 "1 天"）
- **月+天模式**：以月和天的格式显示（如 "2 月 15 天"）
- **周数模式**：以周的格式显示（如 "3 周"）
- **点击切换**：点击日期数字可循环切换显示模式

#### 🌍 国际化支持
- **双语支持**：支持中文和英文
- **智能复数形式**：自动处理单复数形式（"1 Day" vs "2 Days"）
- **本地化格式**：符合文化习惯的日期和时间表示

#### 🎭 精美的用户界面
- **现代设计**：简洁专业的界面，配有渐变背景
- **响应式布局**：针对桌面和移动设备优化
- **交互式卡片**：悬停效果和流畅动画
- **使用指南**：内置帮助模态框，提供详细说明

### 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite 6
- **样式框架**：Tailwind CSS 3
- **状态管理**：Zustand
- **路由管理**：React Router DOM 7
- **图标库**：Lucide React
- **开发工具**：ESLint, TypeScript ESLint

### 🚀 快速开始

#### 环境要求
- Node.js 18+
- npm、pnpm 或 yarn
- 具有 API 访问权限的 Todoist 账户

#### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/yourusername/todoist-countdown.git
cd todoist-countdown

# 安装依赖
npm install
# 或
pnpm install
# 或
yarn install

# 启动开发服务器
npm run dev
# 或
pnpm dev
# 或
yarn dev
```

#### 配置说明

1. **获取 Todoist API 密钥**：
   - 访问 [Todoist 设置 > 集成](https://todoist.com/prefs/integrations)
   - 生成新的 API 令牌
   - 复制令牌

2. **配置应用程序**：
   - 在浏览器中打开应用程序
   - 点击右上角的"设置"按钮
   - 在"API 密钥"字段中粘贴您的 API 密钥
   - 点击"保存"

### 📖 使用指南

#### 倒计时器
1. 在 Todoist 中，为任何任务添加 `@CountDown` 标签
2. 为任务设置截止日期
3. 应用程序将自动显示倒计时器
4. 适用于：截止日期、考试、项目交付、活动等

**示例**：
```
提交最终报告 @CountDown
截止日期：2024-12-31
```

#### 正计时器
1. 在 Todoist 中，为任何任务添加 `@CountUp` 标签
2. 在任务描述的前 10 个字符中输入开始日期
3. 使用格式：`YYYY-MM-DD`
4. 应用程序将计算从该日期到今天经过的天数
5. 适用于：纪念日、习惯跟踪、项目里程碑等

**示例**：
```
每日运动习惯 @CountUp
描述：2024-01-01 开始我的健身之旅...
```

### 🎮 交互功能

- **显示模式切换**：点击日期数字可循环切换不同的显示格式
- **实时更新**：倒计时/正计时值自动刷新
- **响应式设计**：在所有设备上优化的查看体验
- **错误处理**：优雅的错误消息和恢复选项

### 🔧 可用脚本

```bash
# 开发
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览生产构建
npm run lint         # 运行 ESLint
npm run check        # 类型检查（不输出文件）
```

### 📝 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

### 🤝 贡献

欢迎贡献！请随时提交 Pull Request。对于重大更改，请先开启 issue 讨论您想要更改的内容。

1. Fork 仓库
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📸 Screenshots / 截图

<!-- Add screenshots here -->
*Screenshots will be added soon / 截图即将添加*

## 🔗 Links / 链接

- [Todoist API Documentation](https://developer.todoist.com/rest/v2/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

**Made with ❤️ for productivity enthusiasts / 为生产力爱好者用心制作**
