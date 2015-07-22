// inject ot background page
+function(){
  chrome.runtime.onMessage.addListener(function(obj) {
    if(!obj.type) return;
    switch (obj.type) {
      case 'notify':
        chrome.notifications.create(obj.nid, obj.options, obj.callback);
        break;
      default:

    }
  });
}();
