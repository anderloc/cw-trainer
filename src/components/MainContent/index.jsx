import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useTrainerStore, useSettingsStore } from '../../stores'
import { Stack, Button } from "@mui/material"
import { useState } from "react"
import { playAndWait } from "./cwplayer"

export const MainContent = (props) => {
  const {
    characterSet,
    numberOfCharacters,
    outputAudioPitch,
    farnsworthWPM,
    outputWPM,
    setEnableSettingUpdates
  } = useSettingsStore()
  
  const {
    setIsStopButtonClicked,
    charactersLeft,
    setCharactersLeft,
  } = useTrainerStore()

  const [isStartDisabled, setIsStartDisabled] = useState(false)
  const [isStopDisabled, setIsStopDisabled] = useState(true)
  const [isTestDisabled, setIsTestDisabled] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [charactersPlayed, setCharactersPlayed] = useState([])

  const handleStartClick = async () => {
    if (characterSet.length == 0) {
      setShowErrorDialog(true)
      return;
    }
    setEnableSettingUpdates(false)
    setCharactersLeft(numberOfCharacters)
    setIsStartDisabled(true)
    setIsStopDisabled(false)
    setIsTestDisabled(true)
    setCharactersPlayed([])

    let played = []
    let numChars = numberOfCharacters
    for (
      let i = numChars;
      i > 0 && !(useTrainerStore.getState().isStopButtonClicked);
      i--
    ) {
      let index = Math.floor(Math.random() * characterSet.length)
      let char = characterSet[index]
      await playAndWait(char, outputAudioPitch, outputWPM, farnsworthWPM)
      setCharactersLeft(i - 1)
      played.push(char)
    }

    setCharactersPlayed(played)
    setIsStartDisabled(false)
    setIsTestDisabled(false)
    setIsStopDisabled(true)
    setIsStopButtonClicked(false)
    setEnableSettingUpdates(true)
  }

  const handleStopClick = () => {
    setIsStopButtonClicked(true)
  }

  const handleTestClick = async () => {
    const testWord = 'cwtrainer';
    setEnableSettingUpdates(false)
    setIsStartDisabled(true)
    setIsStopDisabled(false)
    setIsTestDisabled(true)
    for (
      let i = 0;
      i < testWord.length && !(useTrainerStore.getState().isStopButtonClicked);
      ++i
    ) {
      let character = testWord[i]
      await playAndWait(character, outputAudioPitch, outputWPM, farnsworthWPM)
    }
    setIsStartDisabled(false)
    setIsTestDisabled(false)
    setIsStopDisabled(true)
    setIsStopButtonClicked(false)
    setEnableSettingUpdates(true)
  }

  return (
    <div
      style={{
        paddingTop: 10,
      }}
    >
      <div
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
          marginTop: 20
        }}
      >
        <p
          style={{
            fontSize: 200,
            fontWeight: 700,
            textAlign: 'center',
            margin: 0
          }}
          >
            {charactersLeft}
        </p>
        <Stack
          spacing={2}
          direction='row'
          alignItems='center'
          justifyContent='center'
        >
          <Button
            variant='contained'
            sx={{
              borderRadius: 2,
              backgroundColor: '#4477CE',
              width: 196,
              height: 51,
              '&: hover': {
                backgroundColor: '#4268a8'
              }
            }}
            onClick={handleStartClick}
            disabled={isStartDisabled}
          >
            Start
          </Button>
          <Button
            variant='contained'
            sx={{
              borderRadius: 2,
              backgroundColor: '#EA1179',
              width: 196,
              height: 51,
              '&: hover': {
                backgroundColor: '#b02769'
              }
            }}
            onClick={handleStopClick}
            disabled={isStopDisabled}
          >
            Stop
          </Button>
          <Button
            variant='contained'
            sx={{
              borderRadius: 2,
              backgroundColor: '#6fd609',
              width: 196,
              height: 51,
              '&: hover': {
                backgroundColor: '#4d8713'
              }
            }}
            onClick={handleTestClick}
            disabled={isTestDisabled}
          >
            Test Settings
          </Button>
        </Stack>
        <p
          style={{
            fontSize: 50,
            fontWeight: 700
          }}
          >
          Available Characters
        </p>
        <TextField
          multiline
          disabled
          rows={3}
          sx={{
            display: 'flex',
            flexWrap: 'wrap'
          }}
          InputProps={{
            style: {
              fontSize: 20
            }
          }}
          value={characterSet.join(' ')}
        />
        <p
          style={{
            fontSize: 50,
            fontWeight: 700
          }}
          >
          Characters Sent
        </p>
        <TextField
          multiline
          disabled
          rows={3}
          sx={{
            display: 'flex',
            flexWrap: 'wrap'
          }}
          InputProps={{
            style: {
              fontSize: 20
            }
          }}
          value={charactersPlayed.join(' ')}
        />
      </div>
      <Dialog
        open={showErrorDialog}
      >
        <DialogTitle>Character Selection Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select which character set(s) to use
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setShowErrorDialog(false)}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}