
import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Filter, Settings, User, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CalendarGrid from '@/components/CalendarGrid';
import ResourceSidebar from '@/components/ResourceSidebar';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 5, 18)); // June 18, 2025
  const [selectedView, setSelectedView] = useState('day');
  const [selectedResources, setSelectedResources] = useState(['e-working', 'e-3444802']);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Fresha Partners</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-purple-600 font-medium border-b-2 border-purple-600 pb-1">
                Calendário
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Clientes
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Serviços
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Relatórios
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Buscar..." 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Calendar Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigateDate('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigateDate('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold text-gray-900 ml-4">
                {formatDate(selectedDate)}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant={selectedView === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedView('day')}
            >
              Dia
            </Button>
            <Button 
              variant={selectedView === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedView('week')}
            >
              Semana
            </Button>
            <Button 
              variant={selectedView === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedView('month')}
            >
              Mês
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        <ResourceSidebar 
          selectedResources={selectedResources}
          onResourceChange={setSelectedResources}
        />
        <div className="flex-1">
          <CalendarGrid 
            selectedDate={selectedDate}
            selectedResources={selectedResources}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
