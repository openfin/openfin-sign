# openfin-sign

## Overview

The intention of this repo is to sign OpenFin files and [asars](https://github.com/electron/asar).

### Assumptions

The code expects a private key located at `./signature/privkey.pem`.

### Features

- Generates a `RSA-SHA256` signature from the input file 
- Stores the signature in a `.ofds` file

## License

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

## Support

Please enter an issue in the repo for any questions or problems. Alternatively, please contact us at support@openfin.co.