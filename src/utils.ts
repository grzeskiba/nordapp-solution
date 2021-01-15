import readline from 'readline'

import {Position, Station} from './types'

export const readLinesFromStandardInput = (): Promise<string[]> =>
  new Promise(async (resolve) => {
    const result: string[] = []
    const rl = readline.createInterface(process.stdin)
    for await (const line of rl) {
      result.push(line)
    }
    resolve(result)
  })

export const calcDistanceBetweenPoints = (a: Position, b: Position) =>
  Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))

export const calcPowerStationFromPoint = (point: Position, station: Station) =>
  Math.max(0, station[2] - calcDistanceBetweenPoints(point, [station[0], station[1]]))

export const parseLineToStation = (line: string): Station => {
  if (!/^\d+\s\d+\s\d+$/.test(line)) {
    throw Error(`Invalid input station: ${line}`)
  }
  return line.split(' ').map((x) => +x) as Station
}

export const parseLineToPosition = (line: string): Position => {
  if (!/^\d+\s\d+$/.test(line)) {
    throw Error(`Invalid input point: ${line}`)
  }
  return line.split(' ').map((x) => +x) as Position
}

export const getStationsWithMaxPowerFromPoint = (point: Position, stations: Station[]) =>
  stations.reduce<Station[]>((acc, curr) => {
    const power = calcPowerStationFromPoint(point, curr)
    if (power <= 0) {
      return acc
    } else if (!acc.length) {
      acc = [...acc, curr]
    } else {
      const powerDiff = calcPowerStationFromPoint(point, acc[0]) - power
      acc = powerDiff < 0 ? [curr] : powerDiff === 0 ? [...acc, curr] : acc
    }
    return acc
  }, [])

export const getPrintResults = (point: Position, stations: Station[]) =>
  stations.length
    ? `Best link station for point ${point[0]}, ${point[1]} ${stations.length === 1 ? 'is' : 'are'} ${stations
        .map(([x, y]) => `${x},${y}`)
        .join(' ')} with power ${calcPowerStationFromPoint(point, stations[0])}`
    : `No link station within reach for point ${point[0]} : ${point[1]}`
