#!/usr/bin/env node

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

const readStream = createReadStream('/usr/share/dict/words/')


const transformer = require('./limit-ten')


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
