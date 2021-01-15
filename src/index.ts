import {
  getPrintResults,
  getStationsWithMaxPowerFromPoint,
  parseLineToPosition,
  parseLineToStation,
  readLinesFromStandardInput,
} from './utils'

const run = async () => {
  const input = await readLinesFromStandardInput()
  const point = parseLineToPosition(input[0])
  const stations = input.slice(1, input.length).map(parseLineToStation)
  const stationsWithMaxPowerFromPoint = getStationsWithMaxPowerFromPoint(point, stations)
  console.log(getPrintResults(point, stationsWithMaxPowerFromPoint))
}

run()
