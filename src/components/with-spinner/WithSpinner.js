import React from 'react'

import { SpinnerOverlay, SpinnerContainer } from './WithSpinner.styles'

const WithSpinner = WrappedComponent => {
  const Spinner = ({isLoading, ...otherProps}) => {
    // the other props in this case are the route component props (match, history, etc) - this is being passed into the wrapped component which is the component we are passing in via the shop page 
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