import Component from 'inferno-component' 
import { connect } from 'inferno-redux'

class Response extends Component {
  render({shortUrl}) {
    console.log(shortUrl)
    return (
      <div>
        {
          shortUrl.err
            ? JSON.stringify(shortUrl.err, null, 4) 
            : JSON.stringify(shortUrl.data, null, 4)
        }
      </div> 
    )
  }
}

export default connect(
  ({shortUrl}) => ({shortUrl}),
  null
)(Response) 
