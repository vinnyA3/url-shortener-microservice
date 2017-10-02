// main global styles
import 'styles/_main.scss'
// inferno module
import {render} from 'inferno'
import { Provider } from 'inferno-redux' 
// components
import Wrapper from 'core/Wrapper'
import MainDrawer from 'MainDrawer'
import ResponseWindow from 'ResponseWindow'
// store
import configureStore from './store'

const store = configureStore()

const App = () => {
    return (
    <Provider store={store}>
      <Wrapper>
        <MainDrawer />
        <ResponseWindow />
      </Wrapper>
    </Provider>
    )
}

render(<App />, document.getElementById('app'))
