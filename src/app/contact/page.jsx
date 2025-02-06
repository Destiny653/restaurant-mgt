'use client'
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setSubmitting(false);
        setSubmitted(true);
        
        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });

        // Reset success message after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="bg-gray-50 pt-24 pb-12 min-h-screen">
            <div className="mx-auto px-4 container">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 font-bold text-4xl">Contact Us</h1>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        Have questions? We'd love to hear from you. Send us a message
                        and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-6xl">
                    {/* Contact Information */}
                    <div className="bg-white shadow-sm p-8 rounded-xl">
                        <h2 className="mb-6 font-semibold text-2xl">Get in Touch</h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-yellow-500" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-medium text-lg">Our Location</h3>
                                    <p className="mt-1 text-gray-600">
                                        123 Restaurant Street<br />
                                        Foodie City, FC 12345
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <Phone className="w-6 h-6 text-yellow-500" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-medium text-lg">Phone Number</h3>
                                    <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <Mail className="w-6 h-6 text-yellow-500" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-medium text-lg">Email</h3>
                                    <p className="mt-1 text-gray-600">contact@restaurant.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <Clock className="w-6 h-6 text-yellow-500" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-medium text-lg">Hours</h3>
                                    <p className="mt-1 text-gray-600">
                                        Mon-Fri: 11:00 AM - 10:00 PM<br />
                                        Sat-Sun: 10:00 AM - 11:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white shadow-sm p-8 rounded-xl">
                        <h2 className="mb-6 font-semibold text-2xl">Send us a Message</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block mb-1 font-medium text-gray-700 text-sm">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="border-gray-300 px-4 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-yellow-500 w-full transition outline-none"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-1 font-medium text-gray-700 text-sm">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="border-gray-300 px-4 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-yellow-500 w-full transition outline-none"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block mb-1 font-medium text-gray-700 text-sm">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="border-gray-300 px-4 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-yellow-500 w-full transition outline-none"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block mb-1 font-medium text-gray-700 text-sm">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="border-gray-300 px-4 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-yellow-500 w-full transition outline-none"
                                    placeholder="Your message here..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium
                                    ${submitting 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-yellow-500 hover:bg-yellow-600 transition-colors'
                                    }`}
                            >
                                {submitting ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="ml-2 w-4 h-4" />
                                    </>
                                )}
                            </button>

                            {submitted && (
                                <div className="mt-4 text-center text-green-600">
                                    Thank you! Your message has been sent successfully.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;