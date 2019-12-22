/**希尔排序(缩小增量排序) */

const testArr = [3, 44, 36, 28, 15, 10, 16, 2, 65, 7];
console.log(shellSort(testArr));

function shellSort(arr) {
  for (
    let gap = Math.floor(arr.length / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    console.log(gap, arr);
    // 内层循环与插入排序的写法基本一致，只是每次移动的步长变为 gap
    for (let i = gap; i < arr.length; i += gap) {
      let key = arr[i];
      let j = i - gap;

      while (j >= 0 && arr[j] > key) {
        arr[j + gap] = arr[j];
        j -= gap;
      }
      arr[j + 1] = key;
    }
  }
  return arr;
}
