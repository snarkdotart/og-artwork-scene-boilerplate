const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'src', 'traits.js');
const outputPath = path.join(__dirname, 'output', 'traits.js');

fs.access(sourcePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`File ${sourcePath} does not exist.`);
    process.exit(1);
  } else {
    fs.copyFile(sourcePath, outputPath, (err) => {
      if (err) throw err;
      console.log(`${sourcePath} was copied to ${outputPath}`);
    });
  }
});
