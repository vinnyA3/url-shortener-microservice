import Component from 'inferno-component'
import {connect} from  'inferno-redux'
import './_styles.scss'

class ResponseWindow extends Component {
  render({shortUrl}) {
    return (
      <div className='response-window'>
        {JSON.stringify(shortUrl.data, null, 2)}
      </div>
    )
  }
}

export default connect(
  ({shortUrl}) => ({shortUrl}),
  null
)(ResponseWindow)
