// frontend/js/auth.js
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    window.location.href = data.user.role === 'admin' ? '/dashboard.html' : '/driver-dashboard.html';
  } else {
    alert(data.error || 'Login failed');
  }
});

document.getElementById('resetForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('resetEmail').value;
  const res = await fetch('/api/auth/request-password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  alert(res.ok ? '📧 Reset link sent' : (data.error || 'Error sending reset link'));
});