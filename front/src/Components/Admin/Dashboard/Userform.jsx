import React from 'react'
import { useState } from 'react';

const Userform = ({ user, onSave, onCancel }) => {
     const [selectedRole, setSelectedRole] = useState(user.role);
      const handleSubmit = (e) => {
        e.preventDefault();
        onSave(user._id, selectedRole); 
    };
  return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Modifier le rôle de "{user.pseudo}"</h2>
                <form onSubmit={handleSubmit} className="role-form">
                    <div className="form-group">
                        <label htmlFor="role-select">Rôle</label>
                        <select 
                            id="role-select"
                            value={selectedRole} 
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <option value="user">Utilisateur</option>
                            <option value="admin">Administrateur</option>
                            <option value="moderateur">Modérateur</option>
                            <option value="consultant">Consultant</option>
                            <option value="designer">Designer</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="cancel-btn">Annuler</button>
                        <button type="submit" className="save-btn">Sauvegarder</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Userform
