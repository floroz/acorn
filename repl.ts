import { Parser } from './src/parser/parser'

async function repl(): Promise<void> {
    const parser = new Parser()

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

        console.log(parser.parse(input))
    }
}

void repl()
