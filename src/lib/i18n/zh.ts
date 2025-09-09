import { Translations } from '../../types/i18n';

export const zh: Translations = {
  // Common
  appTitle: 'Todoist 倒计时',
  appSubtitle: '跟踪您的任务截止日期',
  loading: '加载中...',
  error: '错误',
  refresh: '刷新',
  refreshTasks: '刷新任务',
  save: '保存',
  cancel: '取消',
  settings: '设置',
  edit: '编辑',
  delete: '删除',
  
  // Welcome state
  welcomeTitle: '欢迎使用 Todoist 倒计时',
  welcomeDescription: '用精美的倒计时器跟踪您的任务截止日期',
  configureApiKey: '配置 API 密钥',
  
  // Empty state
  emptyTitle: '未找到任务',
  emptyDescription: '没有要显示的任务',
  noTasksTitle: '没有带截止日期的任务',
  noTasksDescription: '为您的 Todoist 任务添加截止日期以在此处查看',
  
  // Sidebar
  sidebarTitle: '设置',
  apiKeyLabel: 'API 密钥',
  apiKeyPlaceholder: '请输入您的 Todoist API 密钥',
  apiKeyDescription: '从 Todoist 设置 > 集成 中获取您的 API 密钥',
  languageLabel: '语言',
  
  // Countdown card
  daysLeft: '天剩余',
  dayLeft: '天剩余',
  daysRemaining: '天',
  countdownTitle: '距离',
  countdownSuffix: '还有',
  overdue: '已过期',
  on: '于',
  targetDate: '目标日期',
  expired: '已过期',
  
  // Error messages
  apiKeyRequired: '需要 API 密钥',
  fetchError: '获取任务失败',
  saveSuccess: '设置保存成功'
}