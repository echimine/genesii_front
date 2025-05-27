'use client';
import { useEffect, useState } from 'react';
import { useContactStore } from './store/useContactStore';
import AddContactForm from './components/AddContactForm';
import { ChevronDown, ChevronUp } from 'lucide-react'; // ou une flèche unicode si tu veux

export default function Home() {
  const { contacts, fetchContacts, loading } = useContactStore();
  const [showAll, setShowAll] = useState(false); // <-- état pour voir + ou non

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // on découpe les contacts selon showAll
  const visibleContacts = showAll ? contacts : contacts.slice(0, 6);

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Liste des contacts</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : contacts.length === 0 ? (
        <p>Aucun contact trouvé.</p>
      ) : (
        <>
          {visibleContacts.map((contact, index) => (
            <div key={contact.id_contact} className="p-4 border-2 rounded-lg shadow">
              <p><strong>{index + 1}.</strong> {contact.first_name} {contact.last_name}</p>
              <p><strong>Email :</strong> {contact.email}</p>
              <p><strong>Téléphone :</strong> {contact.phone}</p>
            </div>
          ))}

          {/* flèche pour "voir plus" ou "voir moins" */}
          {contacts.length > 6 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              {showAll ? (
                <>
                  Voir moins <ChevronUp size={20} />
                </>
              ) : (
                <>
                  Voir plus <ChevronDown size={20} />
                </>
              )}
            </button>
          )}
        </>
      )}

      <AddContactForm />
    </main>
  );
}
