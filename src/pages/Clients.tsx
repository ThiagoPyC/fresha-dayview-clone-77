
import { useState } from 'react';
import { Calendar, Filter, Settings, User, Bell, Search, Plus, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: '1',
      initials: 'FS',
      name: 'fulano silva',
      email: 'admin@example.com',
      phone: '+55 51 90000-0000',
      reviews: '-',
      sales: '-',
      createdAt: '15/01/2025'
    },
    {
      id: '2',
      initials: 'JD',
      name: 'Jack Doe',
      email: 'jack@example.com',
      phone: '-',
      reviews: '-',
      sales: '-',
      createdAt: '15/01/2025'
    },
    {
      id: '3',
      initials: 'JD',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '-',
      reviews: '-',
      sales: '-',
      createdAt: '15/01/2025'
    },
    {
      id: '4',
      initials: 'JD',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '-',
      reviews: '-',
      sales: '-',
      createdAt: '15/01/2025'
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

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
              <a href="/clients" className="text-purple-600 font-medium border-b-2 border-purple-600 pb-1">
                Clientes
              </a>
              <a href="/services" className="text-gray-600 hover:text-gray-900">
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
            <h2 className="text-2xl font-bold text-gray-900">Lista de clientes <span className="text-gray-500 font-normal">4</span></h2>
            <p className="text-gray-600">Ver, adicionar, editar e excluir dados do seu cliente. Saiba mais</p>
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
              placeholder="Nome, e-mail ou número de celular"
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
              Criado em (do mais recente)
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Nome do cliente</TableHead>
              <TableHead>Número de celular</TableHead>
              <TableHead>Avaliações</TableHead>
              <TableHead>Vendas</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {client.initials}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{client.name}</div>
                    <div className="text-sm text-gray-500">{client.email}</div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{client.phone}</TableCell>
                <TableCell className="text-gray-600">{client.reviews}</TableCell>
                <TableCell className="text-gray-600">{client.sales}</TableCell>
                <TableCell className="text-gray-600">{client.createdAt}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredClients.length === 0 && searchTerm && (
          <div className="text-center text-gray-500 mt-8">
            Nenhum cliente encontrado para "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
