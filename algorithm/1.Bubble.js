/**冒泡算法**/

const testArr = [3, 44, 36, 28, 15, 10, 16, 2, 65, 7];
console.log(bubbleSort2(testArr));

/**原始算法 */
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      //相邻元素两两对比
      if (arr[j] > arr[j + 1]) {
        // 大的下沉
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

/**优化1 */
function bubbleSort1(arr) {
  let i = arr.length - 1;
  do {
    let pos = 0; // 期待下一趟不用排序，然后结束循环
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        pos = j;
      }
    }
    i = pos;
  } while (i > 0);

  return arr;
}

/**优化2,一次找到两个极端值 */
function bubbleSort2(arr) {
  let low = 0;
  let hight = arr.length - 1;
  let temp, j;
  do {
    for (j = low; j < hight; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    hight--;
    for (j = hight; j > low; j--) {
      if (arr[j] < arr[j - 1]) {
        temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      }
    }
    low++;
  } while (low < hight);
  return arr;
}
