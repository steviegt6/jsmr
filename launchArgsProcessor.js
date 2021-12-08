// Returns the index of the argument, otherwise -1.
module.exports.getArgumentIndex = function(arg) {
    process.argv.forEach(function (val, index, array) {
        if (arg == val) {
            return index
        }
    })

    return -1
}

module.exports.doesArgumentExist = function(arg) {
    return getArgumentIndex(arg) != -1
}

module.exports.getArgumentValue = function(arg) {
    let argIndex = getArgumentIndex(arg)

    if (argIndex == -1) {
        return null
    }

    if (argIndex == process.argv.length - 1) {
        // if there's no value after then there isn't a value to be found
        return null
    }

    let value = process.argv[argIndex + 1]

    // if there's no value or it starts with -- or - then return null
    if (!value || value.startswith('--') || value.startswith('-')) {
        return null
    }

    // should be a valid value
    return value
}