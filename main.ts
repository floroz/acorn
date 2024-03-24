import fs from 'node:fs'
import { Parser } from './src/parser/parser'

fs.readFile('./custom.floroz', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    const parser = new Parser()

    console.log(parser.parse(data));
})


