import ControlInput from './components/ControlInput'
import ControlButton from './components/ControlButton'

const Controls = () => {
  return (
    <form onClick={e => e.preventDefault()}>
      <ControlInput />
      <ControlButton />
    </form>
  )
}

export default Controls
