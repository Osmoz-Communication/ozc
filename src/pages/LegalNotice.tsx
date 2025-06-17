import React from 'react';
import { HeroSection } from '../components/HeroSection';

export const LegalNotice: React.FC = () => {
  return (
    <div>
      <HeroSection 
        title="Mentions Légales"
        subtitle="Informations légales et conditions d'utilisation du site"
        backgroundImage="https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800"
      />
      
      <div className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Identité</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p><strong>Nom du site web :</strong> Osmoz Communication</p>
                    <p><strong>Adresse du site :</strong> <a href="https://www.ozc.fr" className="text-brand-600 hover:text-brand-700">https://www.ozc.fr</a></p>
                    <p>Le site www.ozc.fr est la propriété de la société :</p>
                    <p>
                      <strong>Groupe Osmoz Communication</strong><br />
                      3B Boulevard de la Marne<br />
                      77120 COULOMMIERS<br />
                      FRANCE<br />
                      Tél : 01 84 19 01 04<br />
                      Email : <a href="mailto:contact@ozc.fr" className="text-brand-600 hover:text-brand-700">contact@ozc.fr</a>
                    </p>
                    <p>
                      <strong>TVA intracommunautaire :</strong> FR 86 800 216 301<br />
                      <strong>SIRET :</strong> 800 216 301 000 39<br />
                      <strong>Code APE :</strong> 7021Z<br />
                      <strong>Numéro RCS :</strong> Meaux B 800 216 301
                    </p>
                    <p>
                      Le directeur de la publication du site Internet est Monsieur <strong>Jean-Marc DUMINIL</strong>, en qualité du représentant légal de la société GROUPE OSMOZ COMMUNICATION. Il est joignable par email à l'adresse <a href="mailto:jm.duminil@ozc.fr" className="text-brand-600 hover:text-brand-700">jm.duminil@ozc.fr</a>.
                    </p>
                    <p>
                      L'hébergeur de ce site web est la société <strong>OVH SAS</strong>, une filiale de la société OVH Groupe SA, société immatriculée au RCS de Lille sous le numéro 537 407 926 sise 2, rue Kellermann, 59100 Roubaix.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Conditions d'utilisation</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p>
                      L'utilisation du présent site implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Informations</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p>
                      Les informations et documents du site sont présentés à titre indicatif, sans de caractère exhaustif, et ne peuvent engager la responsabilité du propriétaire du site.
                    </p>
                    <p>
                      Le propriétaire du site ne peut être tenu responsable des dommages directs et indirects consécutifs à l'accès au site.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Interactivité</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p>
                      Les utilisateurs du site peuvent y déposer du contenu, apparaissant sur le site dans des espaces dédiés (notamment via les commentaires). Le contenu déposé reste sous la responsabilité de leurs auteurs, qui en assument pleinement l'entière responsabilité juridique.
                    </p>
                    <p>
                      Le propriétaire du site se réserve néanmoins le droit de retirer sans préavis et sans justification tout contenu déposé par les utilisateurs qui ne satisferait pas à la charte déontologique du site ou à la législation en vigueur.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Propriété intellectuelle</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p>
                      Sauf mention contraire, tous les éléments accessibles sur le site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) restent la propriété exclusive de leurs auteurs, en ce qui concerne les droits de propriété intellectuelle ou les droits d'usage.
                    </p>
                    <p>
                      Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'auteur.
                    </p>
                    <p>
                      Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient est considérée comme constitutive d'une contrefaçon et passible de poursuites.
                    </p>
                    <p>
                      Les marques et logos reproduits sur le site sont déposés par les sociétés qui en sont propriétaires.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Liens</h2>
                  <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Liens sortants</h3>
                  <div className="prose prose-lg text-gray-600">
                    <p>
                      Le propriétaire du site décline toute responsabilité et n'est pas engagé par le référencement via des liens hypertextes, de ressources tierces présentes sur le réseau Internet, tant en ce qui concerne leur contenu que leur pertinence.
                    </p>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Liens entrants</h3>
                  <div className="prose prose-lg text-gray-600">
                    <p>
                      Le propriétaire du site autorise les liens hypertextes vers l'une des pages de ce site, à condition que ceux-ci ouvrent une nouvelle fenêtre et soient présentés de manière non équivoque afin d'éviter :
                    </p>
                    <ul className="list-disc pl-5">
                      <li>tout risque de confusion entre le site citant et le propriétaire du site</li>
                      <li>ainsi que toute présentation tendancieuse, ou contraire aux lois en vigueur.</li>
                    </ul>
                    <p>
                      Le propriétaire du site se réserve le droit de demander la suppression d'un lien s'il estime que le site source ne respecte pas les règles ainsi définies.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Confidentialité</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p>
                      Tout utilisateur dispose d'un droit d'accès, de rectification et d'opposition aux données personnelles le concernant, en effectuant sa demande écrite et signée, accompagnée d'une preuve d'identité.
                    </p>
                    <p>
                      Le site ne recueille pas d'informations personnelles, et n'est pas assujetti à déclaration à la CNIL.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Crédits</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p>
                      Sauf mention contraire, les photographies présentes sur le présent site sont la propriété de GROUPE OSMOZ COMMUNICATION.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 