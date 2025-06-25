import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Mail,
  Edit,
  Check,
  Trash2,
  Users,
  ArrowLeft
} from 'lucide-react';
import { useAppState } from '../contexts/AppStateContext';

const AdminConfig: React.FC = () => {
  const { appointments, contacts, content, updateAppointment, deleteAppointment, updateContent } = useAppState();
  const [activeTab, setActiveTab] = useState<'appointments' | 'contacts' | 'content' | 'cart'>('appointments');
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [contentForm, setContentForm] = useState({ ...content });

  const handleUpdateAppointment = (id: string, status: 'pending' | 'confirmed' | 'completed') => {
    updateAppointment(id, { status });
  };

  const handleDeleteAppointment = (id: string) => {
    if (window.confirm('¿Deseas eliminar esta cita?')) {
      deleteAppointment(id);
    }
  };

  const handleEditContent = (field: keyof typeof content) => {
    setEditingContent(field);
    setContentForm({ ...content });
  };

  const handleSaveContent = () => {
    if (editingContent) {
      updateContent(editingContent as keyof typeof content, contentForm[editingContent as keyof typeof content]);
      setEditingContent(null);
    }
  };

  const renderAppointments = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Citas Programadas</h2>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-gray-600">Nombre</th>
              <th className="p-4 text-left text-sm font-medium text-gray-600">Servicio</th>
              <th className="p-4 text-left text-sm font-medium text-gray-600">Fecha</th>
              <th className="p-4 text-left text-sm font-medium text-gray-600">Estado</th>
              <th className="p-4 text-left text-sm font-medium text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app.id} className="border-b">
                <td className="p-4">{app.name}</td>
                <td className="p-4">{app.service}</td>
                <td className="p-4">{app.date}</td>
                <td className="p-4 capitalize">{app.status}</td>
                <td className="p-4 space-x-2">
                  {app.status === 'pending' && (
                    <button onClick={() => handleUpdateAppointment(app.id, 'confirmed')} className="text-blue-600">
                      <Check className="w-4 h-4 inline-block" />
                    </button>
                  )}
                  {app.status === 'confirmed' && (
                    <button onClick={() => handleUpdateAppointment(app.id, 'completed')} className="text-green-600">
                      <Check className="w-4 h-4 inline-block" />
                    </button>
                  )}
                  <button onClick={() => handleDeleteAppointment(app.id)} className="text-red-600">
                    <Trash2 className="w-4 h-4 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Mensajes de Contacto</h2>
      {contacts.map(contact => (
        <div key={contact.id} className="bg-white p-6 rounded-xl shadow">
          <p><strong>Nombre:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Asunto:</strong> {contact.subject}</p>
          <p className="mt-2 text-gray-700">{contact.message}</p>
        </div>
      ))}
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contenido del Sitio</h2>
      {Object.entries(content).map(([key, value]) => (
        <div key={key} className="bg-white p-6 rounded-xl shadow">
          <h4 className="text-lg font-semibold capitalize">{key}</h4>
          {editingContent === key ? (
            <>
              <textarea
                className="w-full p-3 border rounded-lg mt-2"
                rows={4}
                value={contentForm[key as keyof typeof content]}
                onChange={(e) => setContentForm(prev => ({ ...prev, [key]: e.target.value }))}
              />
              <div className="space-x-2 mt-2">
                <button onClick={handleSaveContent} className="bg-green-600 text-white px-4 py-2 rounded-lg">Guardar</button>
                <button onClick={() => setEditingContent(null)} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancelar</button>
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center mt-2">
              <p>{value}</p>
              <button onClick={() => handleEditContent(key as keyof typeof content)} className="text-blue-600 hover:underline">Editar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderCartStatus = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Estado del Carrito</h2>
      <p className="bg-white p-6 rounded-xl shadow text-gray-600">Implementación pendiente para mostrar estado del carrito de compras o mantenimiento.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <Link to="/admin" className="text-gray-600 hover:text-blue-600 flex items-center space-x-2">
          <ArrowLeft className="h-5 w-5" />
          <span>Volver</span>
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Configuración Administrativa</h1>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <nav className="bg-white rounded-xl shadow-lg p-6 space-y-2">
            <button onClick={() => setActiveTab('appointments')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${activeTab === 'appointments' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
              <Calendar className="h-5 w-5" /> <span>Citas</span>
            </button>
            <button onClick={() => setActiveTab('contacts')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${activeTab === 'contacts' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
              <Mail className="h-5 w-5" /> <span>Mensajes</span>
            </button>
            <button onClick={() => setActiveTab('content')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${activeTab === 'content' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
              <Edit className="h-5 w-5" /> <span>Contenido</span>
            </button>
            <button onClick={() => setActiveTab('cart')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${activeTab === 'cart' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
              <Users className="h-5 w-5" /> <span>Carrito</span>
            </button>
          </nav>

          <div className="lg:col-span-3">
            {activeTab === 'appointments' && renderAppointments()}
            {activeTab === 'contacts' && renderContacts()}
            {activeTab === 'content' && renderContent()}
            {activeTab === 'cart' && renderCartStatus()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminConfig;
