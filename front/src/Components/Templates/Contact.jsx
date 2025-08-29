import React from 'react'

import React, { useState } from 'react';
import { Link } from 'react-router';
import URLS from '../utils/constants/URLS';
import './css/Contact.scss'; 
import INSTANCE from '../../utils/services/instance';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage({ type: '', text: 'Envoi en cours...' });
        try {
            const response = await INSTANCE.post(URLS.SEND_CONTACT_FORM, formData);
            setStatusMessage({ type: 'success', text: response.data.message });
            setFormData({ name: '', email: '', message: '' }); 
        } catch (error) {
            setStatusMessage({ type: 'error', text: error.response?.data?.message || 'Une erreur est survenue.' });
        }
    }
  return (
    <div className="contact-page-body">
            <div className="contact-container">
                <h1>Contactez-nous</h1>
                <p>Une question, une suggestion ? N'hésitez pas à nous laisser un message.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nom / Name *</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message *</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="6" required />
                    </div>
                    <button type="submit" className="submit-button">Envoyer</button>
                </form>
                {statusMessage.text && (
                    <p className={`status-message ${statusMessage.type}`}>{statusMessage.text}</p>
                )}
            </div>
        </div>
  )
}

export default Contact
