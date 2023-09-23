import { useEffect, useState } from "react"

export const Timer = () => {
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(20)
  const [totalSeconds, setTotalSeconds] = useState(90)

  useEffect(() => {
    const interval = setInterval(() => {
      const newTotal = totalSeconds - 1
      if (newTotal < 0) {
        return
      }
      setTotalSeconds(newTotal)
      setMinutes(Math.floor(newTotal / 60))
      setSeconds(newTotal % 60)
      console.log(`${minutes} : ${seconds < 10 ? '0' + seconds : seconds}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [totalSeconds])
  return (
    <>
    </>
  )
}