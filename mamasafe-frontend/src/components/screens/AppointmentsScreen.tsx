import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Plus, User, Search, Filter, MoreVertical } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

interface AppointmentsScreenProps {
  onBack: () => void;
  onNewAppointment: () => void;
  onAppointmentClick: (appointment: Appointment) => void;
}

const AppointmentsScreen: React.FC<AppointmentsScreenProps> = ({
  onBack,
  onNewAppointment,
  onAppointmentClick
}) => {
  const [filter, setFilter] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for now as we don't have a global getAppointments endpoint
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'Sarah Johnson',
      patientId: 'MS-1023',
      date: '2024-03-20',
      time: '09:00 AM',
      type: 'Check-up',
      status: 'upcoming',
      notes: 'Routine pregnancy checkup'
    },
    {
      id: '2',
      patientName: 'Amara Okafor',
      patientId: 'MS-1024',
      date: '2024-03-20',
      time: '10:30 AM',
      type: 'Ultrasound',
      status: 'upcoming'
    },
    {
      id: '3',
      patientName: 'Chioma Adebayo',
      patientId: 'MS-1025',
      date: '2024-03-21',
      time: '02:00 PM',
      type: 'Consultation',
      status: 'upcoming'
    }
  ]);

  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = filter === 'all' || apt.status === filter;
    const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.patientId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Appointments</h1>
          </div>
          <Button variant="primary" size="sm" onClick={onNewAppointment} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Appointment
          </Button>
        </div>
        
        {/* Filters */}
        <div className="px-4 pb-4 flex gap-2 overflow-x-auto">
          {['upcoming', 'completed', 'cancelled', 'all'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-3">
          {filteredAppointments.map((apt, index) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onAppointmentClick(apt)}
            >
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {apt.date.split('-')[2]}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{apt.patientName}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{apt.time}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{apt.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    apt.status === 'upcoming' ? 'bg-blue-50 text-blue-700' :
                    apt.status === 'completed' ? 'bg-green-50 text-green-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {apt.status}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          
          {filteredAppointments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No appointments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsScreen;