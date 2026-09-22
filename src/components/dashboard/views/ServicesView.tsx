import React, { useState } from 'react';
import { StorageService, subscribeToStorageChanges } from '../../../services/storage';
import { ServiceItem } from '../../../types';
import { Sparkles, Clock, Edit2, Check, Plus, DollarSign } from 'lucide-react';

export const ServicesView: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>(() => StorageService.getServices());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editDuration, setEditDuration] = useState<number>(0);

  const startEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setEditPrice(service.price);
    setEditDuration(service.durationMinutes);
  };

  const saveEdit = (service: ServiceItem) => {
    const updated = {
      ...service,
      price: editPrice,
      durationMinutes: editDuration,
    };
    StorageService.saveService(updated);
    setServices(StorageService.getServices());
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Clinical Treatment Menu & Price Catalog
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure procedure pricing, estimated clinical suite durations, and package recommendations.
          </p>
        </div>
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const isEditing = editingId === service.id;
          return (
            <div
              key={service.id}
              className="glass-card bg-[#111827]/80 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C5A880] px-2 py-0.5 rounded bg-[#C5A880]/15">
                      {service.category}
                    </span>
                    <h3 className="font-serif-luxury text-lg font-bold text-white mt-2">
                      {service.name}
                    </h3>
                  </div>

                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => startEdit(service)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                      title="Edit Price & Duration"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => saveEdit(service)}
                      className="p-1.5 rounded-lg text-emerald-400 hover:text-emerald-300 bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors"
                      title="Save Changes"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                  {service.description}
                </p>
              </div>

              {/* Price & Duration section */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                {isEditing ? (
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex-1">
                      <label className="block text-[10px] text-slate-400 mb-0.5">Price ($)</label>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                        className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[10px] text-slate-400 mb-0.5">Duration (mins)</label>
                      <input
                        type="number"
                        value={editDuration}
                        onChange={(e) => setEditDuration(Number(e.target.value))}
                        className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{service.durationMinutes} Minutes</span>
                    </div>
                    <div className="text-lg font-bold font-serif-luxury text-white">
                      ${service.price}
                    </div>
                  </>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
