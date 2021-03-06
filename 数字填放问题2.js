
    const arr = new Array(3)
    for(let i = 0; i< arr.length; i++) {
      arr[i] = new Array(3).fill(-1)
    }
    const hasArr = new Array(11).fill(false)
    let time = 0
    const isPrime = (num1, num2) => {
      let n = num1 + num2
      for (let i = 2; i * i <= n; i++) {
        if (n % i == 0) {
          return false
        }
      }
      return true
    }

    const find = (i,j,index) => {
        if(i > 0 && !isPrime(arr[i-1][j], index))  return false
        if(j > 0 && !isPrime(arr[i][j-1], index))  return false
        return true
    }

    const dfs = (i,j) => {
      if(i == 3) {
        let str = ''
        for(const item of arr) {
          for(const value of item) {
            str += value + ' '
          }
        }
        console.log(str)
        return 
      }
      for(let index = 1; index < 11; index++) {
        if(!hasArr[index] && find(i,j,index)) {
          arr[i][j] = index
          hasArr[index] = true
          if(j == 2) {
            dfs(i+1,0)
          } else {
            dfs(i,j+1)
          }
          arr[i][j] = 0
          hasArr[index] = false
        }
      }
    }

    dfs(0,0)
    console.log(time)
