import { Input } from 'glamorous'

const ControlInput = ({updateInput}) => {
  return (
    <Input
      color='#D89217'
      border='.02em solid orange'
      paddingTop='1em'
      paddingBottom='1em'
      paddingLeft='1em'
      borderTopLeftRadius='.4em'
      borderBottomLeftRadius='.4em'
      placeholder='Your Url Here...'
      onInput={updateInput}
    />
  )
}

export default ControlInput
