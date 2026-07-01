import { ArrowRight, Building2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatMoney, getStatusTone } from '../utils/formatters.js';

export default function PropertyCard({ property, index = 0 }) {
  const variant = (index % 3) + 1;

  return (
    <article className="property-card">
      <div className={`property-visual property-visual-${variant}`}>
        <Building2 size={52} />
        <span className={`status-badge ${getStatusTone(property.status)}`}>{property.status}</span>
      </div>
      <div className="property-content">
        <span className="property-type">{property.propertyType}</span>
        <h3>{property.propertyName}</h3>
        <p className="property-location"><MapPin size={16} /> {property.location}</p>
        <div className="property-footer">
          <strong>{formatMoney(property.price)}<small>/month</small></strong>
          <Link to={`/apartments/${property.propertyID}`}>
            Details <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
