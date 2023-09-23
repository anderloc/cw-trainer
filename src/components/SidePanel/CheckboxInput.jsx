
import {FormControlLabel, Checkbox, Typography} from '@mui/material'
import { useState } from 'react'

export const CheckboxInput = (props) => {
  const { label, onChange } = props
  const defaultValue = props.checkedByDefault || false

  const handleChange = (event) => {
    const isChecked = event.target.checked
    setChecked(isChecked)
    if (onChange) {
      onChange(isChecked)
    }
  }

  const [checked, setChecked] = useState(defaultValue)

  return (
    <>
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            color: '#FFFFFF',
            '&.Mui-checked': {
              color: '#FFFFFF'
            }
          }}
          checked={checked}
          onChange={handleChange}
        />
      }
      label={
        <Typography
          color={'#FFFFFF'}
          fontSize={20}
          fontWeight={400}
        >
          {label}
        </Typography>
      }
      sx={{
        color: '#FFFFFF',
        fontSize: 20
      }}/>
    </>
  )
}