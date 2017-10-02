const ControlInput = ({updateInput}) => {
  return (
    <input 
      placeholder='Your Url Here...'
      onInput={updateInput}
    />
  )
}

export default ControlInput
