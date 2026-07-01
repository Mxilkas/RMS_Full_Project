import { Plus, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getResource } from '../config/resources.js';
import { useAuth } from '../context/AuthContext.jsx';
import useCrud from '../hooks/useCrud.js';
import useDebounce from '../hooks/useDebounce.js';
import ConfirmDialog from './ConfirmDialog.jsx';
import CrudForm from './CrudForm.jsx';
import DataTable from './DataTable.jsx';
import EmptyState from './EmptyState.jsx';
import ErrorState from './ErrorState.jsx';
import LoadingState from './LoadingState.jsx';
import Modal from './Modal.jsx';
import PageHeading from './PageHeading.jsx';

function getPermissions(role, resourceKey) {
  if (role === 'Admin' || role === 'Manager') {
    return { canCreate: true, canEdit: true, canDelete: true };
  }

  if (role === 'User' && resourceKey === 'payments') {
    return { canCreate: true, canEdit: false, canDelete: false };
  }

  return { canCreate: false, canEdit: false, canDelete: false };
}

export default function CrudPage({ resourceKey }) {
  const config = getResource(resourceKey);
  const { session } = useAuth();
  const navigate = useNavigate();
  const crud = useCrud(config);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const debouncedSearch = useDebounce(search);
  const permissions = useMemo(
    () => getPermissions(session?.role, resourceKey),
    [session?.role, resourceKey],
  );

  useEffect(() => {
    crud.load(debouncedSearch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  function openCreate() {
    setSelectedRecord(null);
    setFormOpen(true);
    crud.setError('');
    crud.setMessage('');
  }

  function openEdit(record) {
    setSelectedRecord(record);
    setFormOpen(true);
    crud.setError('');
    crud.setMessage('');
  }

  async function saveRecord(payload) {
    const preparedPayload = config.preparePayload ? config.preparePayload(payload) : payload;
    const id = selectedRecord?.[config.idKey];
    const saved = await crud.save(preparedPayload, id);
    if (saved) setFormOpen(false);
  }

  function viewRecord(record) {
    if (resourceKey === 'apartments') {
      navigate(`/apartments/${record[config.idKey]}`);
    }
  }

  async function confirmDelete() {
    if (!deleteRecord) return;
    await crud.remove(deleteRecord[config.idKey]);
    setDeleteRecord(null);
  }

  return (
    <section className="management-page section-space">
      <div className="container">
        <PageHeading
          eyebrow="API-connected management"
          title={config.title}
          description={config.description}
          action={permissions.canCreate ? (
            <button className="button button-primary" type="button" onClick={openCreate}>
              <Plus size={18} /> Add {config.singular}
            </button>
          ) : null}
        />

        <div className="records-toolbar">
          <div className="search-box">
            <Search size={19} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search ${config.title.toLowerCase()}...`}
            />
            {search && (
              <button type="button" className="icon-button" onClick={() => setSearch('')} aria-label="Clear search">
                <X size={17} />
              </button>
            )}
          </div>
          <span className="record-count">{crud.rows.length} record{crud.rows.length === 1 ? '' : 's'}</span>
        </div>

        {crud.message && <div className="alert success-alert">{crud.message}</div>}
        {crud.error && !formOpen && <ErrorState message={crud.error} onRetry={() => crud.load(search)} />}
        {crud.loading ? (
          <LoadingState />
        ) : crud.rows.length === 0 ? (
          <EmptyState title={`No ${config.title.toLowerCase()} found`} />
        ) : (
          <DataTable
            config={config}
            rows={crud.rows}
            onEdit={openEdit}
            onDelete={setDeleteRecord}
            onView={resourceKey === 'apartments' ? viewRecord : null}
            permissions={permissions}
          />
        )}
      </div>

      <Modal
        open={formOpen}
        title={selectedRecord ? `Update ${config.singular}` : `Add New ${config.singular}`}
        description={`The form saves directly to ${config.endpoint} through Axios.`}
        onClose={() => setFormOpen(false)}
      >
        {crud.error && <div className="alert error-alert">{crud.error}</div>}
        <CrudForm
          config={config}
          record={selectedRecord}
          options={crud.options}
          saving={crud.saving}
          onSave={saveRecord}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteRecord)}
        title={`Delete ${config.singular}?`}
        message={`This action will permanently remove the selected ${config.singular.toLowerCase()} from SQL Server.`}
        onCancel={() => setDeleteRecord(null)}
        onConfirm={confirmDelete}
      />
    </section>
  );
}
