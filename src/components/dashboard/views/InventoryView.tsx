import React, { useState, useEffect } from 'react';
import { StorageService, subscribeToStorageChanges } from '../../../services/storage';
import { useCurrency } from '../../../context/CurrencyContext';
import { InventoryItem } from '../../../types';
import {
  Package,
  AlertTriangle,
  Plus,
  Search,
  CheckCircle2,
  TrendingDown,
  RotateCw,
  Sparkles,
  ShieldCheck,
  Building,
  Calendar,
  X,
  PlusCircle,
  MinusCircle,
  Truck,
} from 'lucide-react';

export const InventoryView: React.FC = () => {
  const { formatPrice } = useCurrency();
  const [inventory, setInventory] = useState<InventoryItem[]>(() => StorageService.getInventory());
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [restockModalItem, setRestockModalItem] = useState<InventoryItem | null>(null);
  const [restockAmount, setRestockAmount] = useState<number>(20);
  const [newBatchNumber, setNewBatchNumber] = useState<string>('');

  useEffect(() => {
    const unsub = subscribeToStorageChanges(() => {
      setInventory(StorageService.getInventory());
    });
    return unsub;
  }, []);

  const filtered = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventory.filter((item) => item.currentStock <= item.minimumThreshold);

  const totalValuationUSD = inventory.reduce(
    (sum, item) => sum + item.currentStock * item.costPerUnit,
    0
  );

  const handleQuickAdjust = (id: string, delta: number) => {
    const target = inventory.find((i) => i.id === id);
    if (target) {
      StorageService.updateInventoryStock(id, target.currentStock + delta);
    }
  };

  const handleConfirmRestock = () => {
    if (restockModalItem && restockAmount > 0) {
      StorageService.restockInventoryItem(
        restockModalItem.id,
        restockAmount,
        newBatchNumber || undefined
      );
      setRestockModalItem(null);
      setRestockAmount(20);
      setNewBatchNumber('');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A880] uppercase tracking-wider mb-1">
            <Package className="w-4 h-4 text-[#C5A880]" />
            <span>MedSpa Pharmacy & Clinical Consumables</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Inventory & Consumables Depletion
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time tracking of neurotoxins, dermal fillers, and RF cartridges with auto-deduction on procedure completion.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              if (inventory.length > 0) setRestockModalItem(inventory[0]);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-[#0B0F19] bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] hover:brightness-110 transition-all shadow-lg shadow-[#C5A880]/20 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Record Consignment Delivery</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Valuation */}
        <div className="glass-card bg-[#111827]/80 rounded-2xl p-5 border border-slate-800">
          <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            Total Inventory Value
          </div>
          <div className="text-2xl font-bold font-serif-luxury text-white mt-1">
            {formatPrice(totalValuationUSD)}
          </div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Asset value across all suites</div>
        </div>

        {/* Low Stock Warning */}
        <div className={`glass-card rounded-2xl p-5 border transition-all ${
          lowStockItems.length > 0
            ? 'bg-rose-950/20 border-rose-500/40'
            : 'bg-[#111827]/80 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Low Stock Alerts
            </span>
            {lowStockItems.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            )}
          </div>
          <div className={`text-2xl font-bold font-serif-luxury mt-1 ${
            lowStockItems.length > 0 ? 'text-rose-400' : 'text-white'
          }`}>
            {lowStockItems.length} Items Critical
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {lowStockItems.length > 0 ? 'Requires immediate reorder' : 'All stocks optimal'}
          </div>
        </div>

        {/* Total Active SKUs */}
        <div className="glass-card bg-[#111827]/80 rounded-2xl p-5 border border-slate-800">
          <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            Active Consumable SKUs
          </div>
          <div className="text-2xl font-bold font-serif-luxury text-white mt-1">
            {inventory.length} Verified Lines
          </div>
          <div className="text-[11px] text-[#E2CFB6] mt-0.5">Allergan, Galderma, InMode</div>
        </div>

        {/* Depletion Engine Status */}
        <div className="glass-card bg-[#111827]/80 rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Auto-Depletion Hook
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
              Active
            </span>
          </div>
          <div className="text-sm font-semibold text-slate-200 mt-2">
            Auto-Sync on Check-Out
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Deducts vials & tips on appointment completion
          </div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel bg-[#111827]/80 rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['all', 'Neurotoxin', 'Dermal Filler', 'Laser/RF Consumable', 'HydraFacial Tip', 'IV Wellness'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#C5A880] text-[#0B0F19] shadow'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="Search SKU, item name, or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#C5A880]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2 pointer-events-none" />
        </div>

      </div>

      {/* Inventory Table */}
      <div className="glass-panel bg-[#111827]/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Item & SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Current Stock</th>
                <th className="py-3.5 px-4">Unit Cost</th>
                <th className="py-3.5 px-4">Batch / Expiry</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filtered.map((item) => {
                const isLow = item.currentStock <= item.minimumThreshold;

                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Item & SKU */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{item.name}</div>
                      <div className="font-mono text-[10px] text-[#C5A880] mt-0.5">{item.sku}</div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[11px] text-slate-300">
                        {item.category}
                      </span>
                    </td>

                    {/* Current Stock */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold text-sm ${
                          isLow ? 'text-rose-400' : 'text-emerald-400'
                        }`}>
                          {item.currentStock}
                        </span>
                        <span className="text-[11px] text-slate-400 font-light">{item.unit}</span>
                        {isLow && (
                          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[9px] font-bold border border-rose-500/30">
                            LOW
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Min threshold: {item.minimumThreshold}
                      </div>
                    </td>

                    {/* Unit Cost */}
                    <td className="py-3 px-4 font-mono">
                      <div>{formatPrice(item.costPerUnit, true)}</div>
                      <div className="text-[10px] text-slate-500">
                        Total: {formatPrice(item.costPerUnit * item.currentStock)}
                      </div>
                    </td>

                    {/* Batch & Expiry */}
                    <td className="py-3 px-4 font-mono text-[11px]">
                      <div className="text-slate-200">{item.batchNumber}</div>
                      <div className="text-slate-400 text-[10px]">Exp: {item.expiryDate}</div>
                    </td>

                    {/* Supplier */}
                    <td className="py-3 px-4 text-slate-300">
                      <div>{item.supplier}</div>
                      <div className="text-[10px] text-slate-500">Restocked: {item.lastRestocked}</div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleQuickAdjust(item.id, -1)}
                          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                          title="Deduct 1 unit"
                        >
                          <MinusCircle className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleQuickAdjust(item.id, 1)}
                          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                          title="Add 1 unit"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setRestockModalItem(item)}
                          className="px-2.5 py-1 rounded-lg bg-[#C5A880]/20 hover:bg-[#C5A880]/30 text-[#E2CFB6] border border-[#C5A880]/40 text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          Restock
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Delivery Modal */}
      {restockModalItem && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setRestockModalItem(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative w-full max-w-md bg-[#0F172A] border border-[#C5A880]/40 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-4 animate-scale-up">
            
            <button
              type="button"
              onClick={() => setRestockModalItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#C5A880] font-semibold uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5" />
                <span>Consignment Intake Form</span>
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-white mt-1">
                Restock {restockModalItem.name}
              </h3>
              <p className="text-xs text-slate-400">
                SKU: <strong className="text-white">{restockModalItem.sku}</strong> • Current Stock: <strong className="text-emerald-400">{restockModalItem.currentStock} {restockModalItem.unit}</strong>
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Additional Units Received:
                </label>
                <input
                  type="number"
                  min="1"
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Manufacturer Batch Lot Number (Optional):
                </label>
                <input
                  type="text"
                  placeholder={restockModalItem.batchNumber}
                  value={newBatchNumber}
                  onChange={(e) => setNewBatchNumber(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
                New resulting stock after consignment intake: <strong className="text-white">{restockModalItem.currentStock + restockAmount} {restockModalItem.unit}</strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setRestockModalItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRestock}
                className="flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs text-[#0B0F19] bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] hover:brightness-110 transition-all shadow-lg shadow-[#C5A880]/20 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                <span>Confirm Consignment Receipt</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
