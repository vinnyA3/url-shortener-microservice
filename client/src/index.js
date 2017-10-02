// main global styles
import 'styles/_main.scss'
// inferno module
import {render} from 'inferno'
import { Provider } from 'inferno-redux' 
// components
import Wrapper from 'core/Wrapper'
import MainDrawer from 'MainDrawer'
// store
import configureStore from './store'

const store = configureStore()

const App = () => {
    return (
    <Provider store={store}>
      <Wrapper>
        <MainDrawer />
      </Wrapper>
    </Provider>
    )
}

render(<App />, document.getElementById('app'))
