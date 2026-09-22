import {
  INITIAL_APPOINTMENTS,
  INITIAL_CLIENTS,
  INITIAL_INVOICES,
  INITIAL_SERVICES,
  INITIAL_STAFF,
} from '../data/seedData';
import { Appointment, AppointmentStatus, ClientRecord, ClinicMetrics, Invoice, ServiceItem, StaffMember } from '../types';

const STORAGE_KEYS = {
  APPOINTMENTS: 'lumina_appointments_v1',
  SERVICES: 'lumina_services_v1',
  STAFF: 'lumina_staff_v1',
  INVOICES: 'lumina_invoices_v1',
  CLIENTS: 'lumina_clients_v1',
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
  },

  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(INITIAL_INVOICES));
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(INITIAL_CLIENTS));
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
      list[idx].status = status;
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(list));
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
};
