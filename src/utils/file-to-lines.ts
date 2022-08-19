import fs from 'node:fs'

export function fileToLines(file: string): string[] {
  const data = fs.readFileSync(file, { encoding: 'utf8' })
  const [_, ...lines] = data.split('\n').reverse()

  return lines
}
