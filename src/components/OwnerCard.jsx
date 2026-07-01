import { Mail, MapPin, Phone } from 'lucide-react';
import { getInitials } from '../utils/formatters.js';

export default function OwnerCard({ owner }) {
  return (
    <article className="owner-card">
      <div className="owner-avatar">{getInitials(owner.fullName)}</div>
      <div>
        <span className="verified-label">Verified owner</span>
        <h3>{owner.fullName}</h3>
        <p><Phone size={15} /> {owner.phone}</p>
        {owner.email && <p><Mail size={15} /> {owner.email}</p>}
        {owner.address && <p><MapPin size={15} /> {owner.address}</p>}
      </div>
    </article>
  );
}
