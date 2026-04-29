"use client";

import { useEffect } from "react";

export default function AdBanner({ className = "" }: { className?: string }) {
  useEffect(() => {
    try {
      // @ts-expect-error Google AdSense injected object
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden flex items-center justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-3379682682499309"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
