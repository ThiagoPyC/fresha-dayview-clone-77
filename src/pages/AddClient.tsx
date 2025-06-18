
import { useState } from 'react';
import { ArrowLeft, User, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const AddClient = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('personal');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    additionalEmail: '',
    phone: '',
    additionalPhone: '',
    birthDate: '',
    birthYear: ''
  });

  const sections = [
    { id: 'personal', name: 'Pessoal' },
    { id: 'profile', name: 'Perfil', active: true },
    { id: 'addresses', name: 'Endereços' },
    { id: 'emergency', name: 'Contatos de emergência' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/clients')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Cadastrar cliente</h1>
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
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          {selectedSection === 'personal' && (
            <div className="max-w-4xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Pessoal</h2>
              <p className="text-gray-600 mb-6">Informações pessoais básicas do cliente</p>
              
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-purple-600" />
                    </div>
                    <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full border border-gray-200 shadow-sm">
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Nome e Sobrenome */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      placeholder="ex.: João"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="surname" className="text-sm font-medium text-gray-700">
                      Sobrenome
                    </Label>
                    <Input
                      id="surname"
                      placeholder="ex.: Oliveira"
                      value={formData.surname}
                      onChange={(e) => handleInputChange('surname', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* E-mail e E-mail adicional */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemplo@dominio.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="additional-email" className="text-sm font-medium text-gray-700">
                      E-mail adicional
                    </Label>
                    <Input
                      id="additional-email"
                      type="email"
                      placeholder="exemplo2@dominio.com"
                      value={formData.additionalEmail}
                      onChange={(e) => handleInputChange('additionalEmail', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Telefone e Telefone adicional */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Telefone
                    </Label>
                    <div className="mt-1 flex">
                      <Select>
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="+55" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+55">+55</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                          <SelectItem value="+44">+44</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        placeholder="por exemplo: +1 234 567 8901"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="ml-2 flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additional-phone" className="text-sm font-medium text-gray-700">
                      Telefone adicional
                    </Label>
                    <div className="mt-1 flex">
                      <Select>
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="+55" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+55">+55</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                          <SelectItem value="+44">+44</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="additional-phone"
                        placeholder="por exemplo: +1 234 567 8901"
                        value={formData.additionalPhone}
                        onChange={(e) => handleInputChange('additionalPhone', e.target.value)}
                        className="ml-2 flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Data de nascimento e Ano */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="birth-date" className="text-sm font-medium text-gray-700">
                      Data de nascimento
                    </Label>
                    <Input
                      id="birth-date"
                      placeholder="Dia e mês"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="birth-year" className="text-sm font-medium text-gray-700">
                      Ano
                    </Label>
                    <Input
                      id="birth-year"
                      placeholder="Ano"
                      value={formData.birthYear}
                      onChange={(e) => handleInputChange('birthYear', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === 'profile' && (
            <div className="max-w-4xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Perfil</h2>
              <p className="text-gray-600 mb-6">Gerencie o perfil pessoal do seu cliente</p>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">Configurações de perfil do cliente.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedSection === 'addresses' && (
            <div className="max-w-4xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Endereços</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">Gerencie os endereços do cliente.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedSection === 'emergency' && (
            <div className="max-w-4xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contatos de emergência</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">Adicione contatos de emergência para este cliente.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddClient;
