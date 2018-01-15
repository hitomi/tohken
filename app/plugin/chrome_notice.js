define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'notice/addNotice') {
        if (chrome.devtools) {
          chrome.runtime.sendMessage({
            type: 'notify',
            message: mutation.payload
          })
        }
      }
    })
  }
})
