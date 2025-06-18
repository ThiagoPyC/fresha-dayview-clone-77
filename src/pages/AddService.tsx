
import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('basic');
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const sections = [
    { id: 'basic', name: 'Informações básicas', indicator: true },
    { id: 'collaborators', name: 'Colaboradores', count: 3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/services')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Novo serviço</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              Fechar
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800">
              Salvar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                  selectedSection === section.id 
                    ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium">{section.name}</span>
                <div className="flex items-center space-x-2">
                  {section.indicator && (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                  {section.count && (
                    <span className="text-sm text-gray-500">{section.count}</span>
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          {selectedSection === 'basic' && (
            <div className="max-w-4xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações básicas</h2>
              
              <div className="space-y-6">
                {/* Nome do serviço */}
                <div>
                  <Label htmlFor="service-name" className="text-sm font-medium text-gray-700">
                    Nome do serviço
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="service-name"
                      placeholder="Inclua um nome de serviço, por exemplo, corte de cabelo masculino"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full"
                    />
                    <span className="absolute right-3 top-3 text-sm text-gray-400">
                      {serviceName.length}/255
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-red-600">O nome do serviço é obrigatório</p>
                </div>

                {/* Tipo de serviço e Categoria */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Tipo de serviço</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corte">Corte de cabelo</SelectItem>
                        <SelectItem value="barba">Barba</SelectItem>
                        <SelectItem value="manicure">Manicure</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="mt-1 text-sm text-gray-500">
                      Usado para ajudar clientes a encontrar o seu serviço no marketplace da Fresha
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Categoria</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecionar categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beleza">Beleza</SelectItem>
                        <SelectItem value="bem-estar">Bem-estar</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="mt-1 text-sm text-gray-500">
                      A categoria exibida para você e para clientes online
                    </p>
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Descrição <span className="text-gray-400">(opcional)</span>
                  </Label>
                  <div className="mt-1 relative">
                    <textarea
                      id="description"
                      placeholder="Adicionar uma breve descrição"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                    <span className="absolute right-3 bottom-3 text-sm text-gray-400">
                      {description.length}/1000
                    </span>
                  </div>
                </div>

                {/* Preço e duração */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Preço e duração</h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Tipo de preço</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Fixo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixo</SelectItem>
                          <SelectItem value="variable">Variável</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="price" className="text-sm font-medium text-gray-700">Preço</Label>
                      <div className="mt-1 relative">
                        <span className="absolute left-3 top-3 text-gray-500">R$</span>
                        <Input
                          id="price"
                          placeholder="0,00"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Duração</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="1h" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30min">30 min</SelectItem>
                          <SelectItem value="1h">1h</SelectItem>
                          <SelectItem value="1h30">1h 30min</SelectItem>
                          <SelectItem value="2h">2h</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-4">
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Incluir tempo adicional</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      Opções
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === 'collaborators' && (
            <div className="max-w-4xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Colaboradores</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">Selecione os colaboradores que podem realizar este serviço.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddService;
