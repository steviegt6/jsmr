# jsmr
Simple program for remapping JavaScript member names, namely variable and function declarations.

# Purpose
This is mainly for reverse-engineering JavaScript programs.

## JSMR - In Concept
The general idea is to use a library such as `shift-refactor` in order to parse a JavaScript file, and real from a `.json` file that contains data for remapping names.

Using the program would be as trivial as something like `node index.js "path/to/file.js" "path/to/mappings.json"`.

# TO-DO
* Actual remapping.
* Allow the remapping of multiple files - perhaps connect them for renaming? If a variable comes frm a remapped file then the name may be lost, **that is not good**.