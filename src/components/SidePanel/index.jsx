import { Link, Stack } from "@mui/material";
import { NumberInput } from "./NumberInput";
import { CheckboxInput } from "./CheckboxInput";
import { useTrainerStore, useSettingsStore } from "../../stores";
import { LETTERS, NUMBERS, SPECIAL } from "../../constants/outputCharacters";
import { useEffect, useState } from "react";
import { initialize } from "../MainContent/cwplayer";

export function SidePanel() {
  const {
    outputWPM,
    setOutputWPM,
    farnsworthWPM,
    setFarnsworthWPM,
    numberOfCharacters,
    setNumberOfCharacters,
    characterSet,
    setCharacterSet,
    outputAudioPitch,
    setOutputAudioPitch,
    outputVolume,
    setOutputVolume,
    enableSettingUpdates
  } = useSettingsStore()
  
  const {
    setCharactersLeft
  } = useTrainerStore()

  useEffect(() => {
    initialize()
    setCharactersLeft(50)
    onLettersChange(true)
    onNumbersChange(true)
    onSpecialChange(true)
  }, [])

  const [isLettersCollapsed, setIsLettersCollapsed] = useState(true)
  const [lettersChecked, setLettersChecked] = useState(false)
  const [letterCheckStates, setLetterCheckStates] = useState(() => {
    const states = {}
    LETTERS.forEach(letter => {
      states[letter] = false
    });
    return states
  })

  const [isNumbersCollapsed, setIsNumbersCollapsed] = useState(true)
  const [numbersChecked, setNumbersChecked] = useState(false)
  const [numberCheckStates, setNumberCheckStates] = useState(() => {
    const states = {}
    NUMBERS.forEach(number => {
      states[number] = false
    });
    return states
  })

  const [isSpecialCollapsed, setIsSpecialCollapsed] = useState(true)
  const [specialChecked, setSpecialChecked] = useState(false)
  const [specialCheckStates, setSpecialCheckStates] = useState(() => {
    const states = {}
    SPECIAL.forEach(special => {
      states[special] = false
    });
    return states
  })


  const onLettersChange = (isChecked) => {
    let newCharacters;
    let characterSet = useSettingsStore.getState().characterSet

    if (isChecked) {
      newCharacters = characterSet.concat(LETTERS.filter(value => !characterSet.includes(value)))
    } else {
      newCharacters = characterSet.filter(value => !LETTERS.includes(value))
    }

    const newStates = {}
    Object.keys(letterCheckStates).forEach(key => {
      newStates[key] = isChecked
    })
    setLetterCheckStates(newStates)

    setLettersChecked(isChecked)
    setCharacterSet(newCharacters)
    console.log(newCharacters)
  }

  const onNumbersChange = (isChecked) => {
    let newCharacters;
    let characterSet = useSettingsStore.getState().characterSet

    if (isChecked) {
      newCharacters = characterSet.concat(NUMBERS.filter(value => !characterSet.includes(value)))
    } else {
      newCharacters = characterSet.filter(value => !NUMBERS.includes(value))
    }

    const newStates = {}
    Object.keys(numberCheckStates).forEach(key => {
      newStates[key] = isChecked
    })
    setNumberCheckStates(newStates)

    setNumbersChecked(isChecked)
    setCharacterSet(newCharacters)
    console.log(newCharacters)
  }

  const onSpecialChange = (isChecked) => {
    let newCharacters;
    let characterSet = useSettingsStore.getState().characterSet

    if (isChecked) {
      newCharacters = characterSet.concat(SPECIAL.filter(value => !characterSet.includes(value)))
    } else {
      newCharacters = characterSet.filter(value => !SPECIAL.includes(value))
    }

    const newStates = {}
    Object.keys(specialCheckStates).forEach(key => {
      newStates[key] = isChecked
    })
    setSpecialCheckStates(newStates)

    setSpecialChecked(isChecked)
    setCharacterSet(newCharacters)
    console.log(newCharacters)
  }

  return (
    <div
      style={{
        // width: 381,
        background: '#35155D',
        height: '100vh',
        overflow: 'scroll'
        // float: 'left'
      }}
    >
      <p
        style={{
          color: "white",
          fontSize: 50,
          fontWeight: 700,
          textAlign: 'center',
          paddingTop: 20,
          margin: 0
        }}>
        CW TRAINER
      </p>
      <div
        style={{
          width: 196,
          margin: '0 auto'
        }}
      >
        <div
          style={{
            marginTop: 40
          }}
        >
          <NumberInput
            enable={enableSettingUpdates}
            label={"Output Speed (WPM)"}
            initialValue={20}
            min={1}
            max={100}
            onChange={(newValue, oldValue) => {
              setOutputWPM(newValue)
            }}/>
        </div>
        <div
          style={{
            marginTop: 40
          }}
        >
          <NumberInput
            enable={enableSettingUpdates}
            label={"Spacing / Fansworth Speed (WPM)"}
            initialValue={20}
            min={1}
            max={100}
            onChange={(newValue, oldValue) => {
              setFarnsworthWPM(newValue)
            }}/>
        </div>
        <div
          style={{
            marginTop: 40
          }}
        >
          <NumberInput
            enable={enableSettingUpdates}
            label={"Output Audio Pitch (Hz)"}
            initialValue={700}
            min={600}
            max={800}
            onChange={(newValue, oldValue) => {
              setOutputAudioPitch(newValue)
            }}/>
        </div>
        <div
          style={{
            marginTop: 40
          }}
        >
          <NumberInput
            enable={enableSettingUpdates}
            label={"Number of Characters"}
            initialValue={50}
            min={1}
            max={300}
            onChange={(newValue, oldValue) => {
              setNumberOfCharacters(newValue)
              setCharactersLeft(newValue)
            }}/>
        </div>
        <div
          style={{
            marginTop: 40
          }}
        >
          <p
            style={{
              color: 'white',
              fontSize: 17,
              fontWeight: 400
            }}
          >
            Output Characters
          </p>
          <Stack
            direction='row'
          >
            <CheckboxInput
              enable={enableSettingUpdates}
              label='Letters'
              value={lettersChecked}
              onChange={onLettersChange}
              />
            <Link
              style={{
                cursor: 'pointer',
                paddingTop: 13
              }}
              onClick={() => {
                setIsLettersCollapsed(!isLettersCollapsed)
              }}
            >
              {isLettersCollapsed ? 'Expand' : 'Collapse'}
            </Link>
          </Stack>
          <div
            style={{
              display: isLettersCollapsed ? 'none' : 'block'
            }}
          >
            {LETTERS.map(letter => (
              <div
                key={letter}>
                <CheckboxInput
                  enable={enableSettingUpdates}
                  label={letter}
                  level={1}
                  value={letterCheckStates[letter]}
                  onChange={(isChecked) => {
                    let newCharacters;
                    let characterSet = useSettingsStore.getState().characterSet
                    console.log(letter)
                    if (isChecked) {
                      if (characterSet.includes(letter)) return
                      newCharacters = characterSet.concat([letter])
                    } else {
                      if (!characterSet.includes(letter)) return
                      newCharacters = characterSet.filter(value => value != letter)
                    }
                    letterCheckStates[letter] = isChecked
                    setCharacterSet(newCharacters)
                    console.log(newCharacters)
                  }}
                />
              </div>
              ))}
          </div>
          <Stack
            direction='row'
          >
            <CheckboxInput
              enable={enableSettingUpdates}
              label='Numbers'
              value={numbersChecked}
              onChange={onNumbersChange}
            />
            <Link
              style={{
                cursor: 'pointer',
                paddingTop: 13
              }}
              onClick={() => {
                setIsNumbersCollapsed(!isNumbersCollapsed)
              }}
            >
              {isNumbersCollapsed ? 'Expand' : 'Collapse'}
            </Link>
          </Stack>
          <div
            style={{
              display: isNumbersCollapsed ? 'none' : 'block'
            }}
          >
            {NUMBERS.map(letter => (
              <div
                key={letter}>
                <CheckboxInput
                  enable={enableSettingUpdates}
                  label={letter}
                  level={1}
                  value={numberCheckStates[letter]}
                  onChange={(isChecked) => {
                    let newCharacters;
                    let characterSet = useSettingsStore.getState().characterSet
                    console.log(letter)
                    if (isChecked) {
                      if (characterSet.includes(letter)) return
                      newCharacters = characterSet.concat([letter])
                    } else {
                      if (!characterSet.includes(letter)) return
                      newCharacters = characterSet.filter(value => value != letter)
                    }
                    numberCheckStates[letter] = isChecked
                    setCharacterSet(newCharacters)
                    console.log(newCharacters)
                  }}
                />
              </div>
              ))}
          </div>
          <Stack
            direction='row'
          >
            <CheckboxInput
              enable={enableSettingUpdates}
              label='Special'
              value={specialChecked}
              onChange={onSpecialChange}
            />
            <Link
              style={{
                cursor: 'pointer',
                paddingTop: 13
              }}
              onClick={() => {
                setIsSpecialCollapsed(!isSpecialCollapsed)
              }}
            >
              {isSpecialCollapsed ? 'Expand' : 'Collapse'}
            </Link>
          </Stack>
          <div
            style={{
              display: isSpecialCollapsed ? 'none' : 'block'
            }}
          >
            {SPECIAL.map(letter => (
              <div
                key={letter}>
                <CheckboxInput
                  enable={enableSettingUpdates}
                  label={letter}
                  level={1}
                  value={specialCheckStates[letter]}
                  onChange={(isChecked) => {
                    let newCharacters;
                    let characterSet = useSettingsStore.getState().characterSet
                    console.log(letter)
                    if (isChecked) {
                      if (characterSet.includes(letter)) return
                      newCharacters = characterSet.concat([letter])
                    } else {
                      if (!characterSet.includes(letter)) return
                      newCharacters = characterSet.filter(value => value != letter)
                    }
                    specialCheckStates[letter] = isChecked
                    setCharacterSet(newCharacters)
                    console.log(newCharacters)
                  }}
                />
              </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}