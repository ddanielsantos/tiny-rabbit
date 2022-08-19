import amqplib from 'amqplib'
import { config } from '../config/config'

import type { WorkerMessage } from '../types/types'

type LoadMap = {
  [key in string]: {
    loads: WorkerMessage[],
    totalLines: number,
    linesProcessed: number
  }
}

async function collector() {
  const queueToListen = 'aggregator'
  const conn = await amqplib.connect(config.RABBIT_URL)

  const collector = await conn.createChannel()
  await collector.assertQueue(queueToListen, { durable: true })

  const loads: LoadMap = {}

  collector.consume(queueToListen, msg => {
    if(!msg) {
      console.log('cancelled by the server')
      return
    }

    const stringifiedMessage = msg.content.toString()

    if(!stringifiedMessage) {
      console.log('no message')
      return
    }
    
    const message: WorkerMessage = JSON.parse(stringifiedMessage) 
    collector.ack(msg)

    if (!loads[message.id]) {
      loads[message.id] = {
        loads: [message],
        totalLines: message.totalLines,
        linesProcessed: message.processedLines
      }
    } else {
      loads[message.id].linesProcessed += message.processedLines
      loads[message.id].loads.push(message)
    }

    if (loads[message.id].linesProcessed === loads[message.id].totalLines) {
      const sum = loads[message.id].loads.reduce((prev, curr) => prev + curr.sum, 0)
      console.log(`Load ${message.id} Sum: ${sum}`)
    }
  })
}

collector()
