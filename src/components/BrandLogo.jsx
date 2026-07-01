import { Link } from 'react-router-dom';
import logoMark from '../assets/logo-mark.svg';

export default function BrandLogo({ compact = false }) {
  return (
    <Link className="brand-logo" to="/" aria-label="RentalPro RMS home">
      <img src={logoMark} alt="RentalPro RMS logo" />
      {!compact && (
        <span className="brand-copy">
          <strong>RentalPro RMS</strong>
          <small>Property, rental and payment management</small>
        </span>
      )}
    </Link>
  );
}
