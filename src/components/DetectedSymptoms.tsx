import React, { useState } from 'react';
import { SymptomChip } from './SymptomChip';
import { Plus, Sun } from 'lucide-react';

export const DetectedSymptoms: React.FC = () => {
  const [symptoms, setSymptoms] = useState<string[]>([
    'Chest Pain',
    'Fatigue',
    'Breathlessness',
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newSymptom, setNewSymptom] = useState('');

  const handleRemoveSymptom = (indexToRemove: number) => {
    setSymptoms(symptoms.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSymptom.trim()) {
      setSymptoms([...symptoms, newSymptom.trim()]);
      setNewSymptom('');
      setIsAdding(false);
    }
  };

  return (
    <div className="w-full max-w-[851px] bg-white/80 backdrop-blur-[12px] border border-[#DCE9FF]/50 rounded-[20px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col gap-6">
      
      {/* HEADING ROW (Heading 2 119:4408) */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 flex items-center justify-center text-[#4648D4]">
          <Sun className="w-5 h-5 stroke-[2] text-[#4648D4] rotate-45" />
        </div>
        <h2 className="font-manrope font-bold text-[20px] leading-[28px] text-[#0B1C30]">
          Detected Symptoms
        </h2>
      </div>

      {/* SYMPTOMS CHIPS & ADD BUTTON ROW (Container 119:4412) */}
      <div className="flex flex-wrap items-center gap-4">
        {symptoms.map((symptom, index) => (
          <SymptomChip
            key={`${symptom}-${index}`}
            label={symptom}
            onRemove={() => handleRemoveSymptom(index)}
          />
        ))}

        {/* ADD SYMPTOM DASHED BUTTON / FORM */}
        {isAdding ? (
          <form onSubmit={handleAddSymptom} className="flex items-center gap-2">
            <input
              type="text"
              value={newSymptom}
              onChange={(e) => setNewSymptom(e.target.value)}
              placeholder="Enter symptom..."
              autoFocus
              className="h-[40px] px-4 py-2 bg-white border-2 border-[#5C24FF] rounded-full text-sm font-manrope outline-none w-44"
            />
            <button
              type="submit"
              className="h-[40px] px-4 bg-[#5C24FF] text-white rounded-full font-manrope font-bold text-xs hover:bg-[#4648D4] cursor-pointer"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="h-[40px] px-3 bg-slate-200 text-slate-700 rounded-full font-manrope font-semibold text-xs hover:bg-slate-300 cursor-pointer"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            style={{
              borderStyle: 'dashed',
              borderWidth: '2px',
              borderColor: '#C7C4D7',
            }}
            className="h-[40px] px-4 py-2 bg-transparent rounded-full flex items-center gap-2 hover:border-[#5C24FF] hover:bg-purple-50/50 transition-all cursor-pointer group shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-[#464554] group-hover:text-[#5C24FF] stroke-[2.2]" />
            <span className="font-manrope font-normal text-[14px] leading-[20px] text-[#464554] group-hover:text-[#5C24FF]">
              Add Symptom
            </span>
          </button>
        )}
      </div>

    </div>
  );
};
