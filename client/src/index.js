// main global styles
import 'styles/_main.scss'
// inferno module
import {render} from 'inferno'
// components
import Wrapper from 'core/Wrapper'
import MainDrawer from 'MainDrawer'
import ResponseWindow from 'ResponseWindow'

const App = () => {
    return (
		<Wrapper>
      <MainDrawer />
      <ResponseWindow />
		</Wrapper>
    )
}

render(<App />, document.getElementById('app'))
