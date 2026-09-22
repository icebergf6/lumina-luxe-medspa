import React, { useState, useEffect } from 'react';
import { StorageService, subscribeToStorageChanges } from '../../../services/storage';
import { ClientRecord } from '../../../types';
import { Search, User, ShieldCheck, Heart, Sparkles, Phone, Mail, Calendar, DollarSign, Download } from 'lucide-react';

export const ClientsCRMView: React.FC = () => {
  const [clients, setClients] = useState<ClientRecord[]>(() => StorageService.getClients());
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);

  useEffect(() => {
    const unsub = subscribeToStorageChanges(() => {
      setClients(StorageService.getClients());
    });
    return unsub;
  }, []);

  const handleExportCSV = () => {
    const headers = ['ClientID,FullName,Email,Phone,LifetimeSpend,VisitsCount,SkinProfile,MemberSince,Notes'];
    const rows = clients.map((c) =>
      `"${c.id}","${c.name}","${c.email}","${c.phone}",${c.totalSpent},${c.visitsCount},"${c.skinType || 'N/A'}","${c.memberSince}","${(c.notes || '').replace(/"/g, '""')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `lumina_patient_roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const totalRevenueFromClients = clients.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgLTV = clients.length ? Math.round(totalRevenueFromClients / clients.length) : 0;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            VIP Patient Records & Clinical CRM
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track patient visit frequency, lifetime spend, dermal profiles, and medical notes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
            title="Download Patient CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Export Roster (CSV)</span>
          </button>

          {/* Search */}
          <div className="relative min-w-[220px]">
            <input
              type="text"
              placeholder="Search patient records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* CRM Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card bg-[#111827]/80 rounded-2xl p-4 border border-slate-800">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Patients</div>
          <div className="text-2xl font-bold text-white font-serif-luxury mt-1">{clients.length}</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">100% HIPAA Confidential Records</div>
        </div>

        <div className="glass-card bg-[#111827]/80 rounded-2xl p-4 border border-slate-800">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Avg. Lifetime Value (LTV)</div>
          <div className="text-2xl font-bold text-[#E2CFB6] font-serif-luxury mt-1">${avgLTV.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Across repeat aesthetic sessions</div>
        </div>

        <div className="glass-card bg-[#111827]/80 rounded-2xl p-4 border border-slate-800">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">VIP Membership Tier</div>
          <div className="text-2xl font-bold text-purple-300 font-serif-luxury mt-1">Lumina Noir</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Priority concierge booking enabled</div>
        </div>
      </div>

      {/* Mobile Client Card List (< sm screens) */}
      <div className="block sm:hidden space-y-3">
        {filtered.map((cli) => (
          <div
            key={cli.id}
            onClick={() => setSelectedClient(cli)}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 cursor-pointer hover:border-[#C5A880]/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C5A880]/20 flex items-center justify-center font-bold text-[#E2CFB6] border border-[#C5A880]/30 text-xs">
                  {cli.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white text-xs">{cli.name}</div>
                  <div className="text-[10px] text-slate-400">Since {cli.memberSince}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold text-[10px] border border-slate-700">
                {cli.visitsCount} Visits
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
              <div>
                <span className="text-[10px] text-slate-400 block">Total Spend:</span>
                <span className="font-serif-luxury font-bold text-white text-sm">
                  ${cli.totalSpent.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Skin Profile:</span>
                <span className="text-[#C5A880] text-[11px] font-medium">{cli.skinType || 'Standard'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <div className="text-slate-400 truncate max-w-[180px]">
                {cli.notes}
              </div>
              <button
                type="button"
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-[#C5A880] text-slate-300 hover:text-[#0B0F19] text-[10px] font-semibold transition-colors"
              >
                Chart →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Client List Table (>= sm screens) */}
      <div className="hidden sm:block glass-panel bg-[#111827]/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Total Spend</th>
                <th className="py-3.5 px-4">Visits</th>
                <th className="py-3.5 px-4">Skin Profile & Notes</th>
                <th className="py-3.5 px-4">Next Visit</th>
                <th className="py-3.5 px-4 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((cli) => (
                <tr
                  key={cli.id}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                  onClick={() => setSelectedClient(cli)}
                >
                  {/* Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#C5A880]/20 flex items-center justify-center font-bold text-[#E2CFB6] border border-[#C5A880]/30">
                        {cli.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-xs">{cli.name}</div>
                        <div className="text-[10px] text-slate-400">Patient since {cli.memberSince}</div>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-3.5 px-4">
                    <div className="text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{cli.email}</span>
                    </div>
                    <div className="text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-500" />
                      <span>{cli.phone}</span>
                    </div>
                  </td>

                  {/* Spend */}
                  <td className="py-3.5 px-4 font-serif-luxury font-bold text-white text-sm">
                    ${cli.totalSpent.toLocaleString()}
                  </td>

                  {/* Visits */}
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold text-[11px] border border-slate-700">
                      {cli.visitsCount} Visits
                    </span>
                  </td>

                  {/* Skin Notes */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="text-[11px] text-[#C5A880]">{cli.skinType || 'Standard'}</div>
                    <div className="text-[10px] text-slate-400 truncate">{cli.notes}</div>
                  </td>

                  {/* Next Visit */}
                  <td className="py-3.5 px-4">
                    {cli.nextAppointmentDate ? (
                      <span className="text-emerald-400 font-medium">{cli.nextAppointmentDate}</span>
                    ) : (
                      <span className="text-slate-500">None scheduled</span>
                    )}
                  </td>

                  {/* Profile Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-[11px]"
                    >
                      View Chart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0F172A] border border-[#C5A880]/30 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C5A880]/20 flex items-center justify-center font-bold text-[#E2CFB6] border border-[#C5A880]/30">
                  {selectedClient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white">{selectedClient.name}</h3>
                  <p className="text-xs text-slate-400">{selectedClient.email} • {selectedClient.phone}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedClient(null)}
                className="p-1 rounded text-slate-400 hover:text-white bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase tracking-wider">Total Lifetime Spend</div>
                <div className="text-lg font-bold font-serif-luxury text-[#E2CFB6] mt-0.5">
                  ${selectedClient.totalSpent.toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase tracking-wider">Completed Sessions</div>
                <div className="text-lg font-bold font-serif-luxury text-white mt-0.5">
                  {selectedClient.visitsCount} Visits
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-slate-300">Dermal & Fitzpatrick Profile: </span>
                <span className="text-slate-400">{selectedClient.skinType || 'Not specified'}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-300">Reported Allergies / Contraindications: </span>
                <span className="text-rose-300">{selectedClient.allergies || 'None reported'}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-300">Physician & Aesthetician Chart Notes: </span>
                <p className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 mt-1 leading-relaxed">
                  {selectedClient.notes}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                Close Chart
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
