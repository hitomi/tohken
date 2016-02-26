// inject ot background page
;+function(){
  var active = false;
  chrome.runtime.onMessage.addListener(function(obj) {
    if(!obj.type) return;
    switch (obj.type) {
      case 'notify':
        chrome.notifications.create(obj.nid, obj.options, obj.callback);
        break;
      case 'welcome':
        if (typeof tab === "undefined") break;
        chrome.tabs.get(obj.tabId, function (tab) {
          if (tab && tab.url.indexOf("http://www.dmm.com/netgame/social/-/gadgets/=/app_id=825012/") > -1) {
            chrome.notifications.create('welcome' + Date.now(), {
              type: "basic",
              title: "审神忙装载成功",
              message: "请在面板中找到并进入TRH-X选项卡",
              iconUrl: "assets/icon.png"
            }, function (cb) { active = true; });
          }
        });
        break;
      case 'active':
        chrome.runtime.sendMessage({type: "active", value: active});
        break;
      default:
    }
  });
}();
