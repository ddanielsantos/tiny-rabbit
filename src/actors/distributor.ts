import amqplib from 'amqplib'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileToLines } from '../utils/file-to-lines'
import { config } from '../config/config'

import type { Batch } from '../types/types'

async function distributor() {
  const queueToSend = 'tasks'
  const connection = await amqplib.connect(config.RABBIT_URL)
  
  const directory = path.join(__dirname, '..', 'data')
  const lines = fileToLines(directory + '/raw')
  const sender = await connection.createChannel()

  await sender.assertQueue(queueToSend, { durable: true })

  const bufferSize = 5

  for (let index = 0; index < lines.length; index += bufferSize) {
    const linesToSend = lines.slice(index, index + bufferSize)

    const batch: Batch = {
      id: crypto.randomUUID(),
      totalLines: lines.length,
      lines: linesToSend
    } 

    const stringified = JSON.stringify(batch)

    sender.sendToQueue(queueToSend, Buffer.from(stringified))
  }
}

distributor()
