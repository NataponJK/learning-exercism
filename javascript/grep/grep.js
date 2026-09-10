#!/usr/bin/env node

// The above line is a shebang. On Unix-like operating systems, or environments,
// this will allow the script to be run by node, and thus turn this JavaScript
// file into an executable. In other words, to execute this file, you may run
// the following from your terminal:
//
// ./grep.js args
//
// If you don't have a Unix-like operating system or environment, for example
// Windows without WSL, you can use the following inside a window terminal,
// such as cmd.exe:
//
// node grep.js args
//
// Read more about shebangs here: https://en.wikipedia.org/wiki/Shebang_(Unix)

// const fs = require('fs');
// const path = require('path');

// /**
//  * Reads the given file and returns lines.
//  *
//  * This function works regardless of POSIX (LF) or windows (CRLF) encoding.
//  *
//  * @param {string} file path to file
//  * @returns {string[]} the lines
//  */
// function readLines(file) {
//   const data = fs.readFileSync(path.resolve(file), { encoding: 'utf-8' });
//   return data.split(/\r?\n/);
// }

// const VALID_OPTIONS = [
//   'n', // add line numbers
//   'l', // print file names where pattern is found
//   'i', // ignore case
//   'v', // reverse files results
//   'x', // match entire line
// ];

// const ARGS = process.argv;

//
// This is only a SKELETON file for the 'Grep' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
// This file should *not* export a function. Use ARGS to determine what to grep
// and use console.log(output) to write to the standard output.

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const flags = args.filter(arg => arg.startsWith('-'));
const remainingArgs = args.filter(arg => !arg.startsWith('-'));

const pattern = remainingArgs[0];
const files = remainingArgs.slice(1);

const hasFlag = (flag) => flags.includes(flag);
const printLineNumbers = hasFlag('-n');
const printOnlyFilenames = hasFlag('-l');
const caseInsensitive = hasFlag('-i');
const invertMatch = hasFlag('-v');
const matchEntireLine = hasFlag('-x');

const hasMultipleFiles = files.length > 1;

files.forEach(file => {
  try {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split(/\r?\n/);

    let fileHasMatch = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (i === lines.length - 1 && line === '') continue;

      let isMatch = false;
      const regexFlags = caseInsensitive ? 'i' : '';
      const regexPattern = matchEntireLine ? `^${pattern}$` : pattern;
      const regex = new RegExp(regexPattern, regexFlags);

      const matchesRegex = regex.test(line);

      isMatch = invertMatch ? !matchesRegex : matchesRegex;

      if (isMatch) {
        fileHasMatch = true;

        if (printOnlyFilenames) {
          console.log(file);
          break;
        }
        let output = line;

        if (printLineNumbers) {
          output = `${i + 1}:${output}`;
        }
        if (hasMultipleFiles) {
          output = `${file}:${output}`;
        }

        console.log(output);
      }
    }
  } catch (error) {
    console.error(`Error processing file ${file}:`, error.message);
  }
})