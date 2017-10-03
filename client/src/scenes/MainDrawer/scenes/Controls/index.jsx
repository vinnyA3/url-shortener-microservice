import Component from 'inferno-component'
import { connect } from 'inferno-redux'
// action creators
import { fetchData } from 'ducks/getShortUrl'
import ControlInput from './components/ControlInput'
import ControlButton from './components/ControlButton'

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputData: ''
    }
    this.getShortenedUrl = this.getShortenedUrl.bind(this)
    this.updateInput = this.updateInput.bind(this)
  }
  updateInput(e) {
    this.setState({ inputData: e.target.value })
  }
  getShortenedUrl() {
    const data = this.state.inputData
    if (data) {
      this.props.fetchData(this.state.inputData)
    }
  }
  render() {
    return (
      <form onClick={e => e.preventDefault()}>
        <ControlInput updateInput={this.updateInput} />
        <ControlButton getShortenedUrl={this.getShortenedUrl} />
      </form>
    )
  }
}

export default connect(
  null,
  {fetchData}
)(Controls)
