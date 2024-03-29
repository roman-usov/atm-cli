const fs = require('fs');
const path = require('path');

module.exports = class FileSystem {
  static read(pathName) {
    const filePath = path.join(__dirname, pathName);
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  static write(pathName, content) {
    const filePath = path.join(__dirname, pathName);
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content.toString(), (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }
};
