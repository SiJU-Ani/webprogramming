import React from 'react';
import './About.css';
import restaurantInterior from '../images/main-b.jpg';

const About = () => {
  return (
    <div className="about-page">
      <section className="main-content">
        <div className="text-area">
          <h2>SERVED EVERY DAY SINCE 1990</h2>
          <p>
            Wake up to the aroma of freshly brewed coffee and warm, delicious breakfast favorites. 
            From classic pancakes to hearty omelets, we serve up a menu full of comfort and flavor, 
            made with love and the finest ingredients. Whether you're here for a quick bite or a 
            leisurely morning, we've got the perfect dish to start your day right.
          </p>
        </div>
        <div className="image-section">
          <img 
            src={restaurantInterior}
            alt="Restaurant Interior" 
          />
        </div>
      </section>

      <section className="owners-info">
        <div className="info-card">
          <h3>Owner's Email</h3>
          <div className="info-content">
            <i className="fas fa-envelope"></i>
            <div className="details">
              <p className="primary-email">aleena.yogainder2023@vitstudent.ac.in</p>
              <p className="primary-email">shreyansh.srivastava2023@vitstudent.ac.in</p>
              <p className="primary-email">suryansh.behal2023@vitstudent.ac.in</p>
              <p className="primary-email">aakrisht.jainendra2023@vitstudent.ac.in</p>
              
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3>Registration Details</h3>
          <div className="info-content">
            <i className="fas fa-certificate"></i>
            <div className="details">
              <p className="reg-number">Reg. No: 23BAI1442</p>
              <p className="reg-number">Reg. No: 23BDS1003</p>
              <p className="reg-number">Reg. No: 23Bds1010</p>
              <p className="reg-number">Reg. No: 23BDS1149</p>

            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="contact-card">
          <h3>Billing</h3>

          <div className="contact-item">
            <i className="fab fa-instagram"></i>
            <span>7017442208</span>
            <span>8660722427</span>
            <span>AKS</span>
            <span>SURI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About; 