'use strict';

// let fs = require('fs');

class FileUtils {

    readFile(fileInputName) {
        // return fs.readFileSync(fileInputName).toString();
        return fileInputName;
    }

    writeFile(json, fileOutputName) {
      console.log({ json });
      return json;
        // fs.writeFile(fileOutputName, json, function (err) {
        //     if (err) {
        //         throw err;
        //     } else {
        //         console.log('File saved: ' + fileOutputName);
        //     }
        // });
    }
}
module.exports = new FileUtils();
