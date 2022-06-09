const fs = require('fs');
const path = require('path');

module.exports = class FileSystem {
  static read(pathName) {
    const filePath = path.join(__dirname, pathName);
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static write() {}
};
