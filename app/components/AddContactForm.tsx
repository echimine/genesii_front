import { useState } from 'react';

interface AddContactFormProps {
  onAddContact: () => void;
}

export default function AddContactForm({ onAddContact }: AddContactFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://genesii-api.onrender.com/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l’ajout du contact');
      }

      setFormData({ first_name: '', last_name: '', email: '', phone: '' }); // reset le form

      onAddContact(); // 💥 Refresh la liste depuis le parent !
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input type="text" name="first_name" placeholder="Prénom" value={formData.first_name} onChange={handleChange} />
      <input type="text" name="last_name" placeholder="Nom" value={formData.last_name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input type="text" name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleChange} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
    </form>
  );
}
