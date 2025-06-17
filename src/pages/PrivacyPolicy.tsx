import React from 'react';
import { HeroSection } from '../components/HeroSection';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <HeroSection 
        title="Politique de Confidentialité"
        subtitle="Protection de vos données personnelles et respect de votre vie privée"
        backgroundImage="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800"
      />
      
      <div className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="px-6 py-8 sm:p-10 prose prose-lg text-gray-600 max-w-none">
              <p>
                La présente Politique de Confidentialité décrit la manière dont Groupe Osmoz Communication (ci-après "nous", "notre" ou "nos") collecte, utilise et protège les informations que vous nous transmettez lorsque vous utilisez le site web <a href="https://www.ozc.fr" className="text-brand-600 hover:text-brand-700">www.ozc.fr</a> (ci-après "le Site").
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Responsable du traitement</h2>
              <p>
                Le responsable du traitement des données personnelles collectées sur le Site est :
                <br />
                <strong>Groupe Osmoz Communication</strong>
                <br />
                3B Boulevard de la Marne
                <br />
                77120 COULOMMIERS
                <br />
                Email : <a href="mailto:contact@ozc.fr" className="text-brand-600 hover:text-brand-700">contact@ozc.fr</a>
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Collecte de l'information</h2>
              <p>
                Nous collectons des informations lorsque vous utilisez le formulaire de contact sur notre Site. Les informations collectées incluent votre nom, votre adresse e-mail, votre numéro de téléphone, et le contenu de votre message.
              </p>
              <p>
                En outre, nous recevons et enregistrons automatiquement des informations à partir de votre ordinateur et navigateur, y compris votre adresse IP, votre type de navigateur, et la page que vous demandez, à des fins de statistiques et d'amélioration du service.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Utilisation des informations</h2>
              <p>Toute les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
              <ul>
                <li>Répondre à votre demande de contact ou de devis.</li>
                <li>Améliorer notre site Web.</li>
                <li>Vous contacter par e-mail ou par téléphone pour le suivi de votre demande.</li>
              </ul>
              <p>
                La base légale de ce traitement est votre consentement (pour la prise de contact) et notre intérêt légitime (pour l'amélioration de nos services).
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Durée de conservation</h2>
              <p>
                Les données personnelles collectées via le formulaire de contact sont conservées pour la durée nécessaire au traitement de votre demande, et au maximum pendant 3 ans après notre dernier contact.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Divulgation à des tiers</h2>
              <p>
                Nous sommes les seuls propriétaires des informations recueillies sur ce Site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande (par exemple, la transmission d'informations à un transporteur pour une livraison) ou des obligations légales.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Protection des informations</h2>
              <p>
                Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage SSL pour protéger les informations sensibles transmises en ligne. Seuls les employés qui ont besoin d'effectuer un travail spécifique (par exemple, la facturation ou le service à la clientèle) ont accès aux informations personnelles identifiables. Les ordinateurs et serveurs utilisés pour stocker des informations personnelles identifiables sont conservés dans un environnement sécurisé.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Vos droits</h2>
              <p>
                Conformément à la loi "Informatique et Libertés" et au RGPD, vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul>
                  <li>Droit d'accès</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement (droit à l'oubli)</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit d'opposition</li>
              </ul>
              <p>
                Pour exercer ces droits, vous pouvez nous contacter par email à <a href="mailto:contact@ozc.fr" className="text-brand-600 hover:text-brand-700">contact@ozc.fr</a> ou par courrier à l'adresse mentionnée au point 1.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Cookies</h2>
              <p>
                Le Site peut utiliser des cookies à des fins statistiques et d'amélioration de l'expérience utilisateur. Un cookie est un petit fichier texte stocké sur votre ordinateur. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela pourrait affecter votre capacité à utiliser certaines parties du Site.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Consentement</h2>
              <p>
                En utilisant notre Site, vous consentez à notre politique de confidentialité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 