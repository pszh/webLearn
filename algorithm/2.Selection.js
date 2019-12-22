/**选择排序 */
const testArr = [3, 44, 36, 28, 15, 10, 16, 2, 65, 7];
console.log(selectionSort(testArr));

function selectionSort(arr) {
  let maxIndex = 0,
    temp;
  for (let i = 0; i < arr.length; i++) {
    maxIndex = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[maxIndex] < arr[j]) {
        maxIndex = j;
      }
    }
    if (maxIndex !== i) {
      temp = arr[i];
      arr[i] = arr[maxIndex];
      arr[maxIndex] = temp;
    }
  }
  return arr;
}
