## 功能目标

一个纯前端项目，实现通过 api 读取 Todoist 中指定 tag 的任务，并根据每个任务的名称，Due Date，计算截止今天的倒数日期，展示为一个漂亮美观的重要日子的 Count Down Gallery。

## 功能

### 前端展示

- 美观的 Web 页面，主要内容是一个 Gallery 形式的卡片展示页面。
- 每个卡片分为三部分内容：
	- 上 Header：展示`[名称]`
	- 中 Count Down：大字体展示倒数还有多少天，根据 Due Date 到今天的天数动态计算
	- 下 小字灰色：展示 Due Date 的日期，显示 On yyyy-MM-dd 格式
- 左边提供可以可以隐藏和展开的 Sidebar，用来配置必要的信息：
	- 配置：todoist 的 api key
###  Todoist API 配置功能

- 用户需要在先配置 todoist 的 api key（从 cookie 读取），否则主页面显示 `[Please Set Your API Key First]`
- 配置后的 api key 存储在 cookie 中，有效期一年

### 动态数据

- 使用 api 调用 todoist 的接口，获取指定的 Tasks 数据
	- 文档在这里： https://developer.todoist.com/api/v1/#tag/Tasks/operation/get_tasks_by_filter_api_v1_tasks_filter_get
	- Filter Query 是 `@CountDown` 
	- 返回 schema 见文档
		- content 作为倒数日名称
		- due 作为日期并计算距离天数
- 每个 Task 生成一个卡片，展示
- 主页面提供刷新按钮，重新动态获取数据并渲染页面

## 技术栈

根据需求，选择最合适简单的技术栈。
