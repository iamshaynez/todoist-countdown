import { Translations } from '../../types/i18n';

export const zh: Translations = {
  // Common
  appTitle: 'Todoist 重要日',
  appSubtitle: '重要的日子不只是一个截止日',
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
  overdue: '已过期',
  on: '于',
  targetDate: '目标日期',
  targetDatePrefix: '距离 ',
  targetDateSuffix: ' 还有',
  expired: '已过期',
  
  // CountUp card
  countupPrefix: '距离 ',
  countupSuffix: ' 已经',
  
  // Display units
  days: '天',
  day: '天',
  d: '天',
  months: '月',
  weeks: '周',
  years: '年',
  y: '年',
  
  // Error messages
  apiKeyRequired: '需要 API 密钥',
  fetchError: '获取任务失败',
  saveSuccess: '设置保存成功',
  
  // Tip modal
  tipButton: '使用说明',
  tipTitle: '使用说明',
  tipCountdownTitle: 'CountDown 倒计时',
  tipCountdownDescription: '在 Todoist 任务中添加 @CountDown 标签，系统会自动识别任务的截止日期并显示倒计时。适用于重要截止日期、考试时间、项目交付等场景。',
  tipCountupTitle: 'CountUp 正计时',
  tipCountupDescription: '在 Todoist 任务中添加 @CountUp 标签，并在任务描述的前10个字符中输入起始日期（如：2024-01-01），系统会计算从该日期到今天已经过去的天数。适用于纪念日、习惯追踪、项目进度等场景。',
  tipDateFormat: '日期格式要求：YYYY-MM-DD（如：2024-01-01）',
  tipClose: '关闭'
}