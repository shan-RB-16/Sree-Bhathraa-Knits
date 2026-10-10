import { useState } from 'react';
import { useLang, LANGS, T } from './i18n.jsx';

const WA = '918525958828';
const PHONES = ['9842280399','9360516655', '8525958828'];
const EMAIL = 'sreebhathraaknits@gmail.com';
const GST = '33AHEPR7219M2ZY';
const MAP = 'https://maps.google.com/maps?q=11.1124066,77.3433217&z=16&output=embed';
const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=11.1124066,77.3433217';
const MACHINES = [
  { dia: 26, n: 2 }, { dia: 30, n: 2 }, { dia: 32, n: 1 }, { dia: 34, n: 1 },
];
const waLink = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

function Header() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const links = [['about', 'nAbout'], ['machines', 'nMachines'], ['fabrics', 'nFabrics'], ['process', 'nProcess'], ['gallery', 'nGallery'], ['contact', 'nContact']];
  return (
    <header className="top">
      <a className="brand" href="#top" aria-label="Sree Bhathraa Knits" onClick={() => setOpen(false)}>
        <img src="/logo.png" alt="" width="44" height="44" />
        <span>Sree Bhathraa Knits</span>
      </a>
      <label className="lang">
        <span className="sr">Language</span>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          {LANGS.map(([c, n]) => <option key={c} value={c}>{n}</option>)}
        </select>
      </label>
      <button className="menu" aria-label="Menu" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
        <i /><i /><i />
      </button>
      <nav id="main-nav" aria-label="Main" className={open ? 'open' : ''}>
        {links.map(([id, k]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{t(k)}</a>)}
      </nav>
    </header>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <>
    <section className="hero" id="top">
      <div className="hero-text">
        <p className="since">{t('since')}</p>
        <h1>{t('heroTitle')}</h1>
        <p className="lead">{t('heroSub')}</p>
        <div className="btns">
          <a className="btn gold" href={waLink('Hello Sree Bhathraa Knits, I want a fabric quotation.')} target="_blank" rel="noreferrer">{t('btnWa')}</a>
          <a className="btn ghost" href={`tel:+91${PHONES[0]}`}>{t('btnCall')}: {PHONES[0]}</a>
        </div>
      </div>
      <div className="hero-logo"><img src="/logo.png" alt="Sree Bhathraa Knits logo: From Thread to Cloth" /></div>
      <svg className="thread" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 80 C 200 10, 320 120, 520 60 S 860 0, 1200 70" />
      </svg>
    </section>
    <ul className="stats">
      <li><b>6</b><span>{t('count')}</span></li>
      <li><b>26–34</b><span>{t('dia')}</span></li>
      <li><b>~1,700 kg</b><span>{t('capTitle')}</span></li>
    </ul>
    </>
  );
}

function About() {
  const { t } = useLang();
  return (
    <section className="sec" id="about">
      <h2>{t('aboutTitle')}</h2>
      <div className="two">
        <p className="big">{t('aboutText')}</p>
        <ul className="people">
          <li><strong>Rajkumar</strong><span>{t('founder')}</span></li>
          <li><strong>Bhuvaneswari</strong><span>{t('cofounder')}</span></li>
        </ul>
      </div>
      <ul className="why">
        {['w1', 'w2', 'w3'].map((k) => <li key={k}>{t(k)}</li>)}
      </ul>
    </section>
  );
}

function Machines() {
  const { t } = useLang();
  return (
    <section className="sec alt" id="machines">
      <h2>{t('mTitle')}</h2>
      <p className="sub">{t('mSub')}</p>
      <div className="two">
        <table className="mt">
          <thead><tr><th>{t('dia')}</th><th>{t('count')}</th></tr></thead>
          <tbody>
            {MACHINES.map((m) => (
              <tr key={m.dia}>
                <th scope="row">{m.dia}</th>
                <td>
                  <span className="dots" aria-hidden="true">{Array.from({ length: m.n }, (_, i) => <i key={i} />)}</span>
                  <b>{m.n}</b>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot><tr><th>{t('total')}</th><td><b>6</b> · Unitex</td></tr></tfoot>
        </table>
        <div className="cap">
          <h3>{t('capTitle')}</h3>
          <p>{t('capText')}</p>
        </div>
      </div>
    </section>
  );
}

const BLEND = { 2: [75, 25], 3: [52, 48] };

function Fabrics() {
  const { t } = useLang();
  return (
    <section className="sec" id="fabrics">
      <h2>{t('fTitle')}</h2>
      <ul className="fabs">
        {[1, 2, 3].map((i) => (
          <li key={i}>
            <h3>{t(`f${i}`)}</h3>
            <p>{t(`f${i}d`)}</p>
            {BLEND[i] && (
              <div className="blend" aria-hidden="true">
                <i style={{ width: `${BLEND[i][0]}%` }} /><i style={{ width: `${BLEND[i][1]}%` }} />
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="note">{t('fNote')}</p>
    </section>
  );
}

function Process() {
  const { t } = useLang();
  return (
    <section className="sec alt" id="process">
      <h2>{t('pTitle')}</h2>
      <ol className="steps">
        {[1, 2, 3].map((i) => (
          <li key={i}><span className="n">{i}</span><h3>{t(`p${i}`)}</h3><p>{t(`p${i}d`)}</p></li>
        ))}
      </ol>
    </section>
  );
}

function Gallery() {
  const { t } = useLang();
  const tiles = [['machines', 'g1'], ['rolls', 'g2'], ['yarn', 'g3'], ['unit', 'g4']];
  return (
    <section className="sec" id="gallery">
      <h2>{t('gTitle')}</h2>
      <ul className="gal">
        {tiles.map(([f, k]) => (
          <li key={f}>
            <img src={`/gallery/${f}.jpg`} alt={t(k)} loading="lazy" onError={(e) => e.currentTarget.remove()} />
            <div className="ph"><span>{t(k)}</span><small>{t('soon')}</small></div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  const { lang, t } = useLang();
  const empty = { name: '', company: '', phone: '', fabric: T.en.f1, quantity: '', message: '' };
  const [f, setF] = useState(empty);
  const [state, setState] = useState('idle'); // idle | sending | ok | fail
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setState('sending');
    const text = `New enquiry\nName: ${f.name}\nCompany: ${f.company}\nPhone: ${f.phone}\nFabric: ${f.fabric}\nQuantity: ${f.quantity} kg\nMessage: ${f.message}`;
    try {
      const r = await fetch('/api/enquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, lang }),
      });
      if (!r.ok) throw new Error();
      setState('ok');
      setF(empty);
      window.open(waLink(text), '_blank');
    } catch {
      setState('fail');
    }
  }

  return (
    <section className="sec alt" id="contact">
      <h2>{t('cTitle')}</h2>
      <p className="sub">{t('cSub')}</p>
      <div className="two">
        <form onSubmit={submit}>
          <label>{t('fName')}<input required value={f.name} onChange={set('name')} autoComplete="name" /></label>
          <label>{t('fCompany')}<input value={f.company} onChange={set('company')} autoComplete="organization" /></label>
          <label>{t('fPhone')}<input required type="tel" inputMode="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" /></label>
          <label>{t('fFabric')}
            <select value={f.fabric} onChange={set('fabric')}>
              {['f1', 'f2', 'f3'].map((k) => <option key={k} value={T.en[k]}>{t(k)}</option>)}
            </select>
          </label>
          <label>{t('fQty')}<input inputMode="numeric" value={f.quantity} onChange={set('quantity')} /></label>
          <label>{t('fMsg')}<textarea rows="3" value={f.message} onChange={set('message')} /></label>
          <button className="btn gold" disabled={state === 'sending'}>{state === 'sending' ? t('sending') : t('send')}</button>
          <p role="status" className={`msg ${state}`}>{state === 'ok' ? t('ok') : state === 'fail' ? t('fail') : ''}</p>
        </form>
        <div className="find">
          <h3>{t('findUs')}</h3>
          <iframe title="Map" src={MAP} loading="lazy" />
          <p><a href={MAP_LINK} target="_blank" rel="noreferrer">Google Maps</a></p>
          <ul className="contact">
            {PHONES.map((p) => <li key={p}><a href={`tel:+91${p}`}>{p}</a></li>)}
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const { t } = useLang();
  return (
    <>
      <Header />
      <main>
        <Hero /><Fabrics /><Process /><Gallery /><Machines /><About /><Contact />
      </main>
      <footer>
        <img src="/logo.png" alt="" width="56" height="56" />
        <p>Sree Bhathraa Knits · Tirupur, Tamil Nadu</p>
        <p>GSTIN: {GST}</p>
      </footer>
      <div className="mbar">
        <a href={`tel:+91${PHONES[0]}`}>{t('btnCall')}</a>
        <a className="w" href={waLink('Hello Sree Bhathraa Knits')} target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
      <a className="float-wa" href={waLink('Hello Sree Bhathraa Knits')} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        WhatsApp
      </a>
    </>
  );
}
