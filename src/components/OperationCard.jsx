import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OperationCard({ icon: Icon, title, description, to, count }) {
  return (
    <Link className="operation-card" to={to}>
      <span className="operation-icon">{Icon && <Icon size={24} />}</span>
      <div>
        <div className="operation-title-row">
          <h3>{title}</h3>
          {count !== undefined && <span>{count}</span>}
        </div>
        <p>{description}</p>
      </div>
      <ArrowUpRight className="operation-arrow" size={20} />
    </Link>
  );
}
