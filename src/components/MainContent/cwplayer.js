import { play, codes, initAudioContext } from 'cw'
import { ADDITIONAL } from '../../constants/outputCharacters'

let audioPlayer = null;

export const initialize = () => {
  Object.keys(ADDITIONAL).forEach(character => {
    codes[character] = ADDITIONAL[character]
  });
}

export const playAndWait = async (character, tone, wpm, fwpm) => {
  if (audioPlayer === null) {
    audioPlayer = initAudioContext();
  }

  audioPlayer.osc.frequency.value = tone
  const startTime_ms = audioPlayer.actx.currentTime * 1000;  
  const playTime_ms = play(character, {
    actx: audioPlayer,
    wpm: wpm,
    fwpm: fwpm
  })

  // playTime_ms is based on the audio context "currentTime"
  // subtracting the "currentTime" that was captued before play()
  // will be sufficient in calculating waitTime
  // (only using playTime_ms will result in increasing wait times)
  const waitTime = playTime_ms - startTime_ms;
  await new Promise(resolve => setTimeout(resolve, waitTime))
}