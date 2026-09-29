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

interface NotificationDrawerProps {
  showFloatingButton?: boolean;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ showFloatingButton = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<DispatchedNotification[]>(() => {
    const saved = localStorage.getItem('lumina_dispatched_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global event listeners for header triggers
  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('toggle_notifications', handleToggle);
    window.addEventListener('open_notifications', handleOpen);
    window.addEventListener('close_notifications', handleClose);

    return () => {
      window.removeEventListener('toggle_notifications', handleToggle);
      window.removeEventListener('open_notifications', handleOpen);
      window.removeEventListener('close_notifications', handleClose);
    };
  }, []);

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
        <div className="fixed top-24 right-5 z-50 glass-panel bg-[#111827]/95 border border-[#C5A880]/40 text-slate-100 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs max-w-md animate-fade-in-up">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="flex-1 font-medium">{toastMessage}</div>
        </div>
      )}

      {/* Optional Floating Bell Trigger */}
      {showFloatingButton && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-24 right-4 z-40 p-3 rounded-full bg-slate-900 border border-[#C5A880]/40 text-[#C5A880] shadow-2xl hover:scale-110 transition-all cursor-pointer flex items-center justify-center group"
          title="View Dispatched Automated SMS & Emails"
        >
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C5A880] text-[#0B0F19] text-[10px] font-bold flex items-center justify-center shadow">
              {notifications.length}
            </span>
          )}
        </button>
      )}

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

              {/* Action Controls */}
              <div className="py-3 flex items-center justify-between gap-2 border-b border-slate-800/80">
                <button
                  type="button"
                  onClick={triggerTestSMS}
                  className="px-3 py-1.5 rounded-lg bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#E2CFB6] border border-[#C5A880]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3 h-3 text-[#C5A880]" />
                  <span>Send Test SMS</span>
                </button>

                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
                >
                  Clear History
                </button>
              </div>

              {/* Notification Message List */}
              <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    No dispatched communication records.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 hover:border-slate-700 transition-all text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {notif.type === 'sms' ? (
                            <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-semibold flex items-center gap-1">
                              <MessageSquare className="w-2.5 h-2.5" /> SMS
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-semibold flex items-center gap-1">
                              <Mail className="w-2.5 h-2.5" /> Email
                            </span>
                          )}
                          <span className="text-[11px] font-semibold text-slate-200">
                            {notif.subject}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
                      </div>

                      <div className="text-[11px] text-slate-400 font-mono">
                        To: {notif.recipient}
                      </div>

                      <p className="text-slate-300 text-xs font-light leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                        {notif.message}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-emerald-400 pt-1">
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Carrier Handshake Verified
                        </span>
                        <span className="text-slate-500">Latency: 42ms</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer Summary */}
            <div className="pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
              Simulated real-time automated clinic messaging layer
            </div>

          </div>
        </div>
      )}
    </>
  );
};
