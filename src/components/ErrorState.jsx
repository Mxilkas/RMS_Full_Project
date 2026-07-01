import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="state-card error-state">
      <AlertCircle size={28} />
      <div>
        <strong>Unable to load this section</strong>
        <p>{message}</p>
      </div>
      {onRetry && (
        <button className="button button-light" type="button" onClick={onRetry}>
          <RefreshCw size={17} /> Retry
        </button>
      )}
    </div>
  );
}
