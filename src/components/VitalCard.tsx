import React from 'react';
import { 
  Heart, 
  Activity, 
  Wind, 
  Thermometer, 
  Scale, 
  Droplets, 
  Footprints, 
  Moon, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Info,
  Sparkles 
} from 'lucide-react';
import { VitalItem } from '../types/health';

interface VitalCardProps {
  vital: VitalItem;
  onSelect: (vital: VitalItem) => void;
}

export const VitalCard: React.FC<VitalCardProps> = ({ vital, onSelect }) => {
  // Render custom icons for each vital type
  const renderIcon = () => {
    switch (vital.iconName) {
      case 'heart':
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />;
      case 'bp':
        return <Activity className="w-5 h-5 text-amber-500" />;
      case 'o2':
        return <Wind className="w-5 h-5 text-sky-500" />;
      case 'temp':
        return <Thermometer className="w-5 h-5 text-purple-500" />;
      case 'scale':
        return <Scale className="w-5 h-5 text-indigo-500" />;
      case 'glucose':
        return <Droplets className="w-5 h-5 text-emerald-500" />;
      case 'steps':
        return <Footprints className="w-5 h-5 text-brand-600" />;
      case 'sleep':
        return <Moon className="w-5 h-5 text-indigo-600 fill-indigo-600/20" />;
      default:
        return <Activity className="w-5 h-5 text-brand-600" />;
    }
  };

  // Status Badge Colors based on severity
  const getBadgeStyle = () => {
    switch (vital.severity) {
      case 'normal':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'elevated':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'warning':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      case 'info':
      default:
        return 'bg-brand-50 text-brand-700 border-brand-200/80';
    }
  };

  // SVG Sparkline path renderer
  const renderSparkline = () => {
    const points = vital.sparklineData;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 100;
    const height = 30;

    const pathD = points.map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    const isPositive = vital.severity === 'normal';

    return (
      <div className="w-full h-8 overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          <path
            d={pathD}
            fill="none"
            stroke={isPositive ? '#10B981' : '#8B5CF6'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };

  return (
    <div
      onClick={() => onSelect(vital)}
      className="group relative bg-white rounded-2xl p-5 border border-brand-100/80 shadow-sm hover:shadow-lg hover:shadow-brand-500/10 hover:border-brand-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Row: Icon + Name + Status Badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
            {renderIcon()}
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">
              {vital.name}
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              {vital.lastUpdated}
            </span>
          </div>
        </div>

        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getBadgeStyle()}`}>
          {vital.status}
        </span>
      </div>

      {/* Center Row: Value & Unit */}
      <div className="my-4">
        <div className="flex items-baseline space-x-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-brand-700 transition-colors">
            {vital.value}
          </span>
          {vital.unit && (
            <span className="text-xs font-semibold text-slate-500">
              {vital.unit}
            </span>
          )}
        </div>
        
        {/* Trend Indicator Text */}
        <p className="text-[11px] text-slate-500 font-medium mt-1 flex items-center gap-1">
          {vital.trend.includes('↓') && <TrendingDown className="w-3 h-3 text-emerald-600" />}
          {vital.trend.includes('↑') && <TrendingUp className="w-3 h-3 text-amber-600" />}
          {vital.trend}
        </p>
      </div>

      {/* Bottom Mini Sparkline & Quick Detail Hint */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="w-24">
          {renderSparkline()}
        </div>

        <span className="text-[10px] font-semibold text-brand-600 group-hover:underline flex items-center gap-0.5">
          <span>Details</span>
          <Sparkles className="w-3 h-3" />
        </span>
      </div>

    </div>
  );
};
