// const transformStream = Transform()

////////
const {
    split, map
} = require('event-stream')
const [, , ...cliArgs] = process.argv
const {
    Transform
} = require('stream')
var count = 0
const ts = Transform({
    transform: function(buff, enc, cb) {

        if (buff.toString().startsWith(cliArgs[0]) && (count < 12)) {

            cb(null, buff.toString())
            count++
        }

        // cb(null, buff)
        // cb(null, buff.toString().valueOf())

        //     // cb(null, `${cliArgs[1]}`, buff.toString().toUpperCase())
    }

})


module.exports = ts
