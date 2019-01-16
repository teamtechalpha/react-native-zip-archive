After Unarchiving, Move the entire folder to node_modules of your project

## Installation

```bash
mv react-native-zip-archive <project_path>/node_modules
```

## Linking

### Automatically (Recommend)

````bash
react-native link react-native-zip-archive
````


## Usage

import it into your code

```js
import { isPasswordProtected, unzipWithPassword } from 'react-native-zip-archive'
```

**isPasswordProtected(source: string) :Promise**

> resolves true/false if file is password protected or not

```js
const sourcePath = `${DocumentDirectoryPath}/myFile.zip`
const targetPath = DocumentDirectoryPath

isPasswordProtected(sourcePath)
.then((isProtected) => {
  console.log(`Is Protected ${isProtected}`)
})
.catch((error) => {
  console.log(error)
})
```

**unzipWithPassword(source: string, target: string, password: string): Promise**

> unzips from source to target

Example

```js
const sourcePath = `${DocumentDirectoryPath}/myFile.zip`
const targetPath = DocumentDirectoryPath
const password = "password"

unzipWithPassword(sourcePath, targetPath, password)
.then((path) => {
  console.log(`unzip completed at ${path}`)
})
.catch((error) => {
  console.log(error)
})
```
