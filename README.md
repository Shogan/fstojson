# fstojson

fstojson is a multi-platform command line tool to convert filesystem directory structure to JSON.

It is written in Node.js and packaged as executable binaries (containing the NodeJS runtime as well as the tool itself) for Windows, Linux and MacOS.

The JSON output for objects traversed by the tool looks like this for directories

```
{
    "name": "directoryobject",
    "path": "/path/to/directoryobject",
    "type: "Directory",
    "children": [
        { ... },
        { ... }
    ]
}
```

and looks like this for files:

```
{
    "name": "fileobject",
    "path": "/path/to/fileobject",
    "type: "File",
}
```

# Download

You can download the latest release executable binaries from [here](https://github.com/Shogan/fstojson/releases)

# Usage

Output the content of c:\example and all children directories as JSON:

`fstojson traverse c:\example`

Output the content of c:\example and all children directories as prettified JSON:

`fstojson traverse c:\example -p`

Get content of some folder in the home path:

`fstojson traverse /home/sean/git/ -p`

Integrate with the PowerShell pipeline:

`$powershellObject = fstojson traverse c:\temp | ConvertFrom-Json`

The **$powershellObject** object would then contain something like the following:

```
name                               path                                       type
----                               ----                                       ----
console-example.log                c:\temp\console-example.log                File
SomeDirectory                      c:\temp\SomeDirectory                      Directory
Dockerfile                         c:\temp\Dockerfile                         File
```

Show help:

`fstojson --help`
