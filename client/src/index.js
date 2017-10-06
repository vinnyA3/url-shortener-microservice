// main global styles
import 'styles/_main.scss'
import { Div } from 'glamorous'
// inferno module
import {render} from 'inferno'
import { Provider } from 'inferno-redux' 
import MainDrawer from 'scenes/MainDrawer'
// store
import configureStore from './store'

const store = configureStore()

const App = () => {
    return (
    <Provider store={store}>
      <Div
        display='flex'
        flexDirection='column'
        alignItems='center'
        height='100%'
        width='100%'
      >
        <MainDrawer height='100%' width='100%' color='#215BBB'/>
      </Div>
    </Provider>
    )
}

render(<App />, document.getElementById('app'))
