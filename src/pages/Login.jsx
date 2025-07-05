const handleLogin = async (e) => {
  e.preventDefault();
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }), // get from state
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('accessToken', data.accessToken);
    // Redirect or show dashboard
  } else {
    alert(data.error || 'Login failed');
  }
};
