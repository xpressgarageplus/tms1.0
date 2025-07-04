import React, { useEffect, useState } from 'react';

const defaultChecklist = {
  Authentication: [
    { label: 'Passwords are hashed (e.g., bcrypt)', checked: false },
    { label: 'Refresh tokens stored securely', checked: false },
    { label: 'Rate limiting on login attempts', checked: false },
  ],
  Authorization: [
    { label: 'Role-based access control implemented', checked: false },
    { label: 'Sensitive routes protected by middleware', checked: false },
  ],
  API_Security: [
    { label: 'API routes validated and sanitized', checked: false },
    { label: 'Errors hidden in production', checked: false },
  ],
  Files_Upload: [
    { label: 'Upload types & size validated', checked: false },
    { label: 'Uploaded files not publicly exposed', checked: false },
  ]
};

const SecurityChecklist = () => {
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('securityChecklist');
    return saved ? JSON.parse(saved) : defaultChecklist;
  });

  useEffect(() => {
    localStorage.setItem('securityChecklist', JSON.stringify(checklist));
  }, [checklist]);

  const toggleCheck = (section, index) => {
    const updated = { ...checklist };
    updated[section][index].checked = !updated[section][index].checked;
    setChecklist(updated);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto print:bg-white bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">🛡️ TMS Security Checklist</h1>

      <button
        onClick={() => window.print()}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden"
      >
        Print Checklist
      </button>

      <div className="space-y-8">
        {Object.entries(checklist).map(([section, items]) => (
          <div key={section}>
            <h2 className="text-xl font-semibold mb-2">{section.replace(/_/g, ' ')}</h2>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCheck(section, index)}
                    className="mt-1 mr-2"
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityChecklist;
