import { Div } from 'glamorous'
import Controls from './scenes/Controls'
import Response from './scenes/Response'
import nyc from './images/nyc.jpg'

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
      backgroundImage={`url(${nyc})`}
      backgroundSize='cover'
      color='#fff'
    >
      <h1>Welcome to tIne.io</h1>
      <p>Enter you desired url to enjoy all the goodness a shortened url has to offer</p>
      <Controls />
      <Response />
    </Div>
  )
}

export default MainDrawer
