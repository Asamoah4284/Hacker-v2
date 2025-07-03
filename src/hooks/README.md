# useDeviceFingerprint Hook

A reusable React hook that uses FingerprintJS to generate a unique device fingerprint for visitors.

## Installation

Make sure you have FingerprintJS installed:

```bash
npm install @fingerprintjs/fingerprintjs
```

## Usage

```jsx
import { useDeviceFingerprint } from '../hooks/useDeviceFingerprint';

function MyComponent() {
  const { visitorId, loading, error, isReady } = useDeviceFingerprint();

  if (loading) {
    return <div>Loading device fingerprint...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isReady) {
    return <div>Device ID: {visitorId}</div>;
  }

  return <div>Initializing...</div>;
}
```

## Return Values

- `visitorId`: The unique visitor identifier (string)
- `loading`: Boolean indicating if the fingerprint is being loaded
- `error`: Error message if fingerprint loading failed
- `isReady`: Boolean indicating if the fingerprint is ready to use

## Features

- Automatically loads the device fingerprint on component mount
- Handles loading and error states
- Provides detailed console logging for debugging
- Uses modern React practices (hooks, async/await)
- Thread-safe and reusable across components

## Console Output

The hook logs detailed information to the console:

```javascript
{
  visitorId: "abc123def456...",
  confidence: 0.99,
  components: ["canvas", "fonts", "audio", ...]
}
``` 