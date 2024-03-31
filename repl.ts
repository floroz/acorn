import { Parser } from './src/parser/parser'

async function repl(): Promise<void> {
    while (true) {
        const input = await new Promise<string>((resolve) => {
            process.stdout.write('Repl@0.1> ')
            process.stdin.on('data', (data) => {
                resolve(data.toString())
            })
        })

        if (input === 'exit\n') {
            break
        }

        const parser = new Parser(input)

        console.log(parser.parse())
    }
}

void repl()
