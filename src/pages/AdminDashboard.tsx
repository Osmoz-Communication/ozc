import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { Plus, Edit, Trash2, Save, X, Image, FileText, Users, Briefcase } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { services, sectors, portfolioItems, newsArticles, addContentItem, deleteContentItem } = useContent();
  const [activeTab, setActiveTab] = useState('services');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    date: '',
    content: ''
  });

  const handleAddItem = () => {
    addContentItem(activeTab, newItem);
    setNewItem({ title: '', description: '', image: '', category: '', date: '', content: '' });
    setIsAddingItem(false);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      deleteContentItem(activeTab, id);
    }
  };

  const tabs = [
    { id: 'services', label: 'Services', icon: Briefcase, data: services },
    { id: 'sectors', label: 'Secteurs', icon: Users, data: sectors },
    { id: 'portfolio', label: 'Portfolio', icon: Image, data: portfolioItems },
    { id: 'news', label: 'Actualités', icon: FileText, data: newsArticles }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Administration Osmoz Communication</h1>
              <p className="text-slate-300 mt-2">Gestion du contenu du site web</p>
            </div>
            <a
              href="/"
              className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Retour au site
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-lime-500 text-lime-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                  <span className="bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                    {tab.data.length}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsAddingItem(true)}
            className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Ajouter un élément
          </button>
        </div>

        {/* Add Form */}
        {isAddingItem && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Ajouter un nouvel élément - {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <button
                onClick={() => setIsAddingItem(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  placeholder="Titre de l'élément"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  placeholder="Catégorie"
                />
              </div>

              {activeTab === 'portfolio' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL de l'image</label>
                  <input
                    type="url"
                    value={newItem.image}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}

              {activeTab === 'news' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newItem.date}
                    onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="Description de l'élément"
              />
            </div>

            {activeTab === 'news' && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
                <textarea
                  value={newItem.content}
                  onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  placeholder="Contenu complet de l'article"
                />
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleAddItem}
                className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                <Save size={20} className="mr-2" />
                Sauvegarder
              </button>
              <button
                onClick={() => setIsAddingItem(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Annuler
              </button>
            </div>
          </motion.div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tabs.find(t => t.id === activeTab)?.data.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-lime-600 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {item.category && (
                  <div className="mb-3">
                    <span className="bg-lime-100 text-lime-700 px-2 py-1 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                )}

                {item.date && (
                  <div className="mb-3 text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString('fr-FR')}
                  </div>
                )}

                <p className="text-slate-600 text-sm line-clamp-3">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {tabs.find(t => t.id === activeTab)?.data.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              {tabs.find(t => t.id === activeTab)?.icon && 
                React.createElement(tabs.find(t => t.id === activeTab)!.icon, { size: 48 })
              }
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Aucun élément
            </h3>
            <p className="text-slate-600 mb-6">
              Commencez par ajouter votre premier élément dans cette section.
            </p>
            <button
              onClick={() => setIsAddingItem(true)}
              className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Ajouter un élément
            </button>
          </div>
        )}
      </div>
    </div>
  );
};