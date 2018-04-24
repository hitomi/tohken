
// Init Panel
chrome.devtools.inspectedWindow.eval('window.location.href', {}, function (result, exceptionInfo) {
  // Init
  if (result.indexOf('tohken') > -1) {
    // Create Panel
    chrome.devtools.panels.create(
      '婶婶忙',
      null, // No icon path
      'app/panel/index.html',
      function (panel) {
        // Welcome
        chrome.runtime.sendMessage({
          type: 'notify',
          message: {
            title: '欢迎使用婶婶忙~',
            message: '请在新出现的面板中进入【婶婶忙】选项卡',
            context: '构建版本：v1.1.6'
          }
        })
      }
    )
  }
})
