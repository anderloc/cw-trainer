import { create } from "zustand"

export const useSettingsStore = create((set) => ({
  outputWPM: 20,
  setOutputWPM: (outputWPM) => set({outputWPM}),
  farnsworthWPM: 20,
  setFarnsworthWPM: (farnsworthWPM) => set({farnsworthWPM}),
  numberOfCharacters: 50,
  setNumberOfCharacters: (numberOfCharacters) => set({numberOfCharacters}),
  characterSet: [],
  setCharacterSet: (characterSet) => set({characterSet}),
  outputAudioPitch: 700,
  setOutputAudioPitch: (outputAudioPitch) => set({outputAudioPitch}),
  outputVolume: 100,
  setOutputVolume: (outputVolume) => set({outputVolume}),
}))

export const useTrainerStore = create((set) => ({
  isStopButtonClicked: false,
  setIsStopButtonClicked: (isStopButtonClicked) => set({isStopButtonClicked}),
  charactersLeft: 0,
  setCharactersLeft: (charactersLeft) => set({charactersLeft}),
}))