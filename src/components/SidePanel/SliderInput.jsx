import { Grid, Slider } from '@mui/material'
import { VolumeUp } from "@mui/icons-material"
import { useState } from 'react'


export const SliderInput = (props) => {
  const {
    min,
    max,
    initialValue
  } = props
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div
      style={{
        margin: '0 auto',
        width: 186
      }}
    >
      <p
        style={{
          color: 'white',
          fontSize: 17,
          fontWeight: 400
        }}
      >
        Output Volume
      </p>
      <Grid
        container
        spacing={2}
        alignItems='center'
      >
        <Grid
          item
        >
          <VolumeUp
            sx={{
              color: '#FFFFFF'
            }}/>
        </Grid>
        <Grid
          item
          xs
        >
          <Slider
            min={min}
            max={max}
            sx={{
              color: '#4477CE',
              '& .MuiSlider-thumb': {
                backgroundColor: '#FFFFFF'
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#D9D9D9',
                opacity: 1
              }
            }}
            value={value}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  )
}