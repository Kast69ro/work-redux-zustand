import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
      <h1>Здравствуйте! <br />
Используйте навигацию, чтобы перейти к нужному разделу!</h1>
      

      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
        <Card link="/" title="Home" />
        <Card link="/redux-sync" title="Redux Sync" />
        <Card link="/redux-async" title="Redux Async" />
        <Card link="/zustand-sync" title="Zustand Sync" />
        <Card link="/zustand-async" title="Zustand Async" />
      </div>
    </div>
  );
}

function Card({ link, title }) {
  return (
    <Link to={link} style={{
      padding: 20,
      minWidth: 160,
      borderRadius: 12,
      backgroundColor: '#f0f4ff',
      boxShadow: '0 4px 10px rgba(26, 115, 232, 0.2)',
      textDecoration: 'none',
      color: '#1a73e8',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.2s',
    }} 
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      {title}
    </Link>
  );
}


export default Home;
