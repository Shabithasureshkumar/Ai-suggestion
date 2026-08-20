import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyFirstCard: React.FC = () => {
  return (
    <div className="w-full max-w-[436px] min-h-[236px] bg-[#DCE9FF] rounded-[20px] p-8 border border-[#C7C4D7] flex flex-col justify-between gap-6 shrink-0">
      
      {/* HEADER CONTAINER (Container 119:4544) */}
      <div className="flex items-center gap-4">
        {/* Shield Icon in white circular/rounded box */}
        <div className="w-[40px] h-[44px] bg-white rounded-[16px] p-3 flex items-center justify-center shrink-0 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-[#4648D4] stroke-[2.2]" aria-hidden="true" />
        </div>

        {/* Title and Subtitle */}
        <div className="flex flex-col">
          <h3 className="font-manrope font-extrabold text-[16px] leading-[24px] text-[#0B1C30]">
            Privacy First
          </h3>
          <p className="font-manrope font-semibold text-[12px] leading-[16px] tracking-[0.60px] text-[#464554] uppercase">
            HIPAA Compliant &amp; Encrypted
          </p>
        </div>
      </div>

      {/* BODY TEXT */}
      <p className="font-manrope font-normal text-[14px] leading-[20px] text-[#464554]">
        Your health data is protected with military-grade encryption. We only share relevant diagnostic metrics with matched specialists to ensure your privacy while maximizing care quality.
      </p>

    </div>
  );
};
