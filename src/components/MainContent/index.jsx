import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useTrainerStore, useSettingsStore } from '../../stores'
import { Stack, Button } from "@mui/material"
import { play } from "cw"
import { useState } from "react"

export const MainContent = (props) => {
  const {
    characterSet,
    numberOfCharacters,
    outputAudioPitch,
    farnsworthWPM,
    outputWPM
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
      let waitTime = play(char, {
        tone: outputAudioPitch,
        wpm: outputWPM,
        fwpm: farnsworthWPM
      })
      await new Promise(resolve => setTimeout(resolve, waitTime))
      setCharactersLeft(i - 1)
      played.push(char)
    }

    setCharactersPlayed(played)
    setIsStartDisabled(false)
    setIsTestDisabled(false)
    setIsStopDisabled(true)
    setIsStopButtonClicked(false)
  }

  const handleStopClick = () => {
    setIsStopButtonClicked(true)
  }

  const handleTestClick = async () => {
    const testWord = 'cwtrainer';
    setIsStartDisabled(true)
    setIsStopDisabled(false)
    setIsTestDisabled(true)
    for (
      let i = 0;
      i < testWord.length && !(useTrainerStore.getState().isStopButtonClicked);
      ++i
    ) {
      let character = testWord[i]
      let waitTime = play(character, {
        tone: outputAudioPitch,
        wpm: outputWPM,
        fwpm: farnsworthWPM
      })
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
    setIsStartDisabled(false)
    setIsTestDisabled(false)
    setIsStopDisabled(true)
    setIsStopButtonClicked(false)
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