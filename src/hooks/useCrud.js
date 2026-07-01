import { useCallback, useEffect, useState } from 'react';
import {
  createRecord,
  deleteRecord,
  getRecords,
  updateRecord,
} from '../api/crudApi.js';

export default function useCrud(config) {
  const [rows, setRows] = useState([]);
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = useCallback(async (search = '') => {
    setLoading(true);
    setError('');

    try {
      const optionFields = config.fields.filter((field) => field.optionsEndpoint);
      const [records, ...optionResults] = await Promise.all([
        getRecords(config.endpoint, search ? { search } : {}),
        ...optionFields.map((field) => getRecords(field.optionsEndpoint)),
      ]);

      setRows(Array.isArray(records) ? records : []);

      const nextOptions = {};
      optionFields.forEach((field, index) => {
        nextOptions[field.name] = Array.isArray(optionResults[index])
          ? optionResults[index]
          : [];
      });
      setOptions(nextOptions);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    load();
  }, [load]);

  async function save(payload, id) {
    setSaving(true);
    setError('');
    setMessage('');

    try {
      if (id) {
        await updateRecord(config.endpoint, id, payload);
        setMessage(`${config.singular} updated successfully.`);
      } else {
        await createRecord(config.endpoint, payload);
        setMessage(`${config.singular} created successfully.`);
      }

      await load();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function remove(id) {
    setError('');
    setMessage('');

    try {
      await deleteRecord(config.endpoint, id);
      setMessage(`${config.singular} deleted successfully.`);
      await load();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    }
  }

  return {
    rows,
    options,
    loading,
    saving,
    error,
    message,
    setError,
    setMessage,
    load,
    save,
    remove,
  };
}
