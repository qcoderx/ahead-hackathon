import { DashboardStats, Patient } from '../types/dashboard'

export const mockDashboardStats: DashboardStats = {
  activePatients: 16,
  activeChange: 2,
  upcoming: 8,
  upcomingChange: -5,
  labResults: 5,
  labChange: 1,
  discharges: 2,
  dischargeChange: 10
}

export const mockRecentPatients: Patient[] = [
  {
    id: '1',
    name: 'Olivia Rhye',
    room: 'Room 302A',
    status: 'stable',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaLote7z_vxQrYiB1-Qc_15n3TuNkwafmREXuC9bJ61YohpTlpIv9uKlFxGsWDlKnBXoUTrD8zZ7d57mFfQv4e5SADu_J9bD0rNRc1B47DkY8Ak5XxZ4MrM_J3jwTi5Uw_pbqvS62fzsTPCMxsfIVhd8dPCE3a-700fbrRScOxe5eljbci8L1rn7-a0KVcCaDosyhTVbhgQqAHcuJ5i84Igl3FwTShLyJ46nCjutxnIr2vg-RDrsWgMpbpaqprMNom_qWycZzgllu6'
  },
  {
    id: '2',
    name: 'Michael Scott',
    room: 'Room 305B',
    status: 'needs-attention',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARq0KDoD2HRI4con8VfpfbVFcGxqd3BslHbIP2_Txd4NyqtdQ5QcYuDr0hj9IhL57h4ETKG4Mfd_GFNn9BV5OFr76nSVl2XTcBTrToGQ7gL8RNsVsSLMGJzkyl87OCkV9jGEXosBfpocOd8Bwg9DOAlcmRvNu_PmB3ToTwUItVfJUHADVYIdg2zUtydIliA875NyXG0boNU0REsL1c5RrHJYIezs_6nEbuiS_Fo7-Wavqt-8TKufwf9ahKH8P1CyxyvqXQUJLuziKs'
  },
  {
    id: '3',
    name: 'Jessica Alba',
    room: 'Room 309A',
    status: 'stable',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlxqKL03tQJ2_Mg35vpzD3O0oMwrbsnjw8-ZbDk0PrVuOUSWy-1x5x3Hx7u2iMWRnpnTrIq6rKPX2CHxh6ksMTuNA9DwV6yeYmLqsDm-N6oZ8la2D6oQb6WU3Yni1FGxMshJdO0aSaEx8Q0B7jNgK9DdUbLtaQYIz4hitwjuBVAdtjiRgwXw5XxGRjgP7GfbKHUyURvkd2j2vQiRFeVlg401TjlP26icgpQrEf9l7hCSdx9pOpR3krL5tY99yDAJtouGpKBYH54haS'
  }
]