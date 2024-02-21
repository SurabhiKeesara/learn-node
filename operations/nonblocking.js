const fs = require("fs");

function moreWork() {
    console.log('more work');
}

// as an async (not sync function), more work executes
fs.readFile("data/test.txt", (err, data) => {
  if (err) console.log(err.message);
  else console.log(data);
});
moreWork();
