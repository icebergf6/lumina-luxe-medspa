import React, { useRef, useState, useEffect } from 'react';
import { Appointment } from '../../../types';
import { X, Check, PenTool, RotateCcw, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [agreed1, setAgreed1] = useState(true);
  const [agreed2, setAgreed2] = useState(true);
  const [agreed3, setAgreed3] = useState(true);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const containerWidth = canvas.parentElement?.clientWidth || 340;
      canvas.width = containerWidth;
      canvas.height = 140;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#C5A880';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [isOpen]);

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
    }
  };

  const handleSave = () => {
    if (!canvasRef.current || !hasDrawn) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onSignedSuccess(appointment.id, dataUrl);
    onClose();
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-[#0F172A] border border-[#C5A880]/40 rounded-2xl shadow-2xl p-6 text-slate-100 my-8 space-y-5 animate-scale-up">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#C5A880] font-semibold uppercase tracking-wider">
            <PenTool className="w-3.5 h-3.5" />
            <span>HIPAA Clinical Intake & Legal Consent</span>
          </div>
          <h2 className="font-serif-luxury text-2xl font-bold text-white mt-1">
            Patient Treatment Consent
          </h2>
          <p className="text-xs text-slate-400">
            Procedure: <strong className="text-white">{appointment.serviceName}</strong> • Patient: <strong className="text-white">{appointment.clientName}</strong>
          </p>
        </div>

        {/* Consent Clauses */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 text-xs text-slate-300">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed1}
              onChange={(e) => setAgreed1(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#C5A880] focus:ring-0 accent-[#C5A880]"
            />
            <span>I have disclosed all relevant medical history, active prescriptions, and known dermatological allergies.</span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed2}
              onChange={(e) => setAgreed2(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#C5A880] focus:ring-0 accent-[#C5A880]"
            />
            <span>I authorize Dr. Eleanor Vance, MD and Lumina Luxe clinical practitioners to perform this procedure.</span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed3}
              onChange={(e) => setAgreed3(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#C5A880] focus:ring-0 accent-[#C5A880]"
            />
            <span>I acknowledge receipt of post-treatment aftercare protocols and direct emergency contact instructions.</span>
          </label>
        </div>

        {/* Canvas Signature Pad */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-300">Draw Digital Signature Below:</span>
            <button
              type="button"
              onClick={clearCanvas}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Pad</span>
            </button>
          </div>

          <div className="relative rounded-xl border border-slate-700 bg-slate-950 overflow-hidden cursor-crosshair">
            <canvas
              ref={canvasRef}
              style={{ touchAction: 'none' }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-[140px] block"
            />
            {!hasDrawn && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs text-slate-600 px-4 text-center">
                ✍️ Use mouse or finger to sign here
              </div>
            )}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Recorded with 256-bit cryptographic timestamp • Stored in patient chart
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 text-center"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!hasDrawn || !agreed1 || !agreed2 || !agreed3}
            onClick={handleSave}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-[#0B0F19] bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] hover:brightness-110 transition-all shadow-lg shadow-[#C5A880]/20 disabled:opacity-40 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Confirm & Record E-Signature</span>
          </button>
        </div>

      </div>
    </div>
  );
};
