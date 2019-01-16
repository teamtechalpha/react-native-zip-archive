/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { zip, unzip, unzipAssets, subscribe, isPasswordProtected } from 'react-native-zip-archive'
import { MainBundlePath, ExternalDirectoryPath, DocumentDirectoryPath, readDir, readFile, stat } from 'react-native-fs'

const sourcePath = `${DocumentDirectoryPath}/myFile.zip`
const targetPath = DocumentDirectoryPath

type Props = {};

export default class App extends Component {
  componentDidMount() {
    readDir(ExternalDirectoryPath)
    //readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    .then((result) => {
      console.log('GOT RESULT', result);

      // stat the first file
      return Promise.all([stat(result[0].path), result[0].path]);
    })
    .then((statResult) => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return readFile(statResult[1], 'utf8');
      }

      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      console.log(contents);
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
  }

  checkIfPassword(zipFilePath) {
    isPasswordProtected(zipFilePath)
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  passwordUnzip() {
    unzipWithPassword(zipFilePath, unzipPath, password)
    .then((path) => {
      console.log(`unzip completed at ${path}`)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  unZipFile() {
    unzipAssets(`${ExternalDirectoryPath}/static.zip`, ExternalDirectoryPath)
    .then((path) => {
      console.log(`unzip completed at ${path}`)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  createZip() {
    zip(ExternalDirectoryPath, `${ExternalDirectoryPath}/static.zip`)
    .then((path) => {
      console.log(`zip completed at ${path}`)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <TouchableOpacity style={styles.button} onPress={(DocumentDirectoryPath) => this.checkIfPassword(`${ExternalDirectoryPath}/static.zip`)}>
          <Text style={{color: 'white'}}>Check if Protected</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.unZipFile}>
          <Text style={{color: 'white'}}>Unzip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.createZip}>
          <Text style={{color: 'white'}}>Zip</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: 40,
    marginTop: 10
  }
});
