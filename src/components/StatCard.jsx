export default function StatCard({ icon: Icon, label, value, helper, tone = 'primary' }) {
  return (
    <article className={`stat-card stat-${tone}`}>
      <span className="stat-icon">{Icon && <Icon size={23} />}</span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        {helper && <small>{helper}</small>}
      </div>
    </article>
  );
}
