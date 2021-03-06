const arr = new Array(3)
for (let i = 0; i < arr.length; i++) {
  arr[i] = new Array(3).fill(-1)
}
const num = new Array(10)
let i = 0
let j = 1
while (i < num.length) {
  num[i] = j
  i++
  j++
}
const obj = {}

const isPrime = (num1, num2) => {
  let n = num[num1] + num[num2]
  for (let i = 2; i * i <= n; i++) {
    if (n % i == 0) {
      return false
    }
  }
  return true
}

const find = (i, j, start) => {
  for (let index = start; index < num.length; index++) {
    if (obj[index]) {
      continue
    }
    if (i > 0 && !isPrime(arr[i - 1][j], index)) continue
    if (j > 0 && !isPrime(arr[i][j - 1], index)) continue
    arr[i][j] = index
    obj[index] = true
    return true
  }
  return false
}

i = 0
j = 0
obj[0] = true
arr[i][j] = 0
j++
let count = 0
while (i <= 3 && j < 3 && i >= 0) {
  if (i == 3) {
    let str = ''
    for (const a of arr) {
      for (const b of a) {
        str += num[b] + ' '
      }
    }
    console.log(str)
    i = 2
    j = 2
    count++
  }
  obj[arr[i][j]] = false
  if (find(i, j, arr[i][j] + 1)) {
    if (j == 2) {
      i++
      j = 0
    } else {
      j++
    }
  } else {
    arr[i][j] = -1
    if (j == 0) {
      j = 2
      i--
    } else {
      j--
    }
  }
}
console.log(count)
