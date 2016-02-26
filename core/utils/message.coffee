define (require, exports, module)->
  
  send: (obj)->
    console.log obj
    chrome.runtime.sendMessage obj
  
  listen:
    chrome.runtime.onMessage.addListener (obj)->
      console.log obj
