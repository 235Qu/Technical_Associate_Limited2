import React from 'react';
import '../styles/Home.css';

const Home = () => (
  <div className="home">
    {/* Hero Section */}
    <header className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Technical Associated Limited</h1>
        <p>Your trusted partner in innovation and excellence.</p>
        <button className="cta-button">Learn More</button>
      </div>
    </header>

    {/* About Section */}
    <section className="about-section">
      <h2>About Us</h2>
      <p>
        Technical Associated Limited is a leader in delivering cutting-edge
        solutions for various industries. We are committed to quality and
        innovation, ensuring customer satisfaction.
      </p>
    </section>

    {/* Services Section */}
    <section className="services-section">
      <h2>Our Services</h2>
      <div className="service-cards">
        <div className="card">
          <h3>IT Solutions</h3>
          <p>Comprehensive IT services tailored to your business needs.</p>
        </div>
        <div className="card">
          <h3>Consulting</h3>
          <p>Expert advice to streamline your operations and strategy.</p>
        </div>
        <div className="card">
          <h3>Project Management</h3>
          <p>End-to-end project management for seamless execution.</p>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="footer">
      <p>© 2024 Technical Associated Limited. All rights reserved.</p>
    </footer>
  </div>
);

export default Home;
