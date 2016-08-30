// const {
//     split, map
// } = require('event-stream')


const [, , ...cliArgs] = process.argv



const {
    Transform
} = require('stream')



var count = 0



const ts = Transform({
    transform: function(buff, enc, cb) {

        if ((count < 10)) {

            cb(null, buff.toString())
            count++
        }

    }

})


module.exports = ts
/////////////////
