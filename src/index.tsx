import { useEffect, useState } from "react";

export type ConsentStatus = {
  [vendor: string]: boolean;
  gdprApplies: boolean;
};

declare global {
  interface Window {
    __cmp?: (...args: any[]) => any;
  }
}

const addCmpListener = (triggerConsentUpdate: () => void) => {
  if (!window.__cmp) {
    setTimeout(addCmpListener, 200);
    return;
  }

  window.__cmp(
    "addEventListener",
    ["consent", triggerConsentUpdate, false],
    null
  );
};

const removeCmpListener = (triggerConsentUpdate: () => void) => {
  window.__cmp?.(
    "removeEventListener",
    ["consent", triggerConsentUpdate, false],
    null
  );
};

export default function useConsentmanagerNetStatus() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>({
    gdprApplies: true,
  });

  /**
   * Get the current consent status of a service.
   *
   * Usage:
   * ```javascript
   * isConsentGivenFor("Google Analytics");
   * ```
   *
   * @param vendor Name of the vendor to check for.
   * @returns True if the vendor is given consent, false otherwise.
   */
  const isConsentGivenFor = (vendor: string) => {
    return (
      !consentStatus.gdprApplies ||
      (vendor in consentStatus && consentStatus[vendor] === true)
    );
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateConsentStatus = () => {
      const retryLater = () => {
        setTimeout(updateConsentStatus, 1000);
      };

      if (!window.__cmp) {
        retryLater();
        return;
      }

      const rawStatus = window.__cmp("getCMPData");
      if (
        typeof rawStatus !== "object" ||
        rawStatus === null ||
        !("vendorsList" in rawStatus)
      ) {
        retryLater();
        return;
      }

      const status: ConsentStatus = {
        gdprApplies: rawStatus.gdprApplies,
      };
      for (const vendor of rawStatus.vendorsList) {
        status[vendor.name] = rawStatus.vendorConsents[vendor.id] === true;
      }

      if (JSON.stringify(status) !== JSON.stringify(consentStatus)) {
        setConsentStatus(status);
      }
    };

    updateConsentStatus();
    addCmpListener(updateConsentStatus);

    return () => {
      removeCmpListener(updateConsentStatus);
    };
  }, []);

  return {
    isConsentGivenFor,
    consentStatus,
  };
}
