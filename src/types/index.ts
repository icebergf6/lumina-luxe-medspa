export type UserRole = 'admin' | 'staff' | 'client';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  title?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'Aesthetic' | 'Wellness' | 'Anti-Aging' | 'Body Contouring';
  durationMinutes: number;
  price: number;
  description: string;
  popular?: boolean;
  image: string;
  recommendedSessions?: number;
  downtime?: string;
  targetLayer?: string;
  clinicalResults?: string;
  modality?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  title: string;
  role: 'doctor' | 'nurse_practitioner' | 'senior_aesthetician';
  avatar: string;
  specialties: string[];
  bio: string;
  rating: number;
  reviewsCount: number;
}

export type AppointmentStatus = 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'pending';
export type PaymentStatus = 'paid' | 'unpaid';

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  staffId: string;
  staffName: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:30 AM"
  durationMinutes: number;
  price: number;
  status: AppointmentStatus;
  notes?: string;
  paymentStatus: PaymentStatus;
  invoiceId?: string;
  createdAt: string;
}

export type InvoiceStatus = 'paid' | 'pending' | 'overdue';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  appointmentId: string;
  clientName: string;
  clientEmail: string;
  serviceName: string;
  date: string;
  dueDate: string;
  amount: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  paymentMethod?: string;
  paidAt?: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
  visitsCount: number;
  lastVisitDate?: string;
  nextAppointmentDate?: string;
  notes: string;
  skinType?: string;
  allergies?: string;
  memberSince: string;
}

export interface ClinicMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  monthlyBookings: number;
  bookingsGrowth: number;
  activeClients: number;
  retentionRate: number;
  todayAppointmentsCount: number;
  pendingInvoicesCount: number;
}

export interface InjectionPoint {
  id: string;
  zoneId: string;
  zoneName: string;
  x: number; // percentage coordinate 0-100
  y: number; // percentage coordinate 0-100
  product: string;
  dosage: number;
  unit: 'Units' | 'mL';
  notes?: string;
}

export interface FacialChartRecord {
  id: string;
  appointmentId: string;
  clientName: string;
  clientEmail: string;
  serviceName: string;
  date: string;
  injectorName: string;
  points: InjectionPoint[];
  totalBotoxUnits: number;
  totalFillerMl: number;
  clinicalNotes: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'Neurotoxin' | 'Dermal Filler' | 'Laser/RF Consumable' | 'HydraFacial Tip' | 'IV Wellness';
  currentStock: number;
  unit: string;
  minimumThreshold: number;
  costPerUnit: number;
  batchNumber: string;
  expiryDate: string;
  supplier: string;
  lastRestocked: string;
}

export interface PersonalProgressMilestone {
  id: string;
  clientEmail: string;
  treatmentName: string;
  date: string;
  sessionNumber: number;
  beforeImage: string;
  afterImage: string;
  clinicalNote: string;
  skinImprovementScore: string;
}

