'use client';
import { useGet } from '../utils/useGet';

export default function ContactList() {
  const { data, loading, error } = useGet<any[]>('https://genesii-api.onrender.com/contacts');

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!data) return <p>Aucun contact trouvé.</p>;

  return (
   <ul className="space-y-2 p-4">
  {data.map((contact, index) => (
    <li key={contact.id ?? index} className="border p-2 rounded">
      {contact.first_name} {contact.last_name} - {contact.email} - {contact.phone}
    </li>
  ))}
</ul>

  );
}
