const fs = require('fs')
const { refactor } = require('.')

console.log("launched jsmr with arguments:")
process.argv.forEach(function (val, index, array) {
    console.log(' ' + index + ': ' + val)
})

var processableArguments = process.argv.slice(2) // TODO: is this even safe??
if (!processableArguments[0]) {
    console.log('no input .js file was specified, aborting...')
    // return
}

if (!processableArguments[1]) {
    console.log('no input .mapping file was specified, aborting')
    // return
}

console.log('retrieving source file code...')
const $source = fs.readFileSync(processableArguments[0], 'utf-8') // todo: custom encoding?

console.log('running source file code through refactor...')
const $script = refactor($source)