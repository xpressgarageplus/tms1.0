// frontend/js/reset.js
document.getElementById('setPasswordForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const newPassword = document.getElementById('newPassword').value;
  const res = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword })
  });
  const data = await res.json();
  if (res.ok) {
    alert('✅ Password reset successful');
    window.location.href = '/login.html';
  } else {
    alert(data.error || 'Reset failed');
  }
});