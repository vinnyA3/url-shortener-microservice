import { Button } from 'glamorous'

const ControlButton = ({getShortenedUrl}) => {
  return (
    <Button 
      border='.02em solid orange'
      color='#fff'
      background='orange'
      textTransform='uppercase'
      fontWeight='bold'
      borderTopRightRadius='.4em'
      borderBottomRightRadius='.4em'
      padding='1em 2em'
      onClick={getShortenedUrl}
    >
      Shorten
    </Button>
  )
}

export default ControlButton
