
const arr = [1, 3, 5, 4, 2, 6, 8, 9,]
let res = 0
const mergeSort = (arr) => {
  let len = arr.length
  if (len < 2) {
    return arr
  }
  let mid = Math.floor(len / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

const merge = (left, right) => {
  let mergeArr = []
  while (left.length && right.length) {
    if (left[0] > right[0]) {
      for (let i = 0; i < left.length; i++) {
        res++
        console.log(left[i], right[0])
      }
      mergeArr.push(right.shift())
    } else {
      mergeArr.push(left.shift())
    }
  }
  while (left.length) {
    mergeArr.push(left.shift())
  }
  while (right.length) {
    mergeArr.push(right.shift())
  }
  return mergeArr
}
console.log(mergeSort(arr))
console.log(res)
