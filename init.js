// Load Panels
if (location.protocol != 'chrome-devtools:')
  chrome.devtools.panels.create(
      '婶婶忙',
      null, // No icon path
      'app.html',
      function (panel) { 
        chrome.runtime.sendMessage({type: 'welcome', tabId: chrome.devtools.inspectedWindow.tabId});
      } // no callback needed
  );
