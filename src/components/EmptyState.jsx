import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'No records found', description = 'Create the first record or change your search.' }) {
  return (
    <div className="state-card empty-state">
      <Inbox size={30} />
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}
