import { Section } from 'glamorous'

const Header = ({children}) => {
  return (
    <Section
      width='100%'
      textAlign='center'
      paddingTop='10%'
      background='#ededed'
    >
      {children}
    </Section>
  )
}

export default Header
