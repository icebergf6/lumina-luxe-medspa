import {
  INITIAL_APPOINTMENTS,
  INITIAL_CLIENTS,
  INITIAL_FACIAL_CHARTS,
  INITIAL_INVENTORY,
  INITIAL_INVOICES,
  INITIAL_PROGRESS_MILESTONES,
  INITIAL_SERVICES,
  INITIAL_STAFF,
} from '../data/seedData';
import {
  Appointment,
  AppointmentStatus,
  ClientRecord,
  ClinicMetrics,
  FacialChartRecord,
  InventoryItem,
  Invoice,
  PersonalProgressMilestone,
  ServiceItem,
  StaffMember,
} from '../types';

const STORAGE_KEYS = {
  APPOINTMENTS: 'lumina_appointments_v1',
  SERVICES: 'lumina_services_v1',
  STAFF: 'lumina_staff_v1',
  INVOICES: 'lumina_invoices_v1',
  CLIENTS: 'lumina_clients_v1',
  INVENTORY: 'lumina_inventory_v1',
  FACIAL_CHARTS: 'lumina_facial_charts_v1',
  MILESTONES: 'lumina_milestones_v1',
};

type ChangeListener = () => void;
const listeners: Set<ChangeListener> = new Set();

const notifyListeners = () => {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error('Listener callback error', e);
    }
  });
};

export const subscribeToStorageChanges = (listener: ChangeListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const StorageService = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
      this.resetToDefaults();
    }
    if (!localStorage.getItem(STORAGE_KEYS.INVENTORY)) {
      localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(INITIAL_INVENTORY));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FACIAL_CHARTS)) {
      localStorage.setItem(STORAGE_KEYS.FACIAL_CHARTS, JSON.stringify(INITIAL_FACIAL_CHARTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MILESTONES)) {
      localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(INITIAL_PROGRESS_MILESTONES));
    }
  },

  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(INITIAL_INVOICES));
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(INITIAL_CLIENTS));
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(INITIAL_INVENTORY));
    localStorage.setItem(STORAGE_KEYS.FACIAL_CHARTS, JSON.stringify(INITIAL_FACIAL_CHARTS));
    localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(INITIAL_PROGRESS_MILESTONES));
    notifyListeners();
  },

  // Appointments
  getAppointments(): Appointment[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return data ? JSON.parse(data) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  },

  createAppointment(apt: Omit<Appointment, 'id' | 'createdAt' | 'invoiceId'>): Appointment {
    const list = this.getAppointments();
    const newId = `apt_${Date.now()}`;
    const invoiceNumber = `INV-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newInvoiceId = `inv_${Date.now()}`;

    const newAppointment: Appointment = {
      ...apt,
      id: newId,
      invoiceId: newInvoiceId,
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Auto-generate invoice for this appointment
    const newInvoice: Invoice = {
      id: newInvoiceId,
      invoiceNumber,
      appointmentId: newId,
      clientName: apt.clientName,
      clientEmail: apt.clientEmail,
      serviceName: apt.serviceName,
      date: apt.date,
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      amount: apt.price,
      tax: Number((apt.price * 0.095).toFixed(2)),
      total: Number((apt.price * 1.095).toFixed(2)),
      status: apt.paymentStatus === 'paid' ? 'paid' : 'pending',
      paymentMethod: apt.paymentStatus === 'paid' ? 'Card on File •••• 4242' : undefined,
      paidAt: apt.paymentStatus === 'paid' ? `${apt.date} ${apt.time}` : undefined,
    };

    list.unshift(newAppointment);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(list));

    const invoices = this.getInvoices();
    invoices.unshift(newInvoice);
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));

    // Update or insert client CRM record
    this.upsertClientRecord(apt.clientName, apt.clientEmail, apt.clientPhone, apt.price, apt.date);

    notifyListeners();
    return newAppointment;
  },

  updateAppointmentStatus(id: string, status: AppointmentStatus) {
    const list = this.getAppointments();
    const idx = list.findIndex((a) => a.id === id);
    if (idx !== -1) {
      const prevStatus = list[idx].status;
      list[idx].status = status;
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(list));

      // Auto-deplete inventory consumables upon procedure completion
      if (status === 'completed' && prevStatus !== 'completed') {
        this.autoDepleteForAppointment(list[idx]);
      }

      notifyListeners();
    }
  },

  deleteAppointment(id: string) {
    const list = this.getAppointments().filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(list));
    notifyListeners();
  },

  // Services
  getServices(): ServiceItem[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return data ? JSON.parse(data) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  },

  saveService(service: ServiceItem) {
    const list = this.getServices();
    const idx = list.findIndex((s) => s.id === service.id);
    if (idx !== -1) {
      list[idx] = service;
    } else {
      list.push(service);
    }
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(list));
    notifyListeners();
  },

  // Staff
  getStaff(): StaffMember[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STAFF);
      return data ? JSON.parse(data) : INITIAL_STAFF;
    } catch {
      return INITIAL_STAFF;
    }
  },

  // Invoices
  getInvoices(): Invoice[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INVOICES);
      return data ? JSON.parse(data) : INITIAL_INVOICES;
    } catch {
      return INITIAL_INVOICES;
    }
  },

  payInvoice(id: string, cardLast4: string = '4242', brand: string = 'Visa') {
    const invoices = this.getInvoices();
    const target = invoices.find((inv) => inv.id === id);
    if (target) {
      target.status = 'paid';
      target.paymentMethod = `${brand} •••• ${cardLast4}`;
      const now = new Date();
      target.paidAt = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));

      // Also mark associated appointment as paid
      const appointments = this.getAppointments();
      const apt = appointments.find((a) => a.id === target.appointmentId || a.invoiceId === target.id);
      if (apt) {
        apt.paymentStatus = 'paid';
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
      }

      notifyListeners();
    }
  },

  // Clients CRM
  getClients(): ClientRecord[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLIENTS);
      return data ? JSON.parse(data) : INITIAL_CLIENTS;
    } catch {
      return INITIAL_CLIENTS;
    }
  },

  upsertClientRecord(name: string, email: string, phone: string, amountSpent: number, appointmentDate: string) {
    const clients = this.getClients();
    const existing = clients.find((c) => c.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      existing.name = name;
      existing.phone = phone;
      existing.totalSpent += amountSpent;
      existing.visitsCount += 1;
      existing.nextAppointmentDate = appointmentDate;
    } else {
      clients.unshift({
        id: `cli_${Date.now()}`,
        name,
        email,
        phone,
        totalSpent: amountSpent,
        visitsCount: 1,
        nextAppointmentDate: appointmentDate,
        notes: 'New client booked via portal.',
        memberSince: new Date().toISOString().split('T')[0],
      });
    }

    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  },

  // Metrics
  getMetrics(): ClinicMetrics {
    const invoices = this.getInvoices();
    const appointments = this.getAppointments();
    const clients = this.getClients();

    const todayStr = new Date().toISOString().split('T')[0];

    const totalRevenue = invoices
      .filter((i) => i.status === 'paid')
      .reduce((sum, i) => sum + i.total, 0);

    const pendingInvoices = invoices.filter((i) => i.status === 'pending');

    const todayAppointments = appointments.filter((a) => a.date === todayStr);

    return {
      totalRevenue: Math.round(totalRevenue),
      monthlyRevenue: Math.round(totalRevenue * 0.42), // estimated current month portion
      revenueGrowth: 23.4,
      monthlyBookings: appointments.length,
      bookingsGrowth: 18.2,
      activeClients: clients.length,
      retentionRate: 94.6,
      todayAppointmentsCount: todayAppointments.length,
      pendingInvoicesCount: pendingInvoices.length,
    };
  },

  // Auto-deplete inventory based on completed appointment
  autoDepleteForAppointment(apt: Appointment) {
    const inventory = this.getInventory();
    const serviceName = apt.serviceName.toLowerCase();
    let changed = false;

    // Check for HydraFacial
    if (serviceName.includes('hydrafacial')) {
      const tip = inventory.find((i) => i.sku === 'MED-HYD-TIP');
      if (tip && tip.currentStock > 0) {
        tip.currentStock -= 1;
        changed = true;
      }
    }

    // Check for Morpheus8
    if (serviceName.includes('morpheus8') || serviceName.includes('microneedling')) {
      const cart = inventory.find((i) => i.sku === 'MED-MPH-24');
      if (cart && cart.currentStock > 0) {
        cart.currentStock -= 1;
        changed = true;
      }
    }

    // Check for NAD+
    if (serviceName.includes('nad+')) {
      const vial = inventory.find((i) => i.sku === 'MED-NAD-500');
      if (vial && vial.currentStock > 0) {
        vial.currentStock -= 1;
        changed = true;
      }
    }

    // Check if appointment has a facial chart record with botox or filler
    const chart = this.getFacialChartByAppointment(apt.id);
    if (chart) {
      if (chart.totalBotoxUnits > 0) {
        const botox = inventory.find((i) => i.sku === 'MED-BTX-100');
        if (botox && botox.currentStock >= chart.totalBotoxUnits) {
          botox.currentStock -= chart.totalBotoxUnits;
          changed = true;
        }
      }
      if (chart.totalFillerMl > 0) {
        const voluma = inventory.find((i) => i.sku === 'MED-VOL-01');
        if (voluma && voluma.currentStock > 0) {
          voluma.currentStock = Math.max(0, voluma.currentStock - Math.ceil(chart.totalFillerMl));
          changed = true;
        }
      }
    }

    if (changed) {
      localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
    }
  },

  // Inventory Management
  getInventory(): InventoryItem[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INVENTORY);
      return data ? JSON.parse(data) : INITIAL_INVENTORY;
    } catch {
      return INITIAL_INVENTORY;
    }
  },

  updateInventoryStock(id: string, newStock: number) {
    const list = this.getInventory();
    const target = list.find((i) => i.id === id);
    if (target) {
      target.currentStock = Math.max(0, newStock);
      localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(list));
      notifyListeners();
    }
  },

  restockInventoryItem(id: string, additionalStock: number, newBatch?: string) {
    const list = this.getInventory();
    const target = list.find((i) => i.id === id);
    if (target) {
      target.currentStock += additionalStock;
      target.lastRestocked = new Date().toISOString().split('T')[0];
      if (newBatch) {
        target.batchNumber = newBatch;
      }
      localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(list));
      notifyListeners();
    }
  },

  // Facial Injection Charts
  getFacialCharts(): FacialChartRecord[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FACIAL_CHARTS);
      return data ? JSON.parse(data) : INITIAL_FACIAL_CHARTS;
    } catch {
      return INITIAL_FACIAL_CHARTS;
    }
  },

  getFacialChartByAppointment(appointmentId: string): FacialChartRecord | undefined {
    const charts = this.getFacialCharts();
    return charts.find((c) => c.appointmentId === appointmentId);
  },

  saveFacialChart(chart: FacialChartRecord) {
    const list = this.getFacialCharts();
    const idx = list.findIndex((c) => c.appointmentId === chart.appointmentId || c.id === chart.id);
    if (idx !== -1) {
      list[idx] = chart;
    } else {
      list.unshift(chart);
    }
    localStorage.setItem(STORAGE_KEYS.FACIAL_CHARTS, JSON.stringify(list));
    notifyListeners();
  },

  // Personal Progress Milestones
  getProgressMilestones(clientEmail?: string): PersonalProgressMilestone[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MILESTONES);
      const list: PersonalProgressMilestone[] = data ? JSON.parse(data) : INITIAL_PROGRESS_MILESTONES;
      if (clientEmail) {
        return list.filter((m) => m.clientEmail.toLowerCase() === clientEmail.toLowerCase());
      }
      return list;
    } catch {
      return INITIAL_PROGRESS_MILESTONES;
    }
  },
};
