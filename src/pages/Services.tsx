
import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Filter, Settings, User, Bell, Search, Plus, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { name: 'Todas as categorias', count: 5 },
    { name: 'Hair & styling', count: 4 },
    { name: 'Eyebrows & eyelashes', count: 1 },
  ];

  const services = [
    {
      id: '1',
      name: 'Corte de cabelo',
      category: 'Hair & styling',
      duration: '45min',
      price: 'R$ 40'
    },
    {
      id: '2',
      name: 'Coloração de cabelo',
      category: 'Hair & styling',
      duration: '1h 15min',
      price: 'R$ 57'
    },
    {
      id: '3',
      name: 'Escova',
      category: 'Hair & styling',
      duration: '35min',
      price: 'R$ 35'
    },
    {
      id: '4',
      name: 'Balaiagem',
      category: 'Hair & styling',
      duration: '2h 30min',
      price: 'R$ 150'
    },
    {
      id: '5',
      name: 'Alongamento de cílios clássico',
      category: 'Eyebrows & eyelashes',
      duration: '1h',
      price: 'R$ 60'
    }
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedServices = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

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
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Calendário
              </a>
              <a href="/clients" className="text-gray-600 hover:text-gray-900">
                Clientes
              </a>
              <a href="/services" className="text-purple-600 font-medium border-b-2 border-purple-600 pb-1">
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

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Catálogo de serviços</h2>
            <p className="text-gray-600">Visualize e gerencie os serviços oferecidos pela sua empresa. Saiba mais</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Opções
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Pesquisar nome do serviço"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              Ajustar ordem
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorias</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <span className="text-gray-700">{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            ))}
            <Button variant="ghost" className="w-full justify-start text-purple-600 hover:text-purple-700 hover:bg-purple-50 mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Acrescentar categoria
            </Button>
          </div>
        </div>

        {/* Services List */}
        <div className="flex-1 bg-white p-6">
          <div className="space-y-8">
            {Object.entries(groupedServices).map(([category, categoryServices]) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {categoryServices.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="border-l-4 border-blue-400 pl-4">
                        <div className="font-medium text-gray-900">{service.name}</div>
                        <div className="text-sm text-gray-500">{service.duration}</div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-gray-900">{service.price}</span>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && searchTerm && (
            <div className="text-center text-gray-500 mt-8">
              Nenhum serviço encontrado para "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
