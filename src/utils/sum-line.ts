export function sumLine(line: string){
  const result = line.split(' ').reduce((prev, curr) => {
    const parsedElement = Number(curr)

    return parsedElement ? parsedElement + prev : prev
  }, 0)

  return result
}

