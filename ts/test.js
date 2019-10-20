var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function test(name1, name2, name3) {
    console.log(name1);
    console.log(name2);
    console.log(name3);
}
var name3 = 21;
var name2 = 21;
test(__makeTemplateObject(["hi,", ",bb", ""], ["hi,", ",bb", ""]), name2, name3);
