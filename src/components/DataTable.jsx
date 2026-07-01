import { Edit3, Eye, Trash2 } from 'lucide-react';
import { formatDate, formatMoney, getStatusTone } from '../utils/formatters.js';

function getValue(row, field) {
  if (field.displayKey && row[field.displayKey]) return row[field.displayKey];
  return row[field.name];
}

function renderValue(row, field) {
  const value = getValue(row, field);

  if (field.format === 'currency') return formatMoney(value);
  if (field.format === 'date') return formatDate(value);
  if (field.format === 'status') return <span className={`status-badge ${getStatusTone(value)}`}>{value || 'Unknown'}</span>;
  return value === null || value === undefined || value === '' ? '—' : String(value);
}

export default function DataTable({ config, rows, onEdit, onDelete, onView, permissions }) {
  const columns = config.fields.filter((field) => field.showInTable !== false);

  return (
    <div className="table-shell">
      <div className="desktop-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((field) => <th key={field.name}>{field.label}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[config.idKey]}>
                {columns.map((field) => <td key={field.name}>{renderValue(row, field)}</td>)}
                <td>
                  <div className="table-actions">
                    {onView && (
                      <button className="icon-button view-action" type="button" onClick={() => onView(row)} title="View">
                        <Eye size={17} />
                      </button>
                    )}
                    {permissions.canEdit && (
                      <button className="icon-button edit-action" type="button" onClick={() => onEdit(row)} title="Edit">
                        <Edit3 size={17} />
                      </button>
                    )}
                    {permissions.canDelete && (
                      <button className="icon-button delete-action" type="button" onClick={() => onDelete(row)} title="Delete">
                        <Trash2 size={17} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile-record-list">
        {rows.map((row) => (
          <article className="mobile-record-card" key={row[config.idKey]}>
            <div className="mobile-record-title">
              <strong>{getValue(row, columns[0])}</strong>
              <span>#{row[config.idKey]}</span>
            </div>
            <dl>
              {columns.slice(1).map((field) => (
                <div key={field.name}>
                  <dt>{field.label}</dt>
                  <dd>{renderValue(row, field)}</dd>
                </div>
              ))}
            </dl>
            <div className="table-actions">
              {onView && <button className="button button-light button-small" type="button" onClick={() => onView(row)}><Eye size={16} /> View</button>}
              {permissions.canEdit && <button className="button button-light button-small" type="button" onClick={() => onEdit(row)}><Edit3 size={16} /> Edit</button>}
              {permissions.canDelete && <button className="button button-danger button-small" type="button" onClick={() => onDelete(row)}><Trash2 size={16} /> Delete</button>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
