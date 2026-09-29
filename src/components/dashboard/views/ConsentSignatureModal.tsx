import React, { useRef, useState, useEffect } from 'react';
import { Appointment } from '../../../types';
import { X, Check, PenTool, RotateCcw, ShieldCheck, Sparkles, AlertCircle, Type } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

interface ConsentSignatureModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onSignedSuccess: (appointmentId: string, signatureDataUrl: string) => void;
}

export const ConsentSignatureModal: React.FC<ConsentSignatureModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onSignedSuccess,
}) => {
  const { showToast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const [signatureMode, setSignatureMode] = useState<'draw' | 'type'>('draw');
  const [typedName, setTypedName] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [agreed1, setAgreed1] = useState(true);
  const [agreed2, setAgreed2] = useState(true);
  const [agreed3, setAgreed3] = useState(true);

  // Setup canvas
  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const containerWidth = canvas.parentElement?.clientWidth || 360;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = containerWidth * dpr;
      canvas.height = 140 * dpr;
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = '140px';
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = '#C5A880';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [isOpen, signatureMode]);

  // Focus trap & ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !appointment) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      setHasDrawn(false);
    }
  };

  const handleSave = () => {
    let signatureUrl = '';

    if (signatureMode === 'draw') {
      if (!canvasRef.current || !hasDrawn) {
        showToast('Please provide a handwritten signature or use the typed alternative.', 'error');
        return;
      }
      signatureUrl = canvasRef.current.toDataURL('image/png');
    } else {
      if (!typedName.trim()) {
        showToast('Please type your legal full name to sign.', 'error');
        return;
      }
      // Create off-screen canvas to render clean cursive signature
      const offCanvas = document.createElement('canvas');
      offCanvas.width = 400;
      offCanvas.height = 140;
      const ctx = offCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#111827';
        ctx.fillRect(0, 0, 400, 140);
        ctx.font = 'italic 34px "Cormorant Garamond", Georgia, serif';
        ctx.fillStyle = '#E2CFB6';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(typedName.trim(), 200, 70);
        signatureUrl = offCanvas.toDataURL('image/png');
      }
    }

    onSignedSuccess(appointment.id, signatureUrl);
    showToast(`Consent protocol signed for ${appointment.clientName}`, 'success');
    onClose();
  };

  const isSignReady = (signatureMode === 'draw' && hasDrawn) || (signatureMode === 'type' && typedName.trim().length > 1);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg glass-panel bg-[#0B0F19] rounded-2xl border border-[#C5A880]/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 flex items-center justify-center border border-[#C5A880]/30 text-[#C5A880]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 id="consent-modal-title" className="font-serif-luxury text-lg font-bold text-white">
                Digital Clinical Intake & Consent
              </h2>
              <div className="text-[11px] text-slate-400">
                Patient: <span className="text-white font-medium">{appointment.clientName}</span> • {appointment.serviceName}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Close consent signature modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          
          {/* Legal Consent Acknowledgements */}
          <div className="space-y-2.5">
            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed1}
                onChange={(e) => setAgreed1(e.target.checked)}
                className="mt-0.5 rounded text-[#C5A880] focus:ring-[#C5A880]"
              />
              <span className="text-slate-300 leading-relaxed text-[11px]">
                I acknowledge review of treatment contraindications, pre/post-care clinical directives, and expected transient erythema.
              </span>
            </label>

            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed2}
                onChange={(e) => setAgreed2(e.target.checked)}
                className="mt-0.5 rounded text-[#C5A880] focus:ring-[#C5A880]"
              />
              <span className="text-slate-300 leading-relaxed text-[11px]">
                I authorize photographic documentation for private clinical tracking and treatment charting within my electronic client file.
              </span>
            </label>

            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed3}
                onChange={(e) => setAgreed3(e.target.checked)}
                className="mt-0.5 rounded text-[#C5A880] focus:ring-[#C5A880]"
              />
              <span className="text-slate-300 leading-relaxed text-[11px]">
                I confirm no active dermal infections or contraindicative medications in the past 14 days.
              </span>
            </label>
          </div>

          {/* Signature Method Segmented Toggle */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Signature Verification
              </span>
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setSignatureMode('draw')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                    signatureMode === 'draw'
                      ? 'bg-[#C5A880] text-[#0B0F19] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <PenTool className="w-3 h-3" />
                  <span>Draw</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureMode('type')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                    signatureMode === 'type'
                      ? 'bg-[#C5A880] text-[#0B0F19] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Type className="w-3 h-3" />
                  <span>Type Name</span>
                </button>
              </div>
            </div>

            {signatureMode === 'draw' ? (
              <div className="space-y-2">
                <div className="relative rounded-xl border border-slate-700 bg-slate-950 overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full cursor-crosshair touch-none"
                  />
                  {!hasDrawn && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500 pointer-events-none text-xs font-light">
                      Sign with stylus or fingertip here
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Timestamp: {new Date().toLocaleTimeString()}</span>
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="text-[#C5A880] hover:text-[#E2CFB6] flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear Pad</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-700 space-y-3">
                  <label htmlFor="typed-signature-input" className="block text-[11px] text-slate-400">
                    Type full legal name below (renders electronic signature):
                  </label>
                  <input
                    id="typed-signature-input"
                    type="text"
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    placeholder="e.g. Sophia Laurent"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus-gold"
                  />
                  {typedName.trim() && (
                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block mb-1">Generated Signature Preview:</span>
                      <span className="font-serif-luxury text-2xl text-[#E2CFB6] italic font-semibold tracking-wide">
                        {typedName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-[11px] flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              Electronic signature legally records patient acknowledgment of informed clinical consent for portfolio demo records.
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between gap-3 bg-slate-900/50">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary px-4 py-2 text-xs"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!isSignReady || !agreed1 || !agreed2 || !agreed3}
            className="btn-gold px-5 py-2 text-xs font-semibold flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Execute & Sign Consent</span>
          </button>
        </div>

      </div>
    </div>
  );
};
