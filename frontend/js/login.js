document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username')?.value;
  const password = document.getElementById('password')?.value;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Login failed');
      return;
    }

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('userRole', data.user?.role || 'user');

    const role = (data.user?.role || '').toLowerCase();

    if (role === 'admin') {
      window.location.href = '/dashboard.html';
    } else if (role === 'driver') {
      window.location.href = '/driver-dashboard.html';
    } else {
      alert('Unknown role. Access denied.');
    }

  } catch (err) {
    alert('Error: ' + err.message);
  }
});