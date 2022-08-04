# useConsentmanagerNetStatus

> Hook to get the current status of the ConsentManager.net CMP on the page

[![NPM](https://img.shields.io/npm/v/use-consentmanager-net-status.svg)](https://www.npmjs.com/package/use-consentmanager-net-status) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-consentmanager-net-status
```

## Usage

```tsx
import * as React from "react";

import useConsentmanagerNetStatus from "use-consentmanager-net-status";

const GoogleAnalyticsScript = () => {
  const { isConsentGivenFor } = useConsentmanagerNetStatus();
  return <div>{isConsentGivenFor("Google Analytics") && <script ... />}</div>;
};
```

`useConsentmanagerNetStatus` returns an object with two properties:

- `isConsentGivenFor(vendorName)`: Function that takes a vandor name and returns the consent status for that vendor.
- `consentStatus`: An object of all the vendor names and their consent status (e.g. `{"Google Analytics": true}`).

It is recommended to use the `isConsentGivenFor` function to check if the user has given consent for a vendor instead of using the `consentStatus` object as the function will handle edge-cases like non-existent vendors or if GDPR doesn't apply.

The hook automatically adds an event listener to the Consent Manager so your component will re-render when the user's consent status changes.

The hook also handles the case where the Consent Manager is not available yet and will automatically retry adding its event listener until it finds the API - this way you won't have to make sure ConsentManager.net is fully loaded yet before using the hook.

It is compatible with SSR and contains TypeScript definitions.

## License

MIT © [vantezzen](https://github.com/vantezzen)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
