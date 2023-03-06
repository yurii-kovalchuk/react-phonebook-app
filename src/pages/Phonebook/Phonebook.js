import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { changeValue } from '../../redux/filter/slice';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { ContactsList } from '../../components/ContactsList/ContactsList';
import { AppWrapper } from './Phonebook.styled';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts/selectors';
import { selectFilter } from 'redux/filter/selectors';
import {
  addContact,
  fetchContacts,
  deleteContact,
} from 'redux/contacts/operations';

export const Phonebook = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const addContacts = (name, phone) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
    } else {
      dispatch(addContact({ name, phone }));
    }
  };

  const deleteContacts = id => {
    dispatch(deleteContact(id));
  };

  const updateFilter = e => {
    dispatch(changeValue(e.target.value));
  };

  const filteredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  const vivsibleContacts = filteredContacts();

  return (
    <AppWrapper>
      <h1>Phonebook</h1>

      <ContactForm addContacts={addContacts} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={updateFilter} />
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactsList contacts={vivsibleContacts} onDelete={deleteContacts} />
    </AppWrapper>
  );
};
