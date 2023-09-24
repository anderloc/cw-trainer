
import {FormControlLabel, Checkbox, Typography} from '@mui/material'
import { useState } from 'react'

export const CheckboxInput = (props) => {
  const { label, onChange } = props
  const level = props.level || 0
  const value = (props.value === true)

  const handleChange = (event) => {
    const isChecked = event.target.checked
    if (onChange) {
      onChange(isChecked)
    }
  }

  return (
    <>
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            color: '#FFFFFF',
            '&.Mui-checked': {
              color: '#FFFFFF'
            },
            marginLeft: 5 * level
          }}
          checked={value}
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