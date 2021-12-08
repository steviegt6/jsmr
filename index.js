const fs = require('fs')
const { refactor } = require('shift-refactor')
const { writeTabIndented, writeSpaceIndented } = require("./logUtils.js")
const { doesArgumentExist } = require("./launchArgsProcessor.js")
const { displayInformation, displayConditions } = require("./saveMySanityGnu.js")

/** ENTRY-POINT FILE **/

// Start-up text
writeTabIndented("JSMR  Copyright (C) 2021  Tomat")
writeTabIndented("This program comes with ABSOLUTELY NO WARRANTY; for details, launch with `--license-info`")
writeTabIndented("This is free software, and you are welcome to redistribute it.")
writeTabIndented("under certain conditions; launch with `--license-conditions`")
console.log()
console.log("Launched JSMR with the following arguments:")
process.argv.forEach(function (val, index, array) {
    writeSpaceIndented(1, index + ': ' + val)
})
console.log()

// Process launch arguments, yay...
let licenseInfo = doesArgumentExist("--license-info")
let licenseConditions = doesArgumentExist("--license-conditions")
let help = doesArgumentExist("--help") || doesArgumentExist("-h");

if (licenseInfo || licenseConditions || help) {
    console.log("Found informative launch argument, program will instead display information.")
    console.log("")
}

if (licenseInfo) {
    displayInformation();
    return;
}

if (licenseConditions) {
    displayConditions();
    return;
}

// TODO: Actual stuff, lol.
if (help) {
    console.log("JSMR is a program designed for, but not limited"
            + "\nto, reverse engineering JavaScript programs."
            + "\nIt uses mapping files to remap existing -- usually"
            + "\nobfuscated JavaScript member names to new, readable"
            + "\nones. It is very simple in concept."
            + "\n"
            + "\nThe following are a list of usable launch arguments:"
            + "\n"
            + "\n"
            + "\n --help | -h          - Displays this message."
            + "\n --license-info       - Displays information on this product's license."
            + "\n --license-conditions - Displays this product's license's conditions.")
}


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
