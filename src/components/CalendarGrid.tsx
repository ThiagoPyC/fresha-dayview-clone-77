import { useState } from 'react';
import { Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CalendarGridProps {
  selectedDate: Date;
  selectedResources: string[];
  onAddAppointment: () => void;
}

interface Appointment {
  id: string;
  title: string;
  client: string;
  time: string;
  duration: number;
  resource: string;
  service: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const CalendarGrid = ({ selectedDate, selectedResources, onAddAppointment }: CalendarGridProps) => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const appointments: Appointment[] = [
    {
      id: '1',
      title: 'Corte de Cabelo',
      client: 'João Silva',
      time: '09:00',
      duration: 60,
      resource: 'e-3444802',
      service: 'Corte Masculino',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Manicure',
      client: 'Maria Santos',
      time: '10:30',
      duration: 45,
      resource: 'e-working',
      service: 'Manicure Simples',
      status: 'confirmed'
    },
    {
      id: '3',
      title: 'Massagem Relaxante',
      client: 'Ana Costa',
      time: '14:00',
      duration: 90,
      resource: 'e-3444802',
      service: 'Massagem',
      status: 'pending'
    },
    {
      id: '4',
      title: 'Limpeza de Pele',
      client: 'Carlos Lima',
      time: '16:00',
      duration: 75,
      resource: 'e-working',
      service: 'Tratamento Facial',
      status: 'confirmed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAppointmentPosition = (time: string, duration: number) => {
    const [hours, minutes] = time.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const top = (startMinutes / 60) * 64; // 64px per hour
    const height = (duration / 60) * 64;
    return { top, height };
  };

  const filteredAppointments = appointments.filter(apt => 
    selectedResources.includes(apt.resource)
  );

  return (
    <div className="flex-1 bg-white">
      <div className="flex border-b border-gray-200">
        {/* Time column */}
        <div className="w-20 flex-shrink-0 border-r border-gray-200">
          <div className="h-12 border-b border-gray-200 bg-gray-50"></div>
          {timeSlots.map((time) => (
            <div key={time} className="h-16 border-b border-gray-100 flex items-start justify-center pt-2">
              <span className="text-xs text-gray-500">{time}</span>
            </div>
          ))}
        </div>

        {/* Resource columns */}
        {selectedResources.map((resourceId) => {
          const resourceName = resourceId === 'e-working' ? 'Estação 1' : 
                              resourceId === 'e-3444802' ? 'Ana Silva' : 
                              resourceId === 'e-3444803' ? 'João Santos' :
                              resourceId === 'e-3444804' ? 'Maria Costa' : 'Estação 2';
          
          return (
            <div key={resourceId} className="flex-1 min-w-0 border-r border-gray-200">
              {/* Header */}
              <div className="h-12 border-b border-gray-200 bg-gray-50 flex items-center justify-center px-4">
                <span className="font-medium text-gray-900 text-sm truncate">
                  {resourceName}
                </span>
              </div>
              
              {/* Time slots */}
              <div className="relative">
                {timeSlots.map((time) => (
                  <div 
                    key={time} 
                    className="h-16 border-b border-gray-100 hover:bg-blue-50 cursor-pointer group relative"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                      onClick={onAddAppointment}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                
                {/* Appointments */}
                {filteredAppointments
                  .filter(apt => apt.resource === resourceId)
                  .map((appointment) => {
                    const { top, height } = getAppointmentPosition(appointment.time, appointment.duration);
                    return (
                      <div
                        key={appointment.id}
                        className={`absolute left-1 right-1 rounded-lg border-l-4 border-purple-500 p-2 ${getStatusColor(appointment.status)} cursor-pointer hover:shadow-md transition-shadow`}
                        style={{
                          top: `${top}px`,
                          height: `${Math.max(height, 48)}px`
                        }}
                      >
                        <div className="text-xs font-semibold truncate">
                          {appointment.title}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {appointment.client}
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3 w-3 text-gray-500 mr-1" />
                          <span className="text-xs text-gray-500">
                            {appointment.time} ({appointment.duration}min)
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
