import { useState, useEffect, useRef } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const logContacts = JSON.parse(localStorage.getItem('contacts-log'));

  const [contacts, setContacts] = useState(
    logContacts || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  // useEffect(() => {
  //   const logContacts = JSON.parse(localStorage.getItem('contacts-log'));
  //   if (!logContacts) {
  //     return;
  //   } else {
  //     setContacts(logContacts);
  //   }
  // }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else {
      localStorage.setItem('contacts-log', JSON.stringify(contacts));
    }
  }, [contacts]);

  const addNewContact = (name, number) => {
    const newContact = {
      name: name,
      id: nanoid(),
      number: number,
    };

    if (contacts.find(el => el.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      setContacts([newContact, ...contacts]);
    }
  };

  const deleteContact = id => {
    setContacts(contacts.filter(item => item.id !== id));
  };

  const filterChange = evt => {
    setFilter(evt.target.value);
  };

  const getFilteredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(el =>
      el.name.toLowerCase().includes(normalizeFilter)
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 320,
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addNewContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onFilterChange={filterChange} />
      <ContactList
        data={getFilteredContacts()}
        onDeleteBtnClick={deleteContact}
      />
    </div>
  );
};
