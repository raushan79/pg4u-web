import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const PGDetails = () => {
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');
  const [bookingMsg, setBookingMsg] = useState('');

  useEffect(() => {
    const fetchPG = async () => {
      try {
        const res = await api.get(`/pgs/${id}`);
        setPg(res.data);
      } catch (err) {
        setError('Failed to load PG details');
      } finally {
        setLoading(false);
      }
    };
    fetchPG();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingMsg('');
    try {
      await api.post('/bookings', { pgId: id, date });
      setBookingMsg('Booking successful!');
    } catch (err) {
      setBookingMsg('Booking failed.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!pg) return <div>No PG found.</div>;

  return (
    <div>
      <h1>{pg.name}</h1>
      <p>{pg.address}</p>
      <p>{pg.description}</p>
      <form onSubmit={handleBooking}>
        <label>Booking Date:</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <button>Book Now</button>
      </form>
      {bookingMsg && <div>{bookingMsg}</div>}
    </div>
  );
};

export default PGDetails;
