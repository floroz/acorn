import fs from 'node:fs'
import { Parser } from './src/parser/parser'

fs.readFile('./custom.floroz', 'utf8', (err, data) => {
    if (err != null) {
        console.error(err)
        return
    }

    const parser = new Parser(data)

    console.log(parser.toAST())
})
