document.addEventListener('DOMContentLoaded', fetchLoads);

// Fetch and display all loads
async function fetchLoads() {
  const token = localStorage.getItem('accessToken');
  const res = await fetch('/api/loads', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    alert('Failed to fetch loads');
    return;
  }

  const loads = await res.json();
  const tbody = document.getElementById('loadsTableBody');
  tbody.innerHTML = '';

  loads.forEach(load => {
    const driver = load.Driver ? `${load.Driver.name} (ID: ${load.Driver.id})` : '-';
    const row = `
      <tr>
        <td>${load.id}</td>
        <td>${load.description}</td>
        <td>${load.status}</td>
        <td>${load.truckId || '-'}</td>
        <td>${driver}</td>
        <td>
          <button onclick="deleteLoad(${load.id})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Create a new load
document.getElementById('createLoadForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('accessToken');
  const description = document.getElementById('newLoadDescription').value;
  const status = document.getElementById('newLoadStatus').value;

  const res = await fetch('/api/loads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ description, status })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Load created!');
    fetchLoads();
    e.target.reset();
  } else {
    alert(data.error || 'Creation failed');
  }
});

// Assign a load to a truck
document.getElementById('assignForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('accessToken');
  const loadId = document.getElementById('assignLoadId').value;
  const truckId = document.getElementById('assignTruckId').value;

  const res = await fetch(`/api/loads/${loadId}/assign`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ truckId })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Load assigned!');
    fetchLoads();
    e.target.reset();
  } else {
    alert(data.error || 'Assignment failed');
  }
});

// Delete a load
async function deleteLoad(id) {
  const token = localStorage.getItem('accessToken');
  const confirmDelete = confirm(`Are you sure you want to delete Load #${id}?`);
  if (!confirmDelete) return;

  const res = await fetch(`/api/loads/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  if (res.ok) {
    alert('Load deleted');
    fetchLoads();
  } else {
    alert('Failed to delete load');
  }
}

// Logout
function logout() {
  localStorage.removeItem('accessToken');
  window.location.href = 'login.html';
}
