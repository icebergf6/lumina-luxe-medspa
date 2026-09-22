import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { StorageService } from '../../../services/storage';
import { ServiceItem, StaffMember } from '../../../types';
import { X, Calendar, Clock, User, Sparkles, Check, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, preselectedServiceId }) => {
  const { user, role, goToDashboard, bookingServiceId } = useAuth();
  const services = StorageService.getServices();
  const staffMembers = StorageService.getStaff();

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || bookingServiceId || services[0]?.id || ''
  );

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    } else if (bookingServiceId) {
      setSelectedServiceId(bookingServiceId);
    }
  }, [isOpen, preselectedServiceId, bookingServiceId]);
  const [selectedStaffId, setSelectedStaffId] = useState<string>(staffMembers[0]?.id || '');
  
  // Date & Time
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [date, setDate] = useState<string>(tomorrowStr);
  const [timeSlot, setTimeSlot] = useState<string>('11:00 AM');

  // Client Info (pre-filled if logged in as client)
  const [clientName, setClientName] = useState<string>(role === 'client' ? user.name : 'Sophia Laurent');
  const [clientEmail, setClientEmail] = useState<string>(role === 'client' ? user.email : 'sophia.laurent@gmail.com');
  const [clientPhone, setClientPhone] = useState<string>(user.phone || '+1 (424) 521-9870');
  const [notes, setNotes] = useState<string>('First consultation & skin contour assessment.');
  const [payNow, setPayNow] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const selectedService = services.find((s: ServiceItem) => s.id === selectedServiceId) || services[0];
  const selectedStaff = staffMembers.find((st: StaffMember) => st.id === selectedStaffId) || staffMembers[0];

  const availableTimeSlots = [
    '09:30 AM',
    '11:00 AM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      StorageService.createAppointment({
        clientName,
        clientEmail,
        clientPhone,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        staffId: selectedStaff.id,
        staffName: selectedStaff.name,
        date,
        time: timeSlot,
        durationMinutes: selectedService.durationMinutes,
        price: selectedService.price,
        status: 'confirmed',
        notes,
        paymentStatus: payNow ? 'paid' : 'unpaid',
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A880', '#E2CFB6', '#10B981'],
        });
      } catch (err) {
        console.error(err);
      }

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        goToDashboard('appointments');
      }, 1800);
    }, 600);
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-2xl bg-[#0F172A] border border-[#C5A880]/30 rounded-2xl shadow-2xl p-4 sm:p-8 my-4 sm:my-8 max-h-[92vh] overflow-y-auto text-slate-100 animate-scale-up">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              Appointment Confirmed!
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Your session for <span className="text-[#C5A880] font-semibold">{selectedService.name}</span> with{' '}
              <span className="text-white font-medium">{selectedStaff.name}</span> on{' '}
              <span className="text-white font-medium">{date} at {timeSlot}</span> has been scheduled and recorded in the database.
            </p>
            <p className="text-xs text-slate-400">
              Redirecting to Dashboard Appointments view...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Concierge Scheduling</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
                Book Clinical Appointment
              </h2>
              <p className="text-xs text-slate-400">
                Data persists immediately to LocalStorage and creates an invoice automatically.
              </p>
            </div>

            {/* Step 1: Select Service */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                1. Select Treatment Procedure
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
                {services.map((srv: ServiceItem) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                      selectedServiceId === srv.id
                        ? 'bg-[#1E293B] border-[#C5A880] text-white shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="font-semibold truncate">{srv.name}</div>
                      <div className="text-[10px] text-slate-400">{srv.durationMinutes} mins • {srv.category}</div>
                    </div>
                    <div className="font-serif-luxury font-bold text-[#E2CFB6] whitespace-nowrap">
                      ${srv.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Select Specialist */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                2. Select Attending Specialist
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {staffMembers.map((stf: StaffMember) => (
                  <div
                    key={stf.id}
                    onClick={() => setSelectedStaffId(stf.id)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all text-center ${
                      selectedStaffId === stf.id
                        ? 'bg-[#1E293B] border-[#C5A880] text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={stf.avatar}
                      alt={stf.name}
                      className="w-10 h-10 rounded-full mx-auto object-cover mb-1.5 border border-[#C5A880]/30"
                    />
                    <div className="text-xs font-semibold text-white truncate">{stf.name.split(',')[0]}</div>
                    <div className="text-[10px] text-slate-400 truncate">{stf.role.replace('_', ' ')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  3. Select Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Available Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                >
                  {availableTimeSlots.map((ts) => (
                    <option key={ts} value={ts}>
                      {ts}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 4: Patient Details */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                4. Patient Information & Notes
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Clinical or Treatment Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Skin sensitivities, focus areas, travel schedule"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              {/* Payment toggle */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={payNow}
                    onChange={(e) => setPayNow(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C5A880] focus:ring-0 accent-[#C5A880]"
                  />
                  <span>Mark as Paid upon booking (Simulate Stripe Card on File)</span>
                </label>
                <span className="font-serif-luxury font-bold text-sm text-[#E2CFB6] self-end sm:self-auto">
                  Total: ${selectedService.price}
                </span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-[#0B0F19] bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] hover:brightness-110 transition-all shadow-lg shadow-[#C5A880]/20 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm & Schedule Visit</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
