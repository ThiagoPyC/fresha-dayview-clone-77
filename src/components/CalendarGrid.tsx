
import { useState } from 'react';
import { Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CalendarGridProps {
  selectedDate: Date;
  selectedResources: string[];
  selectedView: string;
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

const CalendarGrid = ({ selectedDate, selectedResources, selectedView, onAddAppointment }: CalendarGridProps) => {
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
    const top = (startMinutes / 60) * 64;
    const height = (duration / 60) * 64;
    return { top, height };
  };

  const filteredAppointments = appointments.filter(apt => 
    selectedResources.includes(apt.resource)
  );

  const getDaysInWeek = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day;
    start.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(start);
      currentDay.setDate(start.getDate() + i);
      days.push(currentDay);
    }
    return days;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    const endDate = new Date(lastDay);
    
    // Ajustar para começar na segunda-feira da primeira semana
    startDate.setDate(startDate.getDate() - (startDate.getDay() || 7) + 1);
    // Ajustar para terminar no domingo da última semana
    endDate.setDate(endDate.getDate() + (7 - endDate.getDay()) % 7);
    
    const days = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };

  const renderDayView = () => (
    <div className="flex-1 bg-white transition-all duration-300 ease-in-out">
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
                    className="h-16 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
                    onClick={onAddAppointment}
                  />
                ))}
                
                {/* Appointments */}
                {filteredAppointments
                  .filter(apt => apt.resource === resourceId)
                  .map((appointment) => {
                    const { top, height } = getAppointmentPosition(appointment.time, appointment.duration);
                    return (
                      <div
                        key={appointment.id}
                        className={`absolute left-1 right-1 rounded-lg border-l-4 border-purple-500 p-2 ${getStatusColor(appointment.status)} cursor-pointer hover:shadow-md transition-all duration-200`}
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

  const renderWeekView = () => {
    const weekDays = getDaysInWeek(selectedDate);
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    return (
      <div className="flex-1 bg-white transition-all duration-300 ease-in-out">
        <div className="flex border-b border-gray-200">
          {/* Time column */}
          <div className="w-20 flex-shrink-0 border-r border-gray-200">
            <div className="h-16 border-b border-gray-200 bg-gray-50"></div>
            {timeSlots.map((time) => (
              <div key={time} className="h-12 border-b border-gray-100 flex items-start justify-center pt-1">
                <span className="text-xs text-gray-500">{time}</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((day, index) => (
            <div key={day.toISOString()} className="flex-1 min-w-0 border-r border-gray-200">
              {/* Header */}
              <div className="h-16 border-b border-gray-200 bg-gray-50 flex flex-col items-center justify-center px-2">
                <span className="text-xs text-gray-500 font-medium">
                  {dayNames[day.getDay()]}
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  {day.getDate()}
                </span>
              </div>
              
              {/* Time slots */}
              <div className="relative">
                {timeSlots.map((time) => (
                  <div 
                    key={time} 
                    className="h-12 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
                    onClick={onAddAppointment}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthDays = getDaysInMonth(selectedDate);
    const dayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const weeks = [];
    
    for (let i = 0; i < monthDays.length; i += 7) {
      weeks.push(monthDays.slice(i, i + 7));
    }
    
    return (
      <div className="flex-1 bg-white transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {dayNames.map((dayName) => (
            <div key={dayName} className="h-12 border-r border-gray-200 bg-gray-50 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">{dayName}</span>
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-rows-6">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 border-b border-gray-200">
              {week.map((day, dayIndex) => {
                const isCurrentMonth = day.getMonth() === selectedDate.getMonth();
                const isToday = day.toDateString() === new Date().toDateString();
                
                return (
                  <div 
                    key={day.toISOString()} 
                    className={`h-24 border-r border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors duration-200 p-2 ${
                      !isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                    }`}
                    onClick={onAddAppointment}
                  >
                    <div className={`text-sm font-medium ${
                      isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
                    }`}>
                      {day.getDate()}
                    </div>
                    <div className="mt-1 space-y-1">
                      {/* Sample appointments for month view */}
                      {day.getDate() === 18 && isCurrentMonth && (
                        <div className="text-xs bg-purple-200 text-purple-800 px-1 rounded truncate">
                          Corte 9:00
                        </div>
                      )}
                      {day.getDate() === 20 && isCurrentMonth && (
                        <div className="text-xs bg-green-200 text-green-800 px-1 rounded truncate">
                          Manicure 14:00
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCalendarView = () => {
    switch (selectedView) {
      case 'week':
        return renderWeekView();
      case 'month':
        return renderMonthView();
      default:
        return renderDayView();
    }
  };

  return renderCalendarView();
};

export default CalendarGrid;
