import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // 🔐 redirect to login if not authenticated
    }
  }, [navigate]);

  return <div className="p-6">Welcome to the Dashboard</div>;
}
