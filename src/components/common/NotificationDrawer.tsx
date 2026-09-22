import React, { useState, useEffect } from 'react';
import { Bell, MessageSquare, Mail, X, CheckCircle, Sparkles, Send } from 'lucide-react';
import { subscribeToStorageChanges, StorageService } from '../../services/storage';

export interface DispatchedNotification {
  id: string;
  type: 'sms' | 'email' | 'system';
  recipient: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'delivered' | 'read';
}

const INITIAL_NOTIFICATIONS: DispatchedNotification[] = [
  {
    id: 'notif_1',
    type: 'sms',
    recipient: '+1 (424) 521-9870 (Sophia Laurent)',
    subject: 'Automated 24h Reminder',
    message: 'Lumina Luxe MedSpa: Hi Sophia, your HydraFacial Deluxe is scheduled tomorrow at 11:00 AM with Chloe Rivera, NP. Reply YES to confirm.',
    timestamp: '10 mins ago',
    status: 'delivered',
  },
  {
    id: 'notif_2',
    type: 'email',
    recipient: 'alex.sterling@vanguard.io',
    subject: 'Clinical Pre-Care Instructions',
    message: 'Your Morpheus8 RF Microneedling session is confirmed for today at 02:00 PM. Please arrive 30 mins early for topical numbing protocol.',
    timestamp: '1 hour ago',
    status: 'delivered',
  },
  {
    id: 'notif_3',
    type: 'sms',
    recipient: '+1 (310) 902-4412 (Alexander Sterling)',
    subject: 'Stripe Payment Confirmed',
    message: 'Lumina Luxe: Payment of $1,314.00 received for INV-2026-090. Your receipt is now accessible in your VIP Patient Portal.',
    timestamp: '2 hours ago',
    status: 'delivered',
  },
];

export const NotificationDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<DispatchedNotification[]>(() => {
    const saved = localStorage.getItem('lumina_dispatched_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto trigger notifications on storage changes (e.g. appointment or payment)
  useEffect(() => {
    const unsub = subscribeToStorageChanges(() => {
      const appointments = StorageService.getAppointments();
      const latest = appointments[0];
      if (latest) {
        const newNotif: DispatchedNotification = {
          id: `notif_${Date.now()}`,
          type: 'sms',
          recipient: `${latest.clientPhone} (${latest.clientName})`,
          subject: 'Appointment Confirmed & Dispatched',
          message: `Lumina Luxe: Appointment confirmed for ${latest.serviceName} on ${latest.date} at ${latest.time} with ${latest.staffName}.`,
          timestamp: 'Just now',
          status: 'delivered',
        };

        setNotifications((prev) => {
          const updated = [newNotif, ...prev.slice(0, 8)];
          localStorage.setItem('lumina_dispatched_notifs', JSON.stringify(updated));
          return updated;
        });

        // Trigger transient toast
        setToastMessage(`📲 Dispatched SMS: ${latest.clientName} confirmed for ${latest.serviceName}`);
        setTimeout(() => setToastMessage(null), 4000);
      }
    });

    return unsub;
  }, []);

  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem('lumina_dispatched_notifs');
  };

  const triggerTestSMS = () => {
    const testNotif: DispatchedNotification = {
      id: `notif_${Date.now()}`,
      type: 'sms',
      recipient: '+1 (424) 521-9870 (VIP Patient)',
      subject: 'Automated Twilio/Telnyx SMS Mock',
      message: 'Lumina Luxe Beverly Hills: Reminder for your Sculptra Biostimulator follow-up appointment this Friday at 10:30 AM.',
      timestamp: 'Just now',
      status: 'delivered',
    };
    setNotifications((prev) => [testNotif, ...prev]);
    setToastMessage('📲 Test SMS dispatched to patient!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <>
      {/* Transient Notification Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 glass-panel bg-[#111827]/95 border border-[#C5A880]/40 text-slate-100 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs max-w-md animate-bounce">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="flex-1 font-medium">{toastMessage}</div>
        </div>
      )}

      {/* Floating Bell Trigger on bottom right (above role banner) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-16 sm:bottom-20 right-3 sm:right-6 z-40 p-2.5 sm:p-3 rounded-full bg-slate-900 border border-[#C5A880]/40 text-[#C5A880] shadow-2xl hover:scale-110 transition-all cursor-pointer flex items-center justify-center group"
        title="View Dispatched Automated SMS & Emails"
      >
        <Bell className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C5A880] text-[#0B0F19] text-[9px] sm:text-[10px] font-bold flex items-center justify-center shadow">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in"
        >
          <div className="w-full max-w-md bg-[#0F172A] border-l border-[#C5A880]/30 h-full p-5 sm:p-6 text-slate-100 flex flex-col justify-between shadow-2xl animate-fade-in-up">
            
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-lg font-bold text-white">
                      Automated Messaging Engine
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Twilio SMS & Resend Email Dispatch Ledger
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between py-3 border-b border-slate-800/80 text-xs">
                <button
                  type="button"
                  onClick={triggerTestSMS}
                  className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 font-medium"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Test SMS Reminder</span>
                </button>
                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-[11px] text-slate-500 hover:text-slate-300"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="mt-3 space-y-3 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-500">
                    No automated notifications dispatched yet. Book a visit or pay an invoice to trigger live alerts!
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-semibold text-white">
                          {n.type === 'sms' ? (
                            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                          ) : (
                            <Mail className="w-3.5 h-3.5 text-purple-400" />
                          )}
                          <span className="uppercase text-[10px] tracking-wider text-[#C5A880]">
                            {n.type.toUpperCase()} • {n.subject}
                          </span>
                        </span>
                        <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                      </div>

                      <div className="text-[11px] text-slate-400">
                        To: <span className="text-slate-300 font-medium">{n.recipient}</span>
                      </div>

                      <p className="text-[11px] text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800 leading-relaxed font-mono">
                        "{n.message}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
              Simulates production webhooks & automated multi-channel client messaging.
            </div>

          </div>
        </div>
      )}
    </>
  );
};
