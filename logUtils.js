// Write a standard console.log message with tab indentation
module.exports.writeTabIndented = function(data) {
    console.log('   ' + data)
}

// Write a standard console.log message with space indentation
module.exports.writeSpaceIndented = function(spaces, data) {
    let string = ''
    for (var i = 0; i < spaces; i++)
        string += ' '
    console.log(string + data)
}