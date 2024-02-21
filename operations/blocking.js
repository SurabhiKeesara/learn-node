const fs = require("fs");

function moreWork() {
    console.log('more work');
}

try {
    const data = fs.readFileSync("data/test.txt"); // blocks here until file is read
    console.log(data);
    moreWork();
}
catch(err) {
    console.log(err.message);
}

// returns a list of bytes/file output when run

