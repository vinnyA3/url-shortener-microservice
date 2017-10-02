import './_styles.scss'
import Controls from './scenes/Controls'
import Response from './scenes/Response'

const MainDrawer = () => {
  return (
    <div className='main-drawer'>
      <Controls />
      <Response />
    </div>
  )
}

export default MainDrawer
