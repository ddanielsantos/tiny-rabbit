export type Batch = {
  id: string
  lines: string[]
  totalLines: number
}

export type WorkerMessage = {
  id: string
  sum: number,
  processedLines: number,
  totalLines: number
}

