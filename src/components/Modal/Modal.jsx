import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modal = ({ contacts, modal, setModal, showEvenOnly }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  const closeModal = () => {
    setModal(null);
    setSelectedContact(null);
  };

  const openContactModal = (contact) => {
    setSelectedContact(contact);
  };

  const filteredContacts = contacts?.results?.filter((contact) => {
    return contact.country.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (!showEvenOnly || contact.id % 2 === 0);
  });

  return (
    <div className={`modal ${modal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search contacts"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-body">
            <ul className="list-group">
              {filteredContacts?.map((contact) => (
                <li
                  key={contact.id}
                  className="list-group-item list-group-item-action d-flex align-items-center"
                  onClick={() => openContactModal(contact)}
                >
                  <p className='me-3'>{contact.id} </p>
                  <h3>{contact.country.name}</h3>
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={() => setModal('all')}>
              All Contacts
            </button>
            <button className="btn btn-warning" onClick={() => setModal('us')}>
              US Contacts
            </button>
            <button className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
          </div>
          {/* contact details modal       */}
          {selectedContact && (
            <div
              className={`modal ${selectedContact !== null ? 'show' : ''}`}
              tabIndex="-1"
              role="dialog"
              style={{ display: selectedContact !== null ? 'block' : 'none' }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Contact Details</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setSelectedContact(null)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Contact Name: {selectedContact.country.name}</p>
                    <p>Contact Phone: {selectedContact.phone}</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setSelectedContact(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Modal;
