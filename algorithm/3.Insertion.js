/**插入排序 */
const testArr = [3, 44, 36, 28, 15, 10, 16, 2, 65, 7];
console.log(insertionSort1(testArr));

/**传统排序 */
function insertionSort(arr) {
  let key, j;
  for (let i = 1; i < arr.length; i++) {
    //从待选数组中每次抽一个
    key = arr[i];
    j = i - 1;
    // 如何插到已经排序好的数组 前部分中
    while (j >= 0 && arr[j] > key) {
      //比他大的后移一位
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

/**优化， 二分法查到需要插入的位置 */
function insertionSort1(arr) {
  let key;
  for (let i = 1; i < arr.length; i++) {
    //从待选数组中每次抽一个
    key = arr[i];
    left = 0;
    right = i - 1;
    // 如何插到已经排序好的数组 前部分中
    while (left <= right) {
      let mid = parseInt((left + right) / 2);
      if (key < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    //在右边的后移一位
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }

    arr[left] = key;
  }
  return arr;
}
