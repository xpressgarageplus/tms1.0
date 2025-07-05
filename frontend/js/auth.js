<script>
  // LOGIN HANDLER
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Login successful');

      // ✅ Store tokens + role
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userRole', data.user?.role || 'user');

      // ✅ Redirect based on role or default
      window.location.href = '/dashboard.html';
    } else {
      alert(data.error || 'Login failed');
    }
  });

  // PASSWORD RESET REQUEST HANDLER
  document.getElementById('resetForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('resetEmail')?.value;

    const res = await fetch('/api/auth/request-password-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (res.ok) {
      alert('📧 Password reset email sent!');
    } else {
      alert(data.error || 'Failed to send reset email');
    }
  });
</script>
