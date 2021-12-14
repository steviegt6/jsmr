# jsmr
Simple program for remapping JavaScript member names, namely variable and function declarations.

# Purpose
This is mainly for reverse-engineering JavaScript programs.

## JSMR - In Concept
The general idea is to use a library such as `shift-refactor` in order to parse a JavaScript file, and real from a `.json` file that contains data for remapping names.

Using the program would be as trivial as something like `node index.js "path/to/file.js" "path/to/mappings.json"`.

# TO-DO
* Actual remapping.
* Allow the remapping of multiple files - perhaps connect them for renaming? If a variable comes from a remapped file then the name may be lost, **that is not good**.

## General JSON-Based Mapping Ideas
JavaScript is parsable through an AST (abstract syntax tree) system, which gives us a lot of information. My goal is to design a sort of easy-to-use JSON-based way of swapping out AST member values. This means we could replace a `const` variable declarator with a `let` variable declarator instead, sort of like Minecraft Forge's AccessTransformer system.

The library we're using, `shift-refactor`, parses existing JavaScript code and constructs an AST to use that we can modify. We can then convert this AST back to readable JavaScript code, however it isn't identical to the source. Stuff such as compiler-ignored whitespace *will* be left out, which is important.

We can use this knowledge to safely do many things.

While this program is intended to be used for member deobfuscation through remapping, it is more of a goal to make this versatile enough to act as an AST visitor which would let us add to and remove from the AST without writing explicit JS code, which could be huge!

Using JSON may not be optimal for this, however. It might be more worthwhile to use our own text-based file format that doesn't rely on the unreadableness and unfriendly nature of JSON.

Furthermore, an AST visitor that provides modification capabilities would be incredible useful as well.
