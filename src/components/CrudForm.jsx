import { Save } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toInputDate } from '../utils/formatters.js';

function createInitialValues(fields, record) {
  const values = {};

  fields
    .filter((field) => field.formOnly !== false && !field.readOnly)
    .forEach((field) => {
      let value = record?.[field.name];
      if (field.type === 'date') value = toInputDate(value);
      if (value === undefined || value === null) value = field.defaultValue ?? '';
      values[field.name] = value;
    });

  return values;
}

export default function CrudForm({ config, record, options, saving, onSave, onCancel }) {
  const formFields = useMemo(
    () => config.fields.filter((field) => field.formOnly !== false && !field.readOnly),
    [config],
  );

  const [values, setValues] = useState(() => createInitialValues(config.fields, record));

  useEffect(() => {
    setValues(createInitialValues(config.fields, record));
  }, [config, record]);

  function updateValue(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = { ...values };
    formFields.forEach((field) => {
      if (field.type === 'number') payload[field.name] = Number(payload[field.name] || 0);
      if (field.type === 'select' && field.optionsEndpoint) payload[field.name] = Number(payload[field.name]);
    });

    await onSave(payload);
  }

  return (
    <form className="crud-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        {formFields.map((field) => {
          const value = values[field.name] ?? '';
          const fieldOptions = options[field.name] || [];

          return (
            <label className={field.type === 'textarea' ? 'field-wide' : ''} key={field.name}>
              <span>{field.label}{field.required && <b> *</b>}</span>

              {field.type === 'textarea' ? (
                <textarea
                  rows="4"
                  value={value}
                  required={field.required}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              ) : field.type === 'select' ? (
                <select
                  value={value}
                  required={field.required}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                >
                  <option value="">Select {field.label}</option>
                  {field.choices?.map((choice) => (
                    <option value={choice} key={choice}>{choice}</option>
                  ))}
                  {fieldOptions.map((option) => (
                    <option value={option[field.optionValue]} key={option[field.optionValue]}>
                      {option[field.optionLabel]}
                      {field.optionExtra && option[field.optionExtra] ? ` — ${option[field.optionExtra]}` : ''}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  value={value}
                  min={field.type === 'number' ? 0 : undefined}
                  step={field.type === 'number' ? '0.01' : undefined}
                  required={field.required}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              )}
            </label>
          );
        })}
      </div>

      <div className="form-actions">
        <button className="button button-light" type="button" onClick={onCancel}>Cancel</button>
        <button className="button button-primary" type="submit" disabled={saving}>
          <Save size={17} /> {saving ? 'Saving...' : record ? `Update ${config.singular}` : `Create ${config.singular}`}
        </button>
      </div>
    </form>
  );
}
