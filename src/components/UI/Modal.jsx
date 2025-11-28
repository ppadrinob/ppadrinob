import React from 'react';
import '../../styles/index.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out'
        }}>
            <div className="glass-panel" style={{
                width: '90%',
                maxWidth: '500px',
                padding: '2rem',
                position: 'relative',
                animation: 'slideUp 0.3s ease-out',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--text-primary)',
                        marginBottom: '0.5rem'
                    }}>
                        {title}
                    </h3>
                </div>

                <div style={{
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem',
                    lineHeight: '1.6'
                }}>
                    {children}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.75rem 2rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                            color: 'white',
                            fontWeight: '600',
                            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Entendido
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Modal;
