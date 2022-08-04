# use-consentmanager-net-status

> Hook to get the current status of the ConsentManager.net CMP on the page

[![NPM](https://img.shields.io/npm/v/use-consentmanager-net-status.svg)](https://www.npmjs.com/package/use-consentmanager-net-status) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-consentmanager-net-status
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'use-consentmanager-net-status'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [vantezzen](https://github.com/vantezzen)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
