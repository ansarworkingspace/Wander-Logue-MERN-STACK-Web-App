import React from 'react';
import Modal from 'react-modal';
import '../css/model.css'


const DeleteConfirmationModal = ({ isOpen, closeModal, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Delete Confirmation"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h3>Confirm Delete</h3>
      <p>Are you sure you want to delete this blog?</p>
      <div className="modal-buttons">
        <button onClick={onDelete}>Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
