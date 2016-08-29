#!/usr/bin/env node

const {
    Readable, Writable, Transform
} = require('stream')

const {
    createReadStream
} = require('fs')
const path = require('path')
const {
    split, map
} = require('event-stream')

const [, , ...cliArgs] = process.argv

if (cliArgs[0]) {


    const readStream = createReadStream('/usr/share/dict/words/')

    ///***requires the limit-ten module***\\\
    const transformer = require('./limit-ten')


    readStream
    ///***removes new lines and returns a solid chunk***\\\
    .pipe(split())
    ///***tests whether or not data matches command line input***\\\
    .pipe(map((word, cb) => {
        if (word.toString().toLowerCase().startsWith(cliArgs[0].toLowerCase())) {
            cb(null, word + '\n')
        }
        ///***callback***\\\
        cb()
    }))
    ///***pipes data to the transformer***\\\
    .pipe(transformer)
    ///***prints it to the standard out***\\\
    .pipe(process.stdout)
}
else {
    process.stdout.write(`Usage: ${(path.basename(__filename))} [enter a search term]\n`)
}
