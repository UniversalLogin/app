import React from 'react'
import { Onboarding } from '@universal-login/react'
import { universalLoginSdk } from '../../universal-login'

const UniversalLoginOnboarding = () => {
  return (
    <Onboarding
      sdk={universalLoginSdk}
      onConnect={() => {}}
      onCreate={(...args) => console.log('CREATED', args)}
      domains={['poppularapp.test']}
    />
  )
}

export default UniversalLoginOnboarding
