import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/hooks/useSession';

const checklistData = {
  "Authentication & Token Security": [
    "Tokens are signed with strong secrets",
    "Tokens expire appropriately",
    "Auth middleware is applied to all protected routes",
    "Refresh token rotation or revocation is implemented"
  ],
  "File Upload Security": [
    "Only allowed MIME types accepted (e.g. PDF, JPG, PNG)",
    "Max file size enforced (e.g. 10MB)",
    "Files stored outside public access",
    "Preview/download restricted to authorized users"
  ],
  "Database & API Hardening": [
    "All inputs validated and sanitized",
    "Database access secured with environment config",
    "Rate limiting on public endpoints"
  ]
};

export default function SecurityChecklist() {
  const { user } = useSession();
  const [progress, setProgress] = useState({});

  useEffect(() => {
    // Load saved progress from API (replace with real fetch call)
    const stored = JSON.parse(localStorage.getItem('checklist-progress') || '{}');
    setProgress(stored);
  }, []);

  const handleCheck = (section, item) => {
    const updated = {
      ...progress,
      [section]: {
        ...progress[section],
        [item]: !progress[section]?.[item]
      }
    };
    setProgress(updated);
    localStorage.setItem('checklist-progress', JSON.stringify(updated));
  };

  if (!user || user.role !== 'admin') {
    return <p className="text-center mt-10">Admin access only</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🛡️ Pre-Launch Security Checklist</h1>
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
      <Button onClick={() => alert('Checklist progress saved locally.')}>Save Progress</Button>
    </div>
  );
}
