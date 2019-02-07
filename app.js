#!/usr/bin/env node

const fs = require("fs");
const pathModule = require("path");
let resultArray = [];

require('yargs')
.usage('$0 <cmd> [args]')
.command('traverse [path]', 'traverse the path and output all child directories as a JSON string.', (yargs) => {
    yargs.positional('path', {
        type: 'string',
        default: './',
        describe: 'the path to start directory traversal from.'
    })
}, function (argv) {
    traversePath(argv.path, resultArray).then((results) => {
        if (argv.pretty) {
            console.log(JSON.stringify(results, null, '\t'));
        } else {
            console.log(JSON.stringify(results));
        }
    })
    .catch(console.log.bind(console));
})
.option('pretty', {
    alias: 'p',
    default: false,
    describe: "output the JSON results in a more readable way."
})
.help()
.argv

async function traversePath(path, results) {
    
    let pathObjects = await getItemsInPath(path);

    await Promise.all(pathObjects.map(async (pathObject) => {

        let tempArray = [];
        let object = pathModule.join(path, pathObject);
        let isDirectory = await isObjectDirectory(object);

        if (isDirectory) {
            let dirObject = { "name": pathObject, "path": object, "type": "Directory", children: tempArray };
            results.push(dirObject);
            await traversePath(object, tempArray);
        } else {
            let fileObject = { "name": pathObject, "path": object, "type": "File" };
            results.push(fileObject);
        }
    }));

    return results;
}

function getItemsInPath(path) {
    return new Promise(function (resolve, reject) {
        try {
            return resolve(fs.readdirSync(path));
        }
        catch (err) {
            if (err) {
                console.log(`error: ${err}`);
                return reject(err);
            }
        }
    });
}

function isObjectDirectory(object) {
    return new Promise(function (resolve, reject) {
        try {
            fs.stat(object, function (err, stat) {
                if (err) {
                    if (err.code === 'ENOTDIR') {
                        console.log('not a dir');
                        return reject(err);
                    } else {
                        resolve(false);
                        
                    }
                } else {
                    resolve(stat.isDirectory());
                }
            });
        }
        catch (err) {
            if (err) {
                console.log(`error: ${err}`);
                return reject(err);
            }
        }
    });
}