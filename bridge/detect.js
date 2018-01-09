// Send Welcome Message
chrome.runtime.sendMessage({
  type: 'notify',
  message: {
    title: '欢迎使用婶婶忙~',
    message: '请在游戏运行之前通过在页面空白处右键审查元素（Inspect），或按下F12键打开开发者工具',
    context: '构建版本：v1.1.0'
  }
})
