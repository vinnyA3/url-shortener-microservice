import Component from 'inferno-component' 
import { connect } from 'inferno-redux'

class Response extends Component {
  render({shortUrl}) {
    return (
      <div>{JSON.stringify(shortUrl.data, null, 4)}</div> )
  }
}

export default connect(
  ({shortUrl}) => ({shortUrl}),
  null
)(Response) 
