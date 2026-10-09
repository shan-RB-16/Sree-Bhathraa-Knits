import { useEffect, useState } from 'react';

const api = (path, token, opts = {}) =>
  fetch(path, {
    ...opts,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });

const waNumber = (p) => {
  const d = String(p).replace(/\D/g, '');
  return d.length === 10 ? `91${d}` : d;
};

export default function Admin() {
  const [token, setToken] = useState(sessionStorage.getItem('sbk-admin') || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rows, setRows] = useState([]);

  async function load(tk = token) {
    const r = await api('/api/enquiries', tk);
    if (r.status === 401) { sessionStorage.removeItem('sbk-admin'); setToken(''); return; }
    setRows(await r.json());
  }
  useEffect(() => { if (token) load(); }, [token]);

  async function login(e) {
    e.preventDefault();
    setError('');
    const r = await fetch('/api/admin/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const d = await r.json();
    if (!r.ok) return setError(d.error || 'Login failed');
    sessionStorage.setItem('sbk-admin', d.token);
    setToken(d.token);
  }

  const toggle = async (row) => {
    await api(`/api/enquiries/${row._id}`, token, { method: 'PATCH', body: JSON.stringify({ handled: !row.handled }) });
    load();
  };
  const remove = async (row) => {
    if (!confirm(`Delete enquiry from ${row.name}?`)) return;
    await api(`/api/enquiries/${row._id}`, token, { method: 'DELETE' });
    load();
  };

  if (!token) {
    return (
      <main className="admin">
        <form className="login" onSubmit={login}>
          <h1>Admin login</h1>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus /></label>
          <button className="btn gold">Log in</button>
          <p role="alert" className="msg fail">{error}</p>
        </form>
      </main>
    );
  }

  return (
    <main className="admin">
      <h1>Enquiries ({rows.length})</h1>
      <p><a href="/">Back to website</a></p>
      {rows.length === 0 && <p>No enquiries yet. They will appear here when buyers send the form.</p>}
      <ul className="enq">
        {rows.map((r) => (
          <li key={r._id} className={r.handled ? 'done' : ''}>
            <div>
              <strong>{r.name}</strong> {r.company && <span>· {r.company}</span>}
              <small>{new Date(r.createdAt).toLocaleString()}</small>
            </div>
            <p>{r.fabric} · {r.quantity ? `${r.quantity} kg` : 'quantity not given'}</p>
            {r.message && <p>{r.message}</p>}
            <p>
              <a href={`tel:${r.phone}`}>{r.phone}</a>{' · '}
              <a href={`https://wa.me/${waNumber(r.phone)}`} target="_blank" rel="noreferrer">Reply on WhatsApp</a>
            </p>
            <div className="row">
              <button className="btn small" onClick={() => toggle(r)}>{r.handled ? 'Mark as new' : 'Mark as done'}</button>
              <button className="btn small danger" onClick={() => remove(r)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
