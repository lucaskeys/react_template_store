import React from 'react'

import { SpinnerOverlay, SpinnerContainer } from './WithSpinner.styles'

const WithSpinner = WrappedComponent => {
  const Spinner = ({isLoading, ...otherProps}) => {
    
    console.log('OTHER PROPS FROM SPINNER', {...otherProps})
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  )
}
return Spinner;
}

export default WithSpinner;