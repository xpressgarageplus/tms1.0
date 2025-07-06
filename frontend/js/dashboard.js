document.addEventListener('DOMContentLoaded', () => {
  // Shared headers
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  };

  // Redirect if not logged in
  if (!accessToken) {
    alert('You must be logged in.');
    window.location.href = '/login.html';
    return;
  }

  let currentPage = 1;

  // Load all loads
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

  // Render pagination
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

  // Delete Load
  window.deleteLoad = function (id) {
    if (!confirm('Are you sure you want to delete this load?')) return;
    fetch(`/api/loads/${id}`, {
      method: 'DELETE',
      headers
    })
      .then(res => res.json())
      .then(() => loadAllLoads(currentPage))
      .catch(err => console.error('Delete error:', err));
  };

  // Create Load
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
        loadAllLoads(currentPage);
        e.target.reset();
      })
      .catch(err => alert('Error creating load: ' + err.message));
  });

  // Assign Load
  document.getElementById('assignForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const loadId = document.getElementById('assignLoadId').value;
    const truckId = document.getElementById('assignTruckId').value;

    fetch('/api/loads/assign', {
      method: 'POST',
      headers,
      body: JSON.stringify({ loadId, truckId })
    })
      .then(res => res.json())
      .then(() => {
        loadAllLoads(currentPage);
        e.target.reset();
      })
      .catch(err => alert('Assignment error: ' + err.message));
  });

  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '/login.html';
  });

  // Initial load
  loadAllLoads();
});
