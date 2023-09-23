import { SidePanel } from "./SidePanel"
import { MainContent } from "./MainContent"
import { Grid } from "@mui/material"

function App() {
  return (
    <>
      <Grid
        container
      >
        <Grid
          item
          style={{
            width: 381
          }}
        >
          <SidePanel/>
        </Grid>
        <Grid
          item
          xs
        >
          <MainContent/>
        </Grid>
      </Grid>
    </>
  )
}

export default App
