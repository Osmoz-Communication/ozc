import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    console.log('Form submitted:', data);
    alert('Merci pour votre message ! Nous vous recontacterons rapidement.');
    reset();
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection 
        page="contact"
        defaultTitle="Contactez-nous"
        defaultSubtitle="Parlons de votre projet"
        defaultImage="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
      />

      {/* Contact Info & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-slate-800 mb-8">Nos Coordonnées</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Adresse</h3>
                    <p className="text-slate-600">
                      3B Boulevard de la Marne<br />
                      77120 Coulommiers, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Téléphone</h3>
                    <a href="tel:0184190104" className="text-slate-600 hover:text-brand-600 transition-colors">
                      01 84 19 01 04
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Email</h3>
                    <a href="mailto:contact@ozc.fr" className="text-slate-600 hover:text-brand-600 transition-colors">
                      contact@ozc.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Horaires</h3>
                    <p className="text-slate-600">
                      Lundi - Vendredi : 8h30 - 18h30<br />
                      Samedi - Dimanche : Fermé
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Nous localiser</h3>
                <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.2!2d3.0681546!3d48.8074568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e87e9a8b5b1b1b%3A0x1234567890abcdef!2s3B%20Boulevard%20de%20la%20Marne%2C%2077120%20Coulommiers%2C%20France!5e0!3m2!1sfr!2sfr!4v1699876543210"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Osmoz Communication - 3B Boulevard de la Marne, 77120 Coulommiers"
                  ></iframe>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h2 className="text-4xl font-bold text-slate-800 mb-8">Demande de Contact</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      {...register('name', { required: 'Le nom est requis' })}
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                      placeholder="Votre nom"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      {...register('email', { 
                        required: 'L\'email est requis',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Email invalide'
                        }
                      })}
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                      placeholder="votre@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                      placeholder="06 XX XX XX XX"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                      Entreprise
                    </label>
                    <input
                      {...register('company')}
                      type="text"
                      id="company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                      placeholder="Votre entreprise"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    {...register('subject', { required: 'Veuillez sélectionner un sujet' })}
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="devis">Demande de devis</option>
                    <option value="information">Demande d'information</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="recrutement">Recrutement</option>
                    <option value="autre">Autre</option>
                  </select>
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message', { required: 'Le message est requis' })}
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                >
                  <Send size={20} className="mr-2" />
                  Envoyer le message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-20 bg-brand-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Besoin d'une réponse rapide ?</h2>
            <p className="text-xl text-brand-100 mb-8 max-w-3xl mx-auto">
              Notre équipe est disponible pour répondre à vos questions et vous accompagner 
              dans vos projets. N'hésitez pas à nous appeler directement.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="tel:0184190104"
                className="bg-white text-brand-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
              >
                <Phone size={20} className="mr-2" />
                01 84 19 01 04
              </a>
              <a 
                href="mailto:contact@ozc.fr"
                className="border-2 border-white text-white hover:bg-white hover:text-brand-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                <Mail size={20} className="mr-2" />
                contact@ozc.fr
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};