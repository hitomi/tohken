define((require, exports, module) => {
    return () => {
      return {
        // filling: false,
        bill: null,
        // bonemeal: null,
        charcoal: null,
        steel: null,
        coolant: null,
        file: null,
        max_resource: null,
        status: null,
        recovered_at: null,
        money: null,
        get test () {
          return this.recovered_at
        }
        // money: null,
        // vcharcoal: null,
        // vsteel: null,
        // vcoolant: null,
        // vfile: null,
      }
    }
  })
  