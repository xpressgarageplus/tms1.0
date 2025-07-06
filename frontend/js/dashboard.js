document.addEventListener('DOMContentLoaded', () => {
  // Get token and setup headers
  const token = localStorage.getItem('accessToken');
  if (!token) {
    alert('You must be logged in.');
    window.location.href = '/login.html';
    return;
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // Display user role in header
  const [, payloadBase64] = token.split('.');
  const payload = JSON.parse(atob(payloadBase64));
  document.getElementById('userRole').textContent = payload.role || 'User';

  let currentPage = 1;

  // Load all loads with pagination
  function loadAllLoads(page = 1) {
    currentPage = page;
    fetch(`/api/loads?page=${page}&limit=10`, { headers })
      .then(res => res.json())
      .then(({ documents: loads, totalPages }) => {
        const tbody = document.getElementById('loadsTableBody');
        tbody.innerHTML = '';
        loads.forEach(load => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${load.id}</td>
            <td>${load.description || 'N/A'}</td>
            <td>${load.status}</td>
            <td>${load.truckId || '-'}</td>
            <td>${load.driverId || '-'}</td>
            <td><button onclick="deleteLoad(${load.id})">🗑️</button></td>
          `;
          tbody.appendChild(row);
        });

        renderPagination(totalPages);
      })
      .catch(err => console.error('Load fetch error:', err));
  }

  // Render pagination buttons
  function renderPagination(totalPages) {
    const container = document.getElementById('paginationControls');
    container.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.disabled = i === currentPage;
      btn.style.margin = '0 5px';
      btn.onclick = () => loadAllLoads(i);
      container.appendChild(btn);
    }
  }

  // Delete load function
  window.deleteLoad = function (id) {
    if (!confirm('Are you sure you want to delete this load?')) return;
    fetch(`/api/loads/${id}`, {
      method: 'DELETE',
      headers
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete');
        return res.json();
      })
      .then(() => loadAllLoads(currentPage))
      .catch(err => alert('Delete error: ' + err.message));
  };

  // Create new load
  document.getElementById('createLoadForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = document.getElementById('newLoadDescription').value;
    const status = document.getElementById('newLoadStatus').value;

    fetch('/api/loads', {
      method: 'POST',
      headers,
      body: JSON.stringify({ description, status })
    })
      .then(res => res.json())
      .then(() => {
        alert('✅ Load created');
        loadAllLoads(currentPage);
        e.target.reset();
      })
      .catch(err => alert('Error creating load: ' + err.message));
  });

  // Assign driver to load
  document.getElementById('assignForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const loadId = document.getElementById('assignLoadId').value;
    const driverId = document.getElementById('assignDriverId')?.value;
    const truckId = document.getElementById('assignTruckId')?.value;

    const assignmentData = { loadId };
    if (driverId) assignmentData.driverId = driverId;
    if (truckId) assignmentData.truckId = truckId;

    fetch('/api/loads/assign', {
      method: 'POST',
      headers,
      body: JSON.stringify(assignmentData)
    })
      .then(res => res.json())
      .then(() => {
        alert('✅ Load assigned');
        loadAllLoads(currentPage);
        e.target.reset();
      })
      .catch(err => alert('Assignment error: ' + err.message));
  });

  // Logout handler
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '/login.html';
  });

  // Initial load
  loadAllLoads();
});
