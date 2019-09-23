const { test,less,exch } = require('./sortutil')
var aux = [] //辅助数组

function merge(a, lo, mid, hi) {
  // 把数组切分为 lo ~ mid 、 mid+1 ~ hi 两个子数组
  let i = lo, j = mid + 1;

  for (let k = lo; k <= hi; k++) {
    aux[k] = a[k] //aux 是辅助数组
  }

  // 这个地方是重点
  for (let k = lo; k <= hi; k++) {
    if (i > mid) a[k] = aux[j++] // 这个说明 lo ~ mid 已经没有元素了,把 mid + 1 ~ hi 的元素按照顺序放入 a 数组的余下位置
    else if (j > hi) a[k] = aux[i++] // 这个说明 mid+1 ~ hi 已经没有元素了,把 lo ~ mid 的元素按照顺序放入 a 数组的余下位置
    else if (less(aux[j], aux[i])) a[k] = aux[j++]; // 如果当前数组 mid+1 ~ hi 的元素大于 lo ~ mid,把小的那个元素给a[k]
    else a[k] = aux[i++] // 如果当前数组 mid+1 ~ hi 的元素小于 lo ~mid,把小的那个元素给a[k]
  }

}


function MergeSort(func) {
  return function(a){
    aux = [...a] // 辅助函数初始化
    let lo = 0;hi = a.length;
    func(a,lo,hi)
  }
}

function topToBottomSort(a, lo, hi) {
  // 归并结束条件 如果hi == lo 说明数组成员只有一个
  if (hi <= lo) return;
  let mid = lo + parseInt((hi - lo) / 2); //获取中间
  topToBottomSort(a, lo, mid); // 排序左半边
  topToBottomSort(a, mid + 1, hi); // 排序右半边
  merge(a, lo, mid, hi)
}

test("自顶向下归并", MergeSort(topToBottomSort))

function bottomTopTosort(a){
  let N = a.length;
  // 子数组大小 1 2 4 8 16
  for(let sz = 1; sz < N;sz = sz+sz){
    // sz 就是当前小数组的长度
    // 把数组切分成小数组 0 2 4 8 ...
    for(let lo = 0;lo < N - sz;lo += sz+sz){
      // Math.min(sz + lo+sz-1,N-1) 如果后面的数组不够 sz 最高位就取 N - 1
      merge(a,lo,lo+sz-1,Math.min(sz + lo+sz-1,N-1));
    }
  }
}
test("自底向上归并", MergeSort(bottomTopTosort))

