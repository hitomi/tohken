// Load Panels
chrome.devtools.panels.create(
    'TRH-X',
    null, // No icon path
    'app.html',
    function (panel) {
      chrome.runtime.sendMessage({
        type: "notify",
        nid: "TRH-X-Load-" + Date.now(),
        options: {
          type: "basic",
          title: "审神忙装载成功",
          message: "请在面板中找到并进入TRH-X选项卡",
          iconUrl: "resource/icon.png"
        },
        callback: function(cb){}
      });
    } // no callback needed
);
