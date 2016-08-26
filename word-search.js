#!/usr/bin/env node

let i = ''
const {
    Readable, Writable, Transform
} = require('stream')

const {
    createReadStream
} = require('fs')

const {
    split, map
} = require('event-stream')

const [, , ...cliArgs] = process.argv
const readStream = createReadStream('/usr/share/dict/words/') //, {
    // highWaterMark: 1
    // })
    ///////////

///////////
// readStream.on('data', buffer => {
//     readStream.pause()
//     // process.stdout.write(buffer.toString())
// })
//
const transformer = require('./limit-ten')
    ////
    // const timer = setInterval(() => readStream.resume(), 50)
    // readStream.on('end', () => {

//     // console.log('end')
//     clearInterval(timer) //without this line the program will continue to run
// })


readStream
    .pipe(split())
    .pipe(map((word, cb) => {
        if (word.toString().toLowerCase().startsWith(cliArgs[0].toLowerCase())) {
            cb(null, word + '\n')
        }
        cb()
    }))
    .pipe(transformer)
    .pipe(process.stdout)
