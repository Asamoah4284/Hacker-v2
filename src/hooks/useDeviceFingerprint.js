import { useState, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const useDeviceFingerprint = () => {
  const [visitorId, setVisitorId] = useState(null);
  const [fingerprintData, setFingerprintData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFingerprint = async () => {
      try {
        setLoading(true);
        setError(null);

        // Initialize FingerprintJS
        console.log('Hook: Starting FingerprintJS initialization...');
        const fp = await FingerprintJS.load();
        console.log('Hook: FingerprintJS loaded successfully');

        // Get the visitor identifier
        console.log('Hook: Getting visitor identifier...');
        const result = await fp.get();
        console.log('Hook: Visitor identifier result:', result);

        // Set the visitor ID and full fingerprint data
        setVisitorId(result.visitorId);
        setFingerprintData(result);
        
        // Debug logging
        console.log('Hook: Fingerprint loaded successfully:', result.visitorId);
        console.log('Hook: Full fingerprint data:', result);

      } catch (err) {
        console.error('Error loading device fingerprint:', err);
        setError(err.message || 'Failed to load device fingerprint');
      } finally {
        setLoading(false);
      }
    };

    getFingerprint();
  }, []);

  return {
    visitorId,
    fingerprintData,
    loading,
    error,
    isReady: !loading && !error && visitorId !== null
  };
}; 