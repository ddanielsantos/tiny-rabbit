import amqplib from 'amqplib'
import { sumLine } from '../utils/sum-line'
import { config } from '../config/config'

import type { Batch, WorkerMessage } from '../types/types'

async function worker() {
  const queueToListen = 'tasks'
  const conn = await amqplib.connect(config.RABBIT_URL)

  const consumer = await conn.createChannel()
  await consumer.assertQueue(queueToListen, { durable: true })

  consumer.consume(queueToListen, msg => {
    if (!msg) {
      console.log('cancelled by the server')
      return
    }

    const stringifiedMessage = msg.content.toString()

    if(!stringifiedMessage) {
      return
    }

    const load: Batch = JSON.parse(stringifiedMessage)

    const sum = load.lines.reduce((prev, curr) => {
      const currentLineSum = sumLine(curr)
      return currentLineSum + prev
    }, 0)

    const message: WorkerMessage = {
      id: load.id,
      sum,
      processedLines: load.lines.length,
      totalLines: load.totalLines
    }
    
    const processedMessage = JSON.stringify(message)
    console.log(processedMessage)

    const destinationQueue = 'aggregator'
    consumer.ack(msg)
    consumer.sendToQueue(destinationQueue, Buffer.from(processedMessage))
  })
  
}

worker()
