import React, { useState, useEffect } from 'react';
import { Appointment, FacialChartRecord, InjectionPoint } from '../../../types';
import { StorageService } from '../../../services/storage';
import {
  X,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Plus,
  Trash2,
  AlertCircle,
  FileText,
  Printer,
} from 'lucide-react';

interface FacialMappingModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (chart: FacialChartRecord) => void;
}

interface LandmarkZone {
  id: string;
  name: string;
  x: number;
  y: number;
  defaultProduct: string;
  defaultUnit: 'Units' | 'mL';
  defaultDosage: number;
  category: 'Neurotoxin' | 'Dermal Filler';
}

const PRESET_LANDMARKS: LandmarkZone[] = [
  { id: 'forehead_mid', name: 'Frontalis / Forehead', x: 50, y: 22, defaultProduct: 'Botox® Cosmetic', defaultUnit: 'Units', defaultDosage: 12, category: 'Neurotoxin' },
  { id: 'glabella', name: 'Glabellar Complex (11s)', x: 50, y: 32, defaultProduct: 'Botox® Cosmetic', defaultUnit: 'Units', defaultDosage: 20, category: 'Neurotoxin' },
  { id: 'crows_feet_l', name: "Crow's Feet (Left)", x: 30, y: 36, defaultProduct: 'Botox® Cosmetic', defaultUnit: 'Units', defaultDosage: 10, category: 'Neurotoxin' },
  { id: 'crows_feet_r', name: "Crow's Feet (Right)", x: 70, y: 36, defaultProduct: 'Botox® Cosmetic', defaultUnit: 'Units', defaultDosage: 10, category: 'Neurotoxin' },
  { id: 'tear_trough_l', name: 'Tear Trough / Infraorbital (L)', x: 38, y: 41, defaultProduct: 'Restylane® Refyne', defaultUnit: 'mL', defaultDosage: 0.3, category: 'Dermal Filler' },
  { id: 'tear_trough_r', name: 'Tear Trough / Infraorbital (R)', x: 62, y: 41, defaultProduct: 'Restylane® Refyne', defaultUnit: 'mL', defaultDosage: 0.3, category: 'Dermal Filler' },
  { id: 'cheek_apex_l', name: 'Zygomatic Cheek Apex (L)', x: 33, y: 49, defaultProduct: 'Juvéderm® Voluma XC', defaultUnit: 'mL', defaultDosage: 0.5, category: 'Dermal Filler' },
  { id: 'cheek_apex_r', name: 'Zygomatic Cheek Apex (R)', x: 67, y: 49, defaultProduct: 'Juvéderm® Voluma XC', defaultUnit: 'mL', defaultDosage: 0.5, category: 'Dermal Filler' },
  { id: 'nasolabial_l', name: 'Nasolabial Fold (L)', x: 42, y: 58, defaultProduct: 'Juvéderm® Ultra Plus', defaultUnit: 'mL', defaultDosage: 0.5, category: 'Dermal Filler' },
  { id: 'nasolabial_r', name: 'Nasolabial Fold (R)', x: 58, y: 58, defaultProduct: 'Juvéderm® Ultra Plus', defaultUnit: 'mL', defaultDosage: 0.5, category: 'Dermal Filler' },
  { id: 'lips_vermilion', name: 'Vermilion Border & Body (Lips)', x: 50, y: 69, defaultProduct: 'Restylane® Kysse', defaultUnit: 'mL', defaultDosage: 0.8, category: 'Dermal Filler' },
  { id: 'marionette_l', name: 'Marionette Line (L)', x: 41, y: 76, defaultProduct: 'Juvéderm® Ultra Plus', defaultUnit: 'mL', defaultDosage: 0.4, category: 'Dermal Filler' },
  { id: 'marionette_r', name: 'Marionette Line (R)', x: 59, y: 76, defaultProduct: 'Juvéderm® Ultra Plus', defaultUnit: 'mL', defaultDosage: 0.4, category: 'Dermal Filler' },
  { id: 'jawline_l', name: 'Mandibular Angle / Jawline (L)', x: 26, y: 74, defaultProduct: 'Juvéderm® Volux XC', defaultUnit: 'mL', defaultDosage: 0.8, category: 'Dermal Filler' },
  { id: 'jawline_r', name: 'Mandibular Angle / Jawline (R)', x: 74, y: 74, defaultProduct: 'Juvéderm® Volux XC', defaultUnit: 'mL', defaultDosage: 0.8, category: 'Dermal Filler' },
];

export const FacialMappingModal: React.FC<FacialMappingModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onSaved,
}) => {
  const [points, setPoints] = useState<InjectionPoint[]>([]);
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'visual' | 'table'>('visual');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [injectorName, setInjectorName] = useState('Chloe Rivera, NP');

  // Load existing chart for this appointment if available
  useEffect(() => {
    if (appointment && isOpen) {
      setInjectorName(appointment.staffName || 'Chloe Rivera, NP');
      const existing = StorageService.getFacialChartByAppointment(appointment.id);
      if (existing) {
        setPoints(existing.points);
        setClinicalNotes(existing.clinicalNotes || '');
      } else {
        // If it is Sophia's initial appointment, seed with realistic points
        if (appointment.clientEmail === 'sophia.laurent@gmail.com') {
          const defaultSophiaPoints: InjectionPoint[] = [
            {
              id: 'pt_init_1',
              zoneId: 'glabella',
              zoneName: 'Glabellar Complex (11s)',
              x: 50,
              y: 32,
              product: 'Botox® Cosmetic',
              dosage: 20,
              unit: 'Units',
              notes: 'Corrugator & procerus deep intramuscular injection.',
            },
            {
              id: 'pt_init_2',
              zoneId: 'crows_feet_l',
              zoneName: "Crow's Feet (Left)",
              x: 30,
              y: 36,
              product: 'Botox® Cosmetic',
              dosage: 10,
              unit: 'Units',
              notes: 'Subdermal lateral wheal.',
            },
            {
              id: 'pt_init_3',
              zoneId: 'crows_feet_r',
              zoneName: "Crow's Feet (Right)",
              x: 70,
              y: 36,
              product: 'Botox® Cosmetic',
              dosage: 10,
              unit: 'Units',
              notes: 'Subdermal lateral wheal.',
            },
            {
              id: 'pt_init_4',
              zoneId: 'cheek_apex_l',
              zoneName: 'Zygomatic Cheek Apex (L)',
              x: 33,
              y: 49,
              product: 'Juvéderm® Voluma XC',
              dosage: 0.5,
              unit: 'mL',
              notes: 'Supra-periosteal bolus for lateral cheek lift.',
            },
            {
              id: 'pt_init_5',
              zoneId: 'cheek_apex_r',
              zoneName: 'Zygomatic Cheek Apex (R)',
              x: 67,
              y: 49,
              product: 'Juvéderm® Voluma XC',
              dosage: 0.5,
              unit: 'mL',
              notes: 'Supra-periosteal bolus for lateral cheek lift.',
            },
          ];
          setPoints(defaultSophiaPoints);
          setClinicalNotes('Patient responded well. Applied cold compress and LED light.');
        } else {
          setPoints([]);
          setClinicalNotes('');
        }
      }
    }
  }, [appointment, isOpen]);

  if (!isOpen || !appointment) return null;

  const handleAddLandmark = (landmark: LandmarkZone) => {
    // Check if point already exists in this zone
    const existing = points.find((p) => p.zoneId === landmark.id);
    if (existing) {
      setSelectedPointId(existing.id);
      return;
    }

    const newPt: InjectionPoint = {
      id: `inj_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      zoneId: landmark.id,
      zoneName: landmark.name,
      x: landmark.x,
      y: landmark.y,
      product: landmark.defaultProduct,
      dosage: landmark.defaultDosage,
      unit: landmark.defaultUnit,
      notes: `${landmark.category} injection per clinical protocol.`,
    };

    setPoints((prev) => [...prev, newPt]);
    setSelectedPointId(newPt.id);
  };

  const handleRemovePoint = (id: string) => {
    setPoints((prev) => prev.filter((p) => p.id !== id));
    if (selectedPointId === id) setSelectedPointId(null);
  };

  const handleUpdatePoint = (id: string, updates: Partial<InjectionPoint>) => {
    setPoints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const totalBotoxUnits = points
    .filter((p) => p.unit === 'Units')
    .reduce((sum, p) => sum + Number(p.dosage || 0), 0);

  const totalFillerMl = points
    .filter((p) => p.unit === 'mL')
    .reduce((sum, p) => sum + Number(p.dosage || 0), 0);

  const handleSaveChart = () => {
    const record: FacialChartRecord = {
      id: `fchart_${appointment.id}`,
      appointmentId: appointment.id,
      clientName: appointment.clientName,
      clientEmail: appointment.clientEmail,
      serviceName: appointment.serviceName,
      date: appointment.date,
      injectorName,
      points,
      totalBotoxUnits,
      totalFillerMl: Number(totalFillerMl.toFixed(2)),
      clinicalNotes,
    };

    StorageService.saveFacialChart(record);
    if (onSaved) onSaved(record);
    onClose();
  };

  const selectedPoint = points.find((p) => p.id === selectedPointId);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-4xl bg-[#0D131F] border border-[#C5A880]/40 rounded-2xl shadow-2xl p-5 sm:p-7 text-slate-100 my-6 space-y-6 animate-scale-up max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A880] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Anatomical Dermal Charting • Clinical OS</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
              Facial Injection Mapping & Dosage
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Patient: <strong className="text-white">{appointment.clientName}</strong> • Procedure: <strong className="text-[#E2CFB6]">{appointment.serviceName}</strong> • Date: <strong className="text-white">{appointment.date}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto flex-1 pr-1">
          
          {/* LEFT: Interactive Anatomical Facial Canvas (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950/70 border border-slate-800 rounded-2xl p-4 relative min-h-[380px]">
            
            <div className="w-full flex items-center justify-between text-xs mb-2 px-1">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                Frontal Craniofacial View
              </span>
              <span className="text-[11px] text-slate-400">Click landmarks to add or adjust dose</span>
            </div>

            {/* SVG Anatomical Face Graphic */}
            <div className="relative w-full max-w-[340px] aspect-[3/4] flex items-center justify-center select-none">
              
              <svg
                viewBox="0 0 300 400"
                className="w-full h-full drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 0 12px rgba(197,168,128,0.08))' }}
              >
                {/* Face Outline */}
                <path
                  d="M150,40 C90,40 60,85 58,160 C56,220 70,270 95,320 C115,355 135,370 150,370 C165,370 185,355 205,320 C230,270 244,220 242,160 C240,85 210,40 150,40 Z"
                  fill="#111827"
                  stroke="#334155"
                  strokeWidth="2.5"
                />

                {/* Eyebrows */}
                <path d="M90,130 Q110,120 135,127" fill="none" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
                <path d="M210,130 Q190,120 165,127" fill="none" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />

                {/* Eyes */}
                <ellipse cx="112" cy="148" rx="18" ry="9" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                <ellipse cx="188" cy="148" rx="18" ry="9" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                <circle cx="112" cy="148" r="4" fill="#C5A880" />
                <circle cx="188" cy="148" r="4" fill="#C5A880" />

                {/* Nose */}
                <path d="M150,140 L150,210 Q145,225 138,225 M150,225 Q155,225 162,225" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

                {/* Lips */}
                <path d="M125,270 Q150,263 175,270 Q150,285 125,270 Z" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
                <path d="M128,270 Q150,274 172,270" fill="none" stroke="#C5A880" strokeWidth="1" />

                {/* Jaw contour subtle guides */}
                <path d="M75,260 Q105,310 150,335 Q195,310 225,260" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />

                {/* Cheekbones subtle guide */}
                <path d="M78,195 Q105,215 130,225" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
                <path d="M222,195 Q195,215 170,225" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
              </svg>

              {/* Landmark Preset Target Zones */}
              {PRESET_LANDMARKS.map((lm) => {
                const isSelected = points.some((p) => p.zoneId === lm.id);
                const activePt = points.find((p) => p.zoneId === lm.id);

                return (
                  <button
                    key={lm.id}
                    type="button"
                    onClick={() => handleAddLandmark(lm)}
                    style={{ left: `${lm.x}%`, top: `${lm.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer group flex items-center justify-center ${
                      isSelected
                        ? lm.category === 'Neurotoxin'
                          ? 'w-7 h-7 rounded-full bg-blue-500/90 text-white font-bold text-[10px] shadow-lg shadow-blue-500/40 ring-2 ring-white scale-110 z-20'
                          : 'w-7 h-7 rounded-full bg-[#C5A880] text-[#0B0F19] font-bold text-[10px] shadow-lg shadow-[#C5A880]/40 ring-2 ring-white scale-110 z-20'
                        : 'w-4 h-4 rounded-full bg-slate-800/80 hover:bg-[#C5A880]/50 border border-slate-600 hover:scale-125 z-10'
                    }`}
                    title={`${lm.name} (${lm.category})`}
                  >
                    {isSelected ? (
                      activePt?.dosage
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-white" />
                    )}

                    {/* Tooltip on Hover */}
                    <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-slate-100 text-[10px] py-0.5 px-2 rounded-md border border-slate-700 shadow-xl transition-opacity z-30">
                      {lm.name}
                    </div>
                  </button>
                );
              })}

            </div>

            {/* Visual Legend */}
            <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80 w-full justify-center">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm" />
                <span>Neurotoxin / Botox (Units)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#C5A880] shadow-sm" />
                <span>Dermal Filler (mL)</span>
              </span>
            </div>

          </div>

          {/* RIGHT: Injection Dosage Controls & Notes (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Live Totals Card */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="space-y-0.5">
                <div className="text-[10px] uppercase font-semibold text-blue-400">Total Neurotoxin</div>
                <div className="text-xl font-bold font-serif-luxury text-white">
                  {totalBotoxUnits} <span className="text-xs font-sans text-slate-400 font-normal">Units</span>
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] uppercase font-semibold text-[#C5A880]">Total Dermal Filler</div>
                <div className="text-xl font-bold font-serif-luxury text-white">
                  {totalFillerMl.toFixed(2)} <span className="text-xs font-sans text-slate-400 font-normal">mL</span>
                </div>
              </div>
            </div>

            {/* List of Marked Injections */}
            <div className="space-y-2 flex-1 overflow-y-auto max-h-[220px] pr-1">
              <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Active Injection Sites ({points.length}):</span>
                {points.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setPoints([])}
                    className="text-[10px] text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {points.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800/60 p-4">
                  <AlertCircle className="w-5 h-5 mx-auto mb-1 text-slate-600" />
                  Click any point on the facial map to prescribe injection dose.
                </div>
              ) : (
                points.map((pt) => {
                  const isCurSelected = pt.id === selectedPointId;
                  return (
                    <div
                      key={pt.id}
                      onClick={() => setSelectedPointId(pt.id)}
                      className={`p-2.5 rounded-xl border transition-all text-xs space-y-2 cursor-pointer ${
                        isCurSelected
                          ? 'bg-slate-800/90 border-[#C5A880]'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white truncate max-w-[180px]">
                          {pt.zoneName}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemovePoint(pt.id);
                          }}
                          className="text-slate-500 hover:text-rose-400 p-0.5 rounded transition-colors"
                          title="Delete Site"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Controls inside item */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">Product</label>
                          <select
                            value={pt.product}
                            onChange={(e) => handleUpdatePoint(pt.id, { product: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none"
                          >
                            <option value="Botox® Cosmetic">Botox® Cosmetic</option>
                            <option value="Dysport®">Dysport®</option>
                            <option value="Juvéderm® Voluma XC">Juvéderm® Voluma XC</option>
                            <option value="Juvéderm® Ultra Plus">Juvéderm® Ultra Plus</option>
                            <option value="Restylane® Kysse">Restylane® Kysse</option>
                            <option value="Restylane® Refyne">Restylane® Refyne</option>
                            <option value="Sculptra® Aesthetic">Sculptra® Aesthetic</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">
                            Dose ({pt.unit})
                          </label>
                          <input
                            type="number"
                            step={pt.unit === 'mL' ? '0.1' : '1'}
                            min="0"
                            value={pt.dosage}
                            onChange={(e) =>
                              handleUpdatePoint(pt.id, { dosage: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-white font-mono focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Clinical Progress Notes */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Clinical Injector Notes & Reaction:
              </label>
              <textarea
                rows={2}
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                placeholder="E.g., No immediate erythema, arnica applied, patient instructed on post-op posture..."
                className="w-full rounded-xl bg-slate-950 border border-slate-700 p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleSaveChart}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-[#0B0F19] bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] hover:brightness-110 transition-all shadow-lg shadow-[#C5A880]/20 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Save Anatomical Chart</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
