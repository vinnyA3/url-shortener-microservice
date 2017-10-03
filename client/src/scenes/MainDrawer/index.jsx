import { Div } from 'glamorous'
import Controls from './scenes/Controls'
import Response from './scenes/Response'

const MainDrawer = ({height, width, color}) => {
  return (
    <Div 
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height={height} 
      width={width} 
      backgroundColor={color}
    >
      <Controls />
      <Response />
    </Div>
  )
}

export default MainDrawer
