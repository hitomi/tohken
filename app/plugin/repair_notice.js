define((require, exports, module) => {
  return (store) => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'repair/updateRepair') {
        let { repair } = mutation.payload
        console.log(repair)
      }
    })
  }
})
