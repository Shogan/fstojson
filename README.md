# fstojson

fstojson is a multi-platform command line tool to convert filesystem directory structure to JSON.

It is written in Node.js and packaged as executable binaries (containing the NodeJS runtime as well as the tool itself) for Windows, Linux and MacOS.

# Usage

Output the content of c:\example and all children directories as JSON:

`fstojson traverse c:\example`

Output the content of c:\example and all children directories as prettified JSON:

`fstojson traverse c:\example -p`

Show help:

`fstojson --help`
