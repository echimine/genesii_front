'use client';

import { useState, useEffect } from 'react';
import AddContactForm from './components/AddContactForm';

// 🧠 Interface TypeScript pour typer les données reçues de l’API
interface Contact {
  id_contact: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export default function Home() {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch('https://genesii-api.onrender.com/contacts');
      if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
      const result: Contact[] = await response.json();
      setData(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Liste des contacts</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : data.length > 0 ? (
        data.map((contact) => (
          <div key={contact.id_contact} className="p-4 border rounded-lg shadow">
            <p><strong>Nom :</strong> {contact.first_name} {contact.last_name}</p>
            <p><strong>Email :</strong> {contact.email}</p>
            <p><strong>Téléphone :</strong> {contact.phone}</p>
          </div>
        ))
      ) : (
        <p>Aucun contact trouvé.</p>
      )}

      <AddContactForm onAddContact={fetchData} />
    </main>
  );
}
