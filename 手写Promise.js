
class MyPromise {
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  static PENDDING = 'pending'
  constructor(fn) {
    this.status = MyPromise.PENDDING
    this.result = null
    this.FULFILLEDCALLBACKS = []
    this.REJECTEDCALLBACKS = []
    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(value) {
    setTimeout(() => {
      if (this.status === MyPromise.PENDDING) {
        this.status = MyPromise.FULFILLED
        this.result = value
        this.FULFILLEDCALLBACKS.forEach((item) => {
          item(value)
        })
      }
    })
  }

  reject(value) {
    setTimeout(() => {
      if (this.status == MyPromise.PENDDING) {
        this.status = MyPromise.REJECTED
        this.result = value
        this.REJECTEDCALLBACKS.forEach((item) => {
          item(value)
        })
      }
    })
  }

  then(onFULFILLED, onREJECTED) {
    return new MyPromise((resolve, reject) => {
      onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => { }
      onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => { }

      if (this.status === MyPromise.PENDDING) {
        this.FULFILLEDCALLBACKS.push(() => {
          try {
            const res = onFULFILLED(this.result)
            if (res instanceof MyPromise) {
              res.then((v) => {
                resolve(v)
              }, (r) => {
                reject(r)
              })
            } else {
              resolve(res)
            }
          } catch (error) {
            reject(error)
          }
        })
        this.REJECTEDCALLBACKS.push(() => {
          try {
            const res = onREJECTED(this.result)
            if (res instanceof MyPromise) {
              res.then((v) => {
                resolve(v)
              }, (r) => {
                reject(r)
              })
            } else {
              resolve(res)
            }
          } catch (error) {
            reject(error)
          }
        })
      }
    })
  }
}
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
    console.log(2)
  })
})
const res = p.then((value) => {
  console.log(value)
  throw '123'
}, (res) => {
  console.log(res)
})
console.log(res)
const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(4)
    console.log(5)
  })
})
console.log(p2.then((value) => {
  console.log(value)
  throw '123'
}, (res) => {
  console.log(res)
}))
