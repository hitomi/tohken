$(document).ready ->
  $('#loadwindow').on 'click', ->
    popup = {
      url: chrome.extension.getURL( "./Popup/container.html" )
      left: 0
      top: 0
      width: 960
      height: 580 + 20
      focused: true
      type: "popup"
    }
    chrome.windows.create popup
