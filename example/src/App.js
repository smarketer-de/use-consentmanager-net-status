import React from 'react'

import { useMyHook } from 'use-consentmanager-net-status'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
