function test(name1, name2, name3) {
  console.log(name1);
  console.log(name2);
  console.log(name3);
}
let name3 = 21;
let name2 = 21;

test`hi,${name2},bb${name3}`;




