import { useState } from 'react';

const FASI = [
  {
    id: 1,
    art: 'Art. 414 c.p.c.',
    titolo: 'Ricorso Introduttivo (Impugnazione)',
    ruolo: 'ricorrente',
    termini: 'Entro 180 giorni dall impugnativa stragiudiziale',
    decadenze: 'Inefficacia dell impugnazione del licenziamento (L. 604/66)',
    labelInput: 'Data invio impugnazione stragiudiziale (PEC/Raccomandata):',
    giorni: 180,
    tipoCalcolo: 'Termine perentorio deposito ricorso (+180 giorni)'
  },
  {
    id: 2,
    art: 'Art. 415 c.p.c.',
    titolo: 'Notifica Ricorso e Decreto',
    ruolo: 'entrambi',
    termini: 'Almeno 25 giorni liberi prima dell udienza',
    decadenze: 'Nullità o rinnovazione della notifica',
    labelInput: 'Data Prima Udienza fissata nel decreto:',
    giorni: -25,
    tipoCalcolo: 'Termine ultimo per notificare al convenuto (-25 giorni)'
  },
  {
    id: 3,
    art: 'Art. 416 c.p.c.',
    titolo: 'Costituzione Convenuto / Memoria',
    ruolo: 'resistente',
    termini: 'Almeno 10 giorni prima dell udienza',
    decadenze: 'Decadenza da riconvenzionali, eccezioni in senso stretto e prove',
    labelInput: 'Data Prima Udienza fissata nel decreto:',
    giorni: -10,
    tipoCalcolo: 'Termine perentorio costituzione convenuto (-10 giorni)'
  }
];

export default function App() {
  const [ruolo, setRuolo] = useState('tutti');
  const [dataInput, setDataInput] = useState('');
  const [search, setSearch] = useState('');
  const [faseSelezionata, setFaseSelezionata] = useState(FASI[0]);

  // Calcolo matematico dei termini (+ in avanti o - a ritroso)
  function calcolaScadenza(dataStr, giorni) {
    if (!dataStr) return null;
    const d = new Date(dataStr);
    d.setDate(d.getDate() + giorni);
    return d.toISOString().split('T')[0];
  }

  // Filtro dinamico per ruoli e ricerca testuale
  const fasiFiltrate = FASI.filter((f) => {
    const matchRuolo =
      ruolo === 'tutti' || f.ruolo === ruolo || f.ruolo === 'entrambi';
    const matchSearch =
      f.titolo.toLowerCase().includes(search.toLowerCase()) ||
      f.art.toLowerCase().includes(search.toLowerCase());
    return matchRuolo && matchSearch;
  });

  const scadenzaCalcolata = calcolaScadenza(dataInput, faseSelezionata.giorni);

  return (
    <div className="container py-4">
      <header className="mb-4 text-center">
        <h1 className="text-primary fw-bold">GiusFlow</h1>
        <p className="text-muted">Simulatore Fasi e Termini Processuali del Lavoro</p>
      </header>

      {/* Riquadro di Calcolo Adattivo */}
      <div className="card mb-4 shadow-sm border-0 bg-light">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="card-title fw-bold mb-0">
              {faseSelezionata.art} - {faseSelezionata.titolo}
            </h5>
            <span className="badge bg-secondary text-uppercase">{faseSelezionata.ruolo}</span>
          </div>
          <p className="small text-muted mb-3">{faseSelezionata.tipoCalcolo}</p>

          <div className="row g-3 align-items-center">
            <div className="col-md-6">
              <label className="form-label fw-semibold small">
                {faseSelezionata.labelInput}
              </label>
              <input
                type="date"
                className="form-control"
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
              />
            </div>
            <div className="col-md-6 text-md-end">
              {scadenzaCalcolata ? (
                <div>
                  <small className="d-block text-muted">Termine Calcolato:</small>
                  <span className="badge bg-danger fs-6 p-2">
                    {scadenzaCalcolata}
                  </span>
                </div>
              ) : (
                <span className="text-muted small">Inserisci una data per visualizzare la scadenza</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filtri Ruolo e Ricerca */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="btn-group w-100" role="group">
            <button
              type="button"
              className={`btn ${ruolo === 'tutti' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setRuolo('tutti')}
            >
              Tutti
            </button>
            <button
              type="button"
              className={`btn ${ruolo === 'ricorrente' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setRuolo('ricorrente')}
            >
              Ricorrente
            </button>
            <button
              type="button"
              className={`btn ${ruolo === 'resistente' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setRuolo('resistente')}
            >
              Resistente
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Cerca articolo o titolo (es. 414, 416)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Card Cliccabili senza scritte superflue */}
      <div className="row g-3">
        {fasiFiltrate.map((f) => {
          const isSelected = faseSelezionata.id === f.id;
          return (
            <div key={f.id} className="col-md-4">
              <div
                className={`card h-100 shadow-sm transition-all ${isSelected ? 'border-primary border-2 bg-white' : 'border-0'
                  }`}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setFaseSelezionata(f);
                  setDataInput('');
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="badge bg-primary">{f.art}</span>
                    <span className="badge bg-secondary text-uppercase">{f.ruolo}</span>
                  </div>
                  <h5 className="card-title fw-bold">{f.titolo}</h5>
                  <p className="card-text mb-1"><strong>Termini:</strong> {f.termini}</p>
                  <p className="card-text text-danger small"><strong>Decadenze:</strong> {f.decadenze}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}