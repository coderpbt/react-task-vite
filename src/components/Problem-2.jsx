
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from './Modal/Modal';

const Problem2 = () => {
  const [contacts, setContacts] = useState([]);
  const [usContacts, setUsContacts] = useState([]);
  const [modal, setModal] = useState(null);
  const [showEvenOnly, setShowEvenOnly] = useState(false);

  // Get initial contacts from API
  useEffect(() => {
    fetchContacts();
    fetchUsContacts();
  }, []);

  // Fetch all contacts from API
  const fetchContacts = async () => {
    const res = await fetch('https://contact.mediusware.com/api/contacts/');
    const data = await res.json();
    setContacts(data);
  };

  // Fetch US contacts from API
  const fetchUsContacts = async () => {
    const res = await fetch(
      `https://contact.mediusware.com/api/country-contacts/United States/`
    );
    const data = await res.json();
    setUsContacts(data);
  };


  return (
    <div className="container">
      <div className="row text-center mt-3">
        <div className="col-lg-12">
          <button
            className="btn btn-primary me-3"
            onClick={() => setModal('all')}
          >
            All Contacts
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setModal('us')}
          >
            US Contacts
          </button>
        </div>
      </div>
      <div className="row">
        {modal === 'all' && (
          <Modal
            contacts={contacts}

            modal="all"
            setModal={setModal}
            showEvenOnly={showEvenOnly}
          />
        )}
        {modal === 'us' && (
          <Modal
            contacts={usContacts}
            modal="us"
            setModal={setModal}
          />
        )}
      </div>
      <div className="row text-center mt-3">
        <label>
          <input
            type="checkbox"
            checked={showEvenOnly}
            onChange={(e) => setShowEvenOnly(e.target.checked)}
          />
          Only even
        </label>
      </div>
    </div>
  );
}

export default Problem2;
