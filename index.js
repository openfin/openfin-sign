const crypto = require('crypto');
const fs = require('fs');

module.exports = function (filepath) {
  const privateKey = 'something';
  const sign = crypto.createSign('RSA-SHA256');

  try {
    var fileContents = fs.readFileSync(filepath);
  } catch(err) {
    console.log('error reading input file');
    return;
  }

  /* generate the signature */
  sign.update(fileContents);

  /* return the signed signature */
  const signature = sign.sign(privateKey, 'binary');
  const signatureFile = filepath + '.ofds';

  const fd = fs.openSync(signatureFile, 'w');
  fs.writeSync(fd, 'OFES\0\0\0\0', '', 'binary');
  fs.writeSync(fd, signature, '', 'binary');
  fs.closeSync(fd);
};