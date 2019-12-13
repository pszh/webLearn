console.log("12", "3311");

import("./utils/test.js").then(data => {
  console.log(data.default);
});
