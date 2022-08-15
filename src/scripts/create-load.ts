import fs from 'fs'
import path from 'path'
import { randomThreeDigitNumber } from '../utils/random-number'

const numbersPerLine = 10
const numberOfLines = 7

function generateLines(numberOfLines: number): string[] {
  const lines: string[] = Array(numberOfLines)
    .fill(null)
    .map(() => {
      const line = Array(numbersPerLine)
        .fill(null)
        .map(randomThreeDigitNumber)
        .join(' ')

      return line
    })

  return lines
}

function run(){
  // let directory = path.join(__dirname, '..', 'data')
  const load = {
    lines: generateLines(numberOfLines),
    numberOfLines
  }

  console.log(load)
  // try {
    // if(!fs.existsSync(directory)){
      // fs.mkdirSync(directory)
    // }
  // } catch (error) {
    // console.error(error)
  // }
  
  // fs.writeFileSync(directory + '/load.json', 'sec', { flag: 'w+' })
} 

run()
