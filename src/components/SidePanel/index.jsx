import { FormGroup } from "@mui/material";
import { NumberInput } from "./NumberInput";
import { CheckboxInput } from "./CheckboxInput";
import { SliderInput } from "./SliderInput";
import { play } from 'cw'
import { useButtonStore, useSettingsStore } from "../../stores";
import { LETTERS, NUMBERS, SPECIAL } from "../../constants/outputCharacters";
import { useEffect } from "react";

export function SidePanel() {
  const {
    outputWPM,
    setOutputWPM,
    farnsworthWPM,
    setFarnsworthWPM,
    numberOfCharacters,
    setNumberOfCharacters,
    setCharacterSet,
    outputAudioPitch,
    setOutputAudioPitch,
    outputVolume,
    setOutputVolume
  } = useSettingsStore()
  
  const {
    setCharactersLeft
  } = useButtonStore()

  useEffect(() => {
    setCharactersLeft(50)
    onLettersChange(true)
    onNumbersChange(true)
    onSpecialChange(true)
  }, [])

  const onLettersChange = (isChecked) => {
    let newCharacters;
    let characterSet = useSettingsStore.getState().characterSet

    if (isChecked) {
      newCharacters = characterSet.concat(LETTERS.filter(value => !characterSet.includes(value)))
    } else {
      newCharacters = characterSet.filter(value => !LETTERS.includes(value))
    }
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
    setCharacterSet(newCharacters)
    console.log(newCharacters)
  }

  return (
    <div
      style={{
        // width: 381,
        background: '#35155D',
        minHeight: '100vh',
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
          <FormGroup>
            <CheckboxInput
              label='Letters'
              checkedByDefault={true}
              onChange={onLettersChange}
            />
            <CheckboxInput
              label='Numbers'
              checkedByDefault={true}
              onChange={onNumbersChange}
            />
            <CheckboxInput
              label='Special'
              checkedByDefault={true}
              onChange={onSpecialChange}
            />
          </FormGroup>
        </div>
      </div>
      {/* <div
        style={{
          marginTop: 40
        }}
      >
        <SliderInput
          initialValue={100}
          min={1}
          value={100}
        />
      </div> */}
    </div>
  )
}