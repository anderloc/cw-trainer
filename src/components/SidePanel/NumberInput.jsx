import { ClickAwayListener } from "@mui/material"
import { useState } from "react"



export const NumberInput = (props) => {
  const {
    min,
    max,
    label,
    onChange,
    initialValue
  } = props
  const enable = (props.enable === true)

  const [number, setNumber] = useState(initialValue)
  const [oldNumber, setOldNumber] = useState(initialValue)

  const normalizeNumberInput = () => {
    let value = number
    if (value !== '') {
      if (value < min) {
        value = min
        setNumber(value)
      }
      else if (value > max) {
        value = max
        setNumber(value)
      }

      if (oldNumber != value
          && onChange) {
        onChange(value, oldNumber)
        setOldNumber(value)
      }
    }
  }

  return (
    <>
      <p
        style={{
          color: 'white',
          fontSize: 17,
          fontWeight: 400,
          margin: 0
        }}
      >
        {label}
      </p>

      <ClickAwayListener
        onClickAway={normalizeNumberInput}
      >
        <input
          disabled={!enable}
          type='number'
          min={min}
          max={max}
          style={{
            fontSize: 20,
            width: 186,
            height: 26,
            color: '#525252',
            border: '5px solid white',
            borderRadius: 4,
            padding: 5
          }}
          value={number}
          onChange={(event) => setNumber(event.target.value)}
          onKeyUp={(event) => {
            if (event.key.toLowerCase() === 'enter') {
              event.preventDefault()
              event.currentTarget.blur()
              normalizeNumberInput()
            }
          }}
        />
      </ClickAwayListener>
    </>
  ) 
}