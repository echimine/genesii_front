import { create } from 'zustand';

export interface Contact {
  id_contact: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface ContactStore {
  contacts: Contact[]; // les données
  loading: boolean; // l'état de chargement
  fetchContacts: () => Promise<void>; // récupère les contacts depuis l'API
  addContact: (
    newContact: NewContact
  ) => Promise<{ success: boolean; message: string }>;
}

export type NewContact = Omit<Contact, 'id_contact'>;

export const useContactStore = create<ContactStore>((set) => ({
  contacts: [],
  loading: false,

  fetchContacts: async () => {
    set({ loading: true }); // on dit qu'on est en train de charger
    try {
      const res = await fetch('https://genesii-api.onrender.com/contacts');
      const data = await res.json();
      set({ contacts: data }); // on remplit notre liste
    } catch (err) {
      console.error('Erreur fetch :', err);
    } finally {
      set({ loading: false }); // on arrête le chargement
    }
  },

  addContact: async (newContact) => {
    try {
      const res = await fetch('https://genesii-api.onrender.com/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact),
      });

      if (!res.ok) throw new Error('Erreur lors de l’ajout du contact.');

      const created = await res.json();
      set((state) => ({ contacts: [...state.contacts, created] }));

      return { success: true, message: 'Contact ajouté avec succès !' };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Erreur : impossible d’ajouter le contact.',
      };
    }
  },
}));
