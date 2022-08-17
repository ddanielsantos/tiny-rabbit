import fs from 'node:fs'
import path from 'node:path'
import { randomThreeDigitNumber } from '../utils/random-number'

const numbersPerLine = 10
const numberOfLines = 300

function generateLines(numberOfLines: number): string[] {
  const lines: string[] = Array(numberOfLines)
    .fill(null)
    .map(() => {
      const line = Array(numbersPerLine)
        .fill(null)
        .map(randomThreeDigitNumber)
        .join(' ')
        .concat('\n')

      return line
    })

  return lines
}

function run() {
  const load = generateLines(numberOfLines)
  let directory = path.join(__dirname, '..', 'data')
  
  if(!fs.existsSync(directory)) fs.mkdirSync(directory)

  console.time('Saved in')
  fs.appendFileSync(directory + '/raw', load.toString().replace(/\,/g, ''), { encoding: 'utf-8', flag: 'w+' })
  console.timeEnd('Saved in')
}

run()
