// a 是否小于 b
function less(a, b) { return a < b }

// 数组交换元素
function exch(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j]
  arr[j] = temp;
}

function isSort(arr){
  for(let i = 1;i<arr.length;i++){
    if(less(arr[i],arr[i-1]))return false;
  }
  return true
}
function test(name,func){
  let arr = [1,2,3,4,5,6,7,8,9,10]
  let realarr = shuffleArray(arr)
  console.log("原始数组: "+realarr)
  func(realarr)
  if(isSort(realarr)){console.log(name + "数组有序 结果 : " + realarr)}else{
    console.log("数组顺序不对"+realarr)
  }
}
function shuffleArray(arr) {
  var len = arr.length,
    i, temp;
  while (len) {
    i = Math.floor(Math.random() * len--);
    temp = arr[i];
    arr[i] = arr[len];
    arr[len] = temp;
  }
  return arr;
}
exports.test = test;
exports.isSort = isSort;
exports.less = less;
exports.exch = exch;