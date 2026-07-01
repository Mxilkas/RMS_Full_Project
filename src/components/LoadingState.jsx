export default function LoadingState({ label = 'Loading data from the API...' }) {
  return (
    <div className="state-card" role="status">
      <span className="spinner" />
      <p>{label}</p>
    </div>
  );
}
