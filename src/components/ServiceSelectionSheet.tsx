
import { useState } from 'react';
import { X, Search, User, Settings, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface ServiceSelectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceSelectionSheet = ({ isOpen, onClose }: ServiceSelectionSheetProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const serviceCategories = [
    {
      name: 'Hair & styling',
      count: 4,
      services: [
        { name: 'Corte de cabelo', duration: '45min', price: 'R$ 40' },
        { name: 'Coloração de cabelo', duration: '1h 15min', price: 'R$ 57' },
        { name: 'Escova', duration: '35min', price: 'R$ 35' },
        { name: 'Balaiagem', duration: '2h 30min', price: 'R$ 150' },
      ]
    },
    {
      name: 'Eyebrows & eyelashes',
      count: 1,
      services: [
        { name: 'Alongamento de cílios clássico', duration: '1h', price: 'R$ 60' },
      ]
    }
  ];

  const filteredCategories = serviceCategories.map(category => ({
    ...category,
    services: category.services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.services.length > 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[600px] sm:max-w-[600px] p-0">
        <div className="h-full bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Maximize2 className="h-5 w-5" />
              </Button>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar */}
          <div className="flex h-[calc(100%-65px)]">
            <div className="w-48 bg-gray-50 border-r p-4">
              <div className="flex items-center space-x-2 mb-4">
                <User className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-semibold text-sm">Adicionar cliente</div>
                  <div className="text-xs text-gray-500">Ou deixe vazio se não há cadastro</div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-semibold">Selecionar um serviço</SheetTitle>
              </SheetHeader>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar serviço por nome"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>

              {/* Service Categories */}
              <div className="space-y-6">
                {filteredCategories.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center space-x-2 mb-4">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {category.services.map((service) => (
                        <div key={service.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                          <div className="border-l-4 border-blue-400 pl-3">
                            <div className="font-medium text-gray-900">{service.name}</div>
                            <div className="text-sm text-gray-500">{service.duration}</div>
                          </div>
                          <div className="font-semibold text-gray-900">{service.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {filteredCategories.length === 0 && searchTerm && (
                <div className="text-center text-gray-500 mt-8">
                  Nenhum serviço encontrado para "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ServiceSelectionSheet;
