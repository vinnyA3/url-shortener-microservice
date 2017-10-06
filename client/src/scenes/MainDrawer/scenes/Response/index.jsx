import Component from 'inferno-component' 
import { connect } from 'inferno-redux'
import glamorous from 'glamorous'

const Container = glamorous.div({
  background: '#fff',
  transition: 'all 0.4s linear',
  color: 'black',
  padding: '1em .8em',
  borderRadius: '.4em'
})

class Response extends Component {
  render({shortUrl}) {
    const { data, err } = shortUrl
    return (
      <Container>
        {
          err
            ? JSON.stringify(err, null, 4) 
            : JSON.stringify(data, null, 4)
        }
      </Container> 
    )
  }
}

export default connect(
  ({shortUrl}) => ({shortUrl}),
  null
)(Response) 
