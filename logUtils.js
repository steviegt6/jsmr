// Write a standard console.log message with tab indentation
export function writeTabIndented(data) {
    console.log('   ' + data)
}

// Write a standard console.log message with space indentation
export function writeSpaceIndented(spaces, data) {
    let string = ''
    for (var i = 0; i < spaces; i++)
        string += ' '
    console.log(string + data)
}