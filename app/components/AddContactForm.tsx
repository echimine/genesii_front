'use client';
import { useState } from 'react';
import { useContactStore } from '../store/useContactStore';

export default function AddContactForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const addContact = useContactStore((state) => state.addContact);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await addContact(formData);
    setStatus(response);

    if (response.success) {
      setFormData({ first_name: '', last_name: '', email: '', phone: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Prénom" className="border p-2 w-full" />
      <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Nom" className="border p-2 w-full" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Téléphone" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Ajouter</button>

      {status && (
        <p className={`text-sm ${status.success ? 'text-green-600' : 'text-red-600'}`}>
          {status.message}
        </p>
      )}
    </form>
  );
}
