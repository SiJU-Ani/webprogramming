import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#004D40',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
    },
    formContainer: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    title: {
        color: '#004D40',
        marginBottom: '30px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: '600'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        color: '#333',
        fontSize: '14px',
        fontWeight: '500'
    },
    input: {
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
        '&:focus': {
            outline: 'none',
            borderColor: '#004D40'
        }
    },
    button: {
        backgroundColor: '#004D40',
        color: 'white',
        padding: '12px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: '#00695C'
        },
        '&:disabled': {
            backgroundColor: '#ccc',
            cursor: 'not-allowed'
        }
    },
    error: {
        color: '#d32f2f',
        fontSize: '14px',
        marginTop: '10px',
        textAlign: 'center'
    },
    link: {
        color: '#004D40',
        textDecoration: 'none',
        fontSize: '14px',
        textAlign: 'center',
        marginTop: '20px',
        display: 'block',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
};

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationError, setValidationError] = useState('');
    const { register, error } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setValidationError('');
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setValidationError('Passwords do not match');
            return false;
        }
        if (formData.password.length < 6) {
            setValidationError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        try {
            console.log('Attempting registration with:', {
                username: formData.username,
                email: formData.email,
                password: '***' // Don't log actual password
            });
            
            const success = await register(
                formData.username,
                formData.email,
                formData.password
            );
            
            if (success) {
                navigate('/');
            } else {
                console.log('Registration failed without throwing an error');
            }
        } catch (err) {
            console.error('Registration error in component:', err);
            setValidationError(err.message || 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Create Account</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            minLength="3"
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength="6"
                            style={styles.input}
                        />
                    </div>
                    {(validationError || error) && (
                        <div style={styles.error}>
                            {validationError || error}
                        </div>
                    )}
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        style={{
                            ...styles.button,
                            ...(isSubmitting ? styles.button['&:disabled'] : {})
                        }}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                <a href="/login" style={styles.link}>Already have an account? Login here</a>
            </div>
        </div>
    );
};

export default Register; 