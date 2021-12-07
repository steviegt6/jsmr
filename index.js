const fs = require('fs')
const { refactor } = require('shift-refactor')

console.log("launched jsmr with arguments:")
process.argv.forEach(function (val, index, array) {
    console.log(' ' + index + ': ' + val)
})

// VariableDeclarator[binding.name="obfuscatedFunctionOne"][init.params.items.length=0]
// VariableDeclarator[binding.name="obfuscatedVariableOne"]
const fakeSrc = `
var obfuscatedVariableOne = "hello, world!"
var obfuscatedVariableTwo = "goodbye, world!"
var obfuscatedVariableThree = "nooo";

function obfuscatedFunctionOne() {
    console.log(obfuscatedVariableOne);
    console.log(obfuscatedVariableTwo);
    console.log("I am a generic string");
    console.log(obfuscatedVariableThree);
}
`

function convertNameToVariableDeclaration(variable) {
    return 'VariableDeclarator[binding.name="' + variable + '"]'
}

function convertNameToFunctionDeclaration(variable, params) {
    return 'FunctionDeclaration[binding.name="' + variable + '"][init.params.items.length=' + params + ']'
}

// we are still in the intiial testing stages, so no returns are necessary
// we're nowhere near ready for any sort of production release, lol...
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
// const $source = fs.readFileSync(processableArguments[0], 'utf-8') // TODO: custom encoding?

console.log('running source file code through refactor...')
const $script = refactor(fakeSrc) // refactor($source)

const obfuscatedVariableOneDeclaration = $script('VariableDeclarator[binding.name="obfuscatedVariableOne"]')
obfuscatedVariableOneDeclaration.rename("deobfuscatedConsolePrinter")
//console.log(obfuscatedVariableOneDeclaration.rename('deobfuscatedColePrinter'))
console.log($script.print())
