import { play, codes } from 'cw'
import { ADDITIONAL } from '../../constants/outputCharacters'

export const initialize = () => {
  Object.keys(ADDITIONAL).forEach(character => {
    codes[character] = ADDITIONAL[character]
  });
}

export const playAndWait = async (character, tone, wpm, fwpm) => {
  const playTime_ms = play(character, {
    tone: tone,
    wpm: wpm,
    fwpm: fwpm
  })

  await new Promise(resolve => setTimeout(resolve, playTime_ms))
}