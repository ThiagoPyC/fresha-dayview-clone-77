
import { useState } from 'react';
import { ChevronDown, ChevronRight, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface ResourceSidebarProps {
  selectedResources: string[];
  onResourceChange: (resources: string[]) => void;
}

const ResourceSidebar = ({ selectedResources, onResourceChange }: ResourceSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState({
    resources: true,
    locations: true
  });

  const resources = [
    { id: 'e-working', name: 'Estação de Trabalho 1', type: 'workstation', available: true },
    { id: 'e-3444802', name: 'Ana Silva', type: 'professional', available: true },
    { id: 'e-3444803', name: 'João Santos', type: 'professional', available: false },
    { id: 'e-3444804', name: 'Maria Costa', type: 'professional', available: true },
    { id: 'e-working-2', name: 'Estação de Trabalho 2', type: 'workstation', available: true },
  ];

  const locations = [
    { id: '1532710', name: 'Unidade Principal', address: 'Rua das Flores, 123' },
    { id: '1532711', name: 'Filial Centro', address: 'Av. Central, 456' },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleResource = (resourceId: string) => {
    const newResources = selectedResources.includes(resourceId)
      ? selectedResources.filter(id => id !== resourceId)
      : [...selectedResources, resourceId];
    onResourceChange(newResources);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-[calc(100vh-140px)] overflow-y-auto">
      <div className="p-4">
        {/* Resources Section */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="w-full justify-start p-0 h-auto font-semibold text-gray-900"
            onClick={() => toggleSection('resources')}
          >
            {expandedSections.resources ? (
              <ChevronDown className="h-4 w-4 mr-2" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2" />
            )}
            Recursos ({selectedResources.length} selecionados)
          </Button>
          
          {expandedSections.resources && (
            <div className="mt-3 space-y-2">
              {resources.map((resource) => (
                <div key={resource.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <Checkbox
                    checked={selectedResources.includes(resource.id)}
                    onCheckedChange={() => toggleResource(resource.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      {resource.type === 'professional' ? (
                        <User className="h-4 w-4 text-purple-600" />
                      ) : (
                        <div className="h-4 w-4 bg-gray-400 rounded"></div>
                      )}
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {resource.name}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Badge 
                        variant={resource.available ? "default" : "secondary"}
                        className={`text-xs ${resource.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {resource.available ? 'Disponível' : 'Ocupado'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Locations Section */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-start p-0 h-auto font-semibold text-gray-900"
            onClick={() => toggleSection('locations')}
          >
            {expandedSections.locations ? (
              <ChevronDown className="h-4 w-4 mr-2" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2" />
            )}
            Localização
          </Button>
          
          {expandedSections.locations && (
            <div className="mt-3 space-y-2">
              {locations.map((location) => (
                <div key={location.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">
                      {location.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {location.address}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceSidebar;
