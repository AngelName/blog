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
  func(realarr)
  if(isSort(realarr)){console.log(name + "数组有序 结果 : " + realarr)}else{
    console.log(realarr)
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

function selectionSort(arr){
  let N = arr.length
  for(let i = 0;i<N;i++){
    let min = i;
    for(let j = i+1;j<N;j++){
      if(less(arr[j],arr[min])){
        min = j
      }
    }
    exch(arr,i,min)
  }
}


test("选择排序",selectionSort)

function insertionSort(arr){
  let N = arr.length;
  for(let i = 0;i<N;i++){
    // 内循环移动并交换大于arr[i]的元素
    for(let j = i;j>0 && less(arr[j],arr[j-1]);j--){
      exch(arr,j,j-1)
    }

  }
}
test("插入排序",insertionSort)

function shellSort(arr){
  let h = 1;
  let N = arr.length;
  while(h<N/3)h=3*h+1; // 1 4 13 40 121 ...
  while(h >= 1){
    for(let i = h;i<N;i++){
      for(let j = i;j>=h && less(arr[j],arr[j-h]);j-=h){
        exch(arr,j,j-h)
      } 
    }
    h = parseInt(h/3);
  }
}
test("希尔排序",shellSort)

exports.insertionSort = insertionSort;