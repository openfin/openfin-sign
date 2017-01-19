const crypto = require('crypto');
const fs = require('fs');

try {
  var privateKey = fs.readFileSync('./signature/privkey.pem');
} catch(err) {
  privateKey = null;
}

module.exports = function (filepath) {
  if (!privateKey) {
    return;
  }

  const sign = crypto.createSign('RSA-SHA256');

  try {
    var fileContents = fs.readFileSync(filepath);
  } catch(err) {
    console.log('error reading input file: ' + filepath);
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