import React, { useState } from 'react';

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
 
  const [submitted, setSubmitted] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your server
    console.log('Reservation submitted:', formData);
    setSubmitted(true);
  };
 
  const availableTimes = [
    '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
  ];

  // Styles
  const styles = {
    container: {
      backgroundColor: '#0A3E42', // teal-900
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    },
    nav: {
      backgroundColor: 'black',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    navLinks: {
      display: 'flex',
      gap: '24px'
    },
    navLink: {
      color: 'white',
      textDecoration: 'none'
    },
    activeNavLink: {
      color: '#FFD700', // yellow-300
      textDecoration: 'none'
    },
    navButtons: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    header: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '64px 16px'
    },
    heading: {
      fontSize: '48px',
      fontWeight: '300',
      marginBottom: '16px'
    },
    subheading: {
      fontSize: '20px',
      maxWidth: '800px'
    },
    formSection: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px 64px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '32px'
    },
    formContainer: {
      flex: '1 1 500px'
    },
    infoContainer: {
      flex: '1 1 400px'
    },
    card: {
      backgroundColor: '#0F6B73', // teal-800
      padding: '32px',
      borderRadius: '8px'
    },
    formTitle: {
      fontSize: '24px',
      marginBottom: '24px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#0D565C', // teal-700
      border: 'none',
      borderRadius: '4px',
      color: 'white'
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: '16px',
      gap: '16px'
    },
    column: {
      flex: '1 1 200px'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#0D565C', // teal-700
      border: 'none',
      borderRadius: '4px',
      color: 'white',
      height: '128px',
      resize: 'vertical'
    },
    button: {
      backgroundColor: '#FFD700', // yellow-300
      color: '#0A3E42', // teal-900
      padding: '12px 24px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px'
    },
    infoTitle: {
      fontSize: '24px',
      marginBottom: '24px'
    },
    infoSection: {
      marginBottom: '32px'
    },
    infoSectionTitle: {
      fontSize: '18px',
      marginBottom: '12px',
      borderBottom: '1px solid #0D565C',
      paddingBottom: '8px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '8px'
    },
    list: {
      paddingLeft: '20px',
      marginTop: '8px',
      listStyle: 'disc'
    },
    listItem: {
      marginBottom: '8px'
    },
    highlight: {
      color: '#FFD700' // yellow-300
    },
    imageSection: {
      backgroundColor: '#0F6B73', // teal-800
      padding: '64px 0'
    },
    imageContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px',
      display: 'flex',
      justifyContent: 'center'
    },
    image: {
      borderRadius: '8px',
      maxWidth: '100%',
      height: 'auto'
    },
    footer: {
      backgroundColor: 'black',
      color: 'white',
      padding: '48px 0'
    },
    footerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px',
      display: 'flex',
      flexWrap: 'wrap'
    },
    footerColumn: {
      flex: '1 1 300px',
      marginBottom: '32px'
    },
    footerTitle: {
      fontSize: '18px',
      marginBottom: '16px'
    },
    footerText: {
      marginBottom: '8px',
      color: '#D1D5DB' // gray-300
    },
    socialLinks: {
      display: 'flex',
      gap: '16px',
      marginTop: '16px'
    },
    subscribeForm: {
      display: 'flex'
    },
    subscribeInput: {
      padding: '8px 12px',
      backgroundColor: '#1F2937', // gray-800
      border: 'none',
      borderRadius: '4px 0 0 4px',
      color: 'white',
      flex: '1'
    },
    subscribeButton: {
      backgroundColor: '#FFD700', // yellow-300
      color: 'black',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '0 4px 4px 0',
      cursor: 'pointer'
    },
    copyright: {
      borderTop: '1px solid #374151', // gray-700
      marginTop: '48px',
      paddingTop: '32px',
      textAlign: 'center',
      color: '#9CA3AF' // gray-400
    }
  };
 
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.heading}>Reservations</h1>
        <p style={styles.subheading}>
          Secure your table and prepare for an extraordinary culinary journey through our French-inspired cuisine.
          Each reservation is carefully managed to ensure an exceptional dining experience.
        </p>
      </header>
     
      {/* Reservation Form */}
      <section style={styles.formSection}>
        <div style={styles.formContainer}>
          {submitted ? (
            <div style={styles.card}>
              <h2 style={styles.formTitle}>Thank You!</h2>
              <p style={{ marginBottom: '24px' }}>Your reservation request has been submitted. We will contact you shortly to confirm your reservation.</p>
              <div style={{ marginBottom: '16px' }}>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Date:</strong> {formData.date}</p>
                <p><strong>Time:</strong> {formData.time}</p>
                <p><strong>Party Size:</strong> {formData.guests} guests</p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                style={styles.button}
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.card}>
              <h2 style={styles.formTitle}>Book Your Table</h2>
             
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
             
              <div style={styles.row}>
                <div style={styles.column}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.column}>
                  <label style={styles.label}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
              </div>
             
              <div style={styles.row}>
                <div style={styles.column}>
                  <label style={styles.label}>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.column}>
                  <label style={styles.label}>Time</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  >
                    <option value="" disabled>Select a time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
             
              <div style={styles.formGroup}>
                <label style={styles.label}>Number of Guests</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  style={styles.input}
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                  ))}
                  <option value="9+">9+ people (we'll contact you)</option>
                </select>
              </div>
             
              <div style={{ marginBottom: '24px' }}>
                <label style={styles.label}>Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="Allergies, special occasions, seating preferences..."
                ></textarea>
              </div>
             
              <button
                type="submit"
                style={styles.button}
              >
                Reserve Now
              </button>
            </form>
          )}
        </div>
       
        <div style={styles.infoContainer}>
          <div style={{...styles.card, height: '100%'}}>
            <h2 style={styles.infoTitle}>Reservation Information</h2>
           
            <div style={styles.infoSection}>
              <h3 style={styles.infoSectionTitle}>Hours of Operation</h3>
              <div style={styles.grid}>
                <div>Monday - Thursday</div>
                <div>11:30 AM - 2:30 PM, 5:30 PM - 9:00 PM</div>
               
                <div>Friday - Saturday</div>
                <div>11:30 AM - 2:30 PM, 5:30 PM - 10:00 PM</div>
               
                <div>Sunday</div>
                <div>11:30 AM - 3:00 PM, 5:00 PM - 8:30 PM</div>
              </div>
            </div>
           
            <div style={styles.infoSection}>
              <h3 style={styles.infoSectionTitle}>Policies</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>Reservations are held for 15 minutes past the scheduled time.</li>
                <li style={styles.listItem}>For parties of 8 or more, please call us directly.</li>
                <li style={styles.listItem}>A credit card is required for reservations on weekends and holidays.</li>
                <li style={styles.listItem}>Cancellations must be made at least 24 hours in advance.</li>
              </ul>
            </div>
           
            <div>
              <h3 style={styles.infoSectionTitle}>Get in Touch</h3>
              <p style={{ marginBottom: '8px' }}>For immediate assistance or larger parties:</p>
              <p style={{ ...styles.highlight, fontSize: '18px', marginBottom: '16px' }}>(555) 123-4567</p>
              <p style={{ marginBottom: '8px' }}>For general inquiries:</p>
              <p style={{ ...styles.highlight, fontSize: '18px' }}>reservations@yourrestaurant.com</p>
            </div>
          </div>
        </div>
      </section>
     
      {/* Featured Image */}
      <div style={styles.imageSection}>
        <div style={styles.imageContainer}>
          <img
            src="/images/restaurant-interior.jpg"
            alt="Restaurant interior"
            style={{ borderRadius: '8px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationPage; 