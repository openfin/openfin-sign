/*
Copyright 2018 OpenFin Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
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