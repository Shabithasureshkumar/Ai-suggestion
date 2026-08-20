import React from 'react';
import { ChooseDoctorButton } from './ChooseDoctorButton';
import { AiHealthHeroBanner } from './AiHealthHeroBanner';

interface AiHealthHeaderProps {
  onChooseDoctor?: () => void;
}

/**
 * Desktop hero row: banner on the left, Choose Doctor on the right.
 *
 * Reference (1440): row spans x=49..1396 (1347 wide), banner 515 wide at the
 * left edge, Choose Doctor 182 wide ending at x=1396, both vertically centred
 * on the 121px banner. The row's width/offset is owned by AiSuggestionPage,
 * which outdents it from the 1311px column grid by 16px left / 20px right to
 * reproduce the reference's asymmetric margins exactly.
 */
export const AiHealthHeader: React.FC<AiHealthHeaderProps> = ({ onChooseDoctor }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
      <AiHealthHeroBanner />

      <div className="flex items-center justify-end">
        <ChooseDoctorButton onClick={onChooseDoctor} />
      </div>
    </div>
  );
};
