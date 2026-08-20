import React from 'react';
import heroDoctorImg from '../assets/images/hero_doctor_cutout.png';

/**
 * Purple "AI Health Analysis" banner, shared by the desktop and mobile
 * compositions.
 *
 * Reference geometry (logical px, both references measured at 4x):
 *   desktop — banner 515x121, radius 36.67, text inset 24.93,
 *             doctor cutout 150px wide flush to the right edge
 *   mobile  — banner 400x130, radius ~24, text inset ~16,
 *             doctor cutout 128px wide
 * 150/515 = 29% and 128/400 = 32%, so the artwork is sized as a percentage and
 * the text box reserves exactly that much room — it can never run under the
 * doctor the way the old `whitespace-nowrap` markup did.
 *
 * The desktop treatment is gated on `lg`, matching the breakpoint at which
 * AiSuggestionPage swaps compositions. Gating it on `sm` meant the 24.93px
 * desktop inset applied at 640-1023 while the mobile layout was still on
 * screen, which narrowed the text box and wrapped the subtitle again.
 */
export const AiHealthHeroBanner: React.FC = () => {
  return (
    <div
      /*
        Gradient measured from both references by least-squares plane fit:
        the colour falls ~4x faster vertically than horizontally, and clamps to
        the end stop at 70% of the gradient line — not the 102deg/100% ramp that
        was here before (which was off by 20-31 RGB units across the whole box).
        The CSS angle differs per box aspect: 159deg at 400x130, 165deg at
        515x121. Worst residual 5 and 4 units respectively.
      */
      className="relative w-full max-w-[515px] min-h-[130px] lg:min-h-[121px] rounded-[24px] lg:rounded-[36.67px] pl-4 lg:pl-[24.93px] pr-[12.96px] py-[19.43px] flex items-center overflow-hidden shadow-lg bg-[linear-gradient(159deg,#B18CFF_0%,#5C24FF_70%)] lg:bg-[linear-gradient(165deg,#B18CFF_0%,#5C24FF_70%)]"
    >
      {/* Banner text — reserves the artwork's 32% column plus a small gutter */}
      <div className="relative z-10 flex flex-col justify-center max-w-[min(310px,calc(100%-34%))]">
        {/*
          Both references use 27px/15px Sora, and the clamps below resolve to
          exactly that from 440px up (the mobile reference width) and at every
          desktop width. Below 440 the type scales down proportionally so the
          subtitle stays on one line instead of wrapping and pushing the banner
          from 130px to 146px. Line-heights stay fixed, so the banner height is
          identical at every viewport.
        */}
        <h1
          className="font-sora font-bold text-white leading-[49.87px] tracking-[-1.14px]"
          style={{ fontSize: 'clamp(18px, calc(7.39vw - 5.1px), 27px)' }}
        >
          AI Health Analysis
        </h1>
        <p
          className="font-sora font-normal text-[#F6F6F6] leading-[28.42px]"
          style={{ fontSize: 'clamp(10px, calc(4.1vw - 2.83px), 15px)' }}
        >
          Diagnostic Scan ID: #882-AI-V4
        </p>
      </div>

      {/* Doctor artwork — transparent cutout so it blends into the gradient */}
      <img
        src={heroDoctorImg}
        alt=""
        aria-hidden="true"
        width={400}
        height={371}
        decoding="async"
        onError={(e) => {
          e.currentTarget.style.visibility = 'hidden';
        }}
        className="pointer-events-none select-none absolute right-0 bottom-0 h-full w-[32%] max-w-[150px] object-contain object-right-bottom"
      />
    </div>
  );
};
