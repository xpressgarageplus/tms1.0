// frontend/js/documents.js
document.getElementById('uploadForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('accessToken');
  const formData = new FormData(e.target);
  const res = await fetch('/api/documents/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });
  const data = await res.json();
  if (res.ok) {
    alert('✅ Upload successful');
    e.target.reset();
  } else {
    alert(data.error || 'Upload failed');
  }
});