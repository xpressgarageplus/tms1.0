import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/hooks/useSession';
import { DownloadIcon } from 'lucide-react';

const checklistData = {
  "Upload Testing": [
    "Uploaded documents for each type: driver, load, truck",
    "Checked preview rendering for image and PDF types",
    "Verified metadata fields (referenceId, category, folder, tags) save/display correctly",
    "Tested upload failure on invalid file type or missing required fields"
  ],
  "Filter & Search Testing": [
    "Filtered by type (driver/load/truck)",
    "Used search with filename or reference ID",
    "Combined search + filter + sort and confirmed correct results",
    "Tested sorting by filename and createdAt fields"
  ],
  "Role-Based Access Testing": [
    "Admin role: upload, download, and delete buttons visible and working",
    "Dispatcher/Driver role: restricted actions hidden",
    "Attempted restricted API access with wrong role (403 expected)"
  ],
  "Mobile Responsiveness": [
    "Viewed document list and upload form on small screens",
    "Verified preview scaling for PDF and image",
    "Tested file upload from mobile gallery/camera",
    "Checked UI components (buttons, inputs) are accessible"
  ],
  "Infrastructure": [
    "Database is migrated and seeded (production DB)",
    "Deployment server (Render, DigitalOcean, EC2, etc.)",
    "Frontend is hosted (if decoupled, e.g. Vite/React separately)"
  ],
  "Integrations": [
    "Telegram bot for dispatch notifications working?",
    "Life360 or GPS data feed connected (if you use real tracking)?"
  ],
  "Deployment Targets": [
    "Backend deployed to: Render, Railway, Heroku, or VPS",
    "Frontend deployed to: Vercel, Netlify, or same server (static hosting)",
    "Database hosted on: Supabase, RDS, or Railway (PostgreSQL)"
  ],
  "Environment & Deployment": [
    "Hosting provider selected (e.g., Render, Railway, Heroku, DigitalOcean, AWS, etc.)",
    "Environment variables configured (e.g., DB URL, JWT secrets, Telegram tokens, etc.)",
    "Production build of frontend done (if using React/Vite: npm run build)",
    "Static files or frontend hosted and linked to backend"
  ],
  "Database": [
    "All migrations run successfully (npx sequelize-cli db:migrate)",
    "PostgreSQL (or MySQL) is properly deployed and secure",
    "Backups scheduled (optional but recommended)"
  ]
};

export default function DocumentQAChecklist() {
  const { user } = useSession();
  const [progress, setProgress] = useState({});

  useEffect(() => {
    fetch('/api/checklists/qa')
      .then(res => res.json())
      .then(data => setProgress(data || {}));
  }, []);

  const handleCheck = async (section, item) => {
    const updated = {
      ...progress,
      [section]: {
        ...progress[section],
        [item]: !progress[section]?.[item]
      }
    };
    setProgress(updated);
    await fetch('/api/checklists/qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
  };

  const exportCSV = () => {
    const lines = ['Section,Item,Checked'];
    Object.entries(progress).forEach(([section, items]) => {
      Object.entries(items).forEach(([item, checked]) => {
        lines.push(`"${section}","${item}",${checked ? 'Yes' : 'No'}`);
      });
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qa_checklist.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!user || user.role !== 'admin') {
    return <p className="text-center mt-10">Admin access only</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🧪 QA Checklist: Document Upload</h1>
      {Object.entries(checklistData).map(([section, items]) => (
        <Card key={section} className="mb-6">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">{section}</h2>
            <ul className="space-y-2">
              {items.map(item => (
                <li key={item} className="flex items-center space-x-2">
                  <Checkbox
                    checked={progress[section]?.[item] || false}
                    onCheckedChange={() => handleCheck(section, item)}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
      <Button onClick={exportCSV} className="mt-4 flex items-center space-x-2">
        <DownloadIcon className="w-4 h-4" />
        <span>Export CSV</span>
      </Button>
    </div>
  );
}
