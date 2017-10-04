import { Section } from 'glamorous'

const Header = ({children}) => {
  return (
    <Section
      width='100%'
      textAlign='center'
      paddingTop='10%'
      background='#191919'
    >
      {children}
    </Section>
  )
}

export default Header
