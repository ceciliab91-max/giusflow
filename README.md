# GiusFlow

> **Simulatore interattivo e calcolatore dei termini processuali del Rito del Lavoro (artt. 409 e ss. c.p.c.)**

GiusFlow è una Single Page Application (SPA) sviluppata con **React**, **Vite** e **Bootstrap**. L'applicazione assiste operatori legali nella consultazione delle fasi del processo del lavoro, automatizzando il calcolo dei termini perentori e delle scadenze di decadenza stabilite dal codice di procedura civile e dalla legge 604/1966.

## Obiettivi e Funzionalità

- **Calcolatore Dinamico delle Scadenze:**
  - **Art. 414 c.p.c. (Ricorrente):** Calcolo del termine decadenziale di **180 giorni** per il deposito del ricorso giudiziale a partire dalla data di invio dell'impugnazione stragiudiziale del licenziamento (L. 604/66).
  - **Art. 415 c.p.c. (Notifica):** Calcolo del termine a ritroso di **25 giorni liberi** prima della data di prima udienza fissata nel decreto per la notifica al convenuto.
  - **Art. 416 c.p.c. (Resistente):** Calcolo del termine perentorio a ritroso di **10 giorni** prima dell'udienza per il deposito della memoria difensiva, a pena delle decadenze di legge.
- **Filtraggio Multilivello:**
  - Filtro istantaneo per ruolo processuale (`Tutti`, `Ricorrente`, `Resistente`).
  - Barra di ricerca full-text per articolo o parola chiave (*case-insensitive*).
- **Selezione Interattiva:**
  - Possibilità di cliccare su ciascuna card per caricarla nel calcolatore superiore con evidenziazione grafica dinamica dello stato attivo.

## Stack Tecnologico e Architettura

- **Core:** React 18+ (Approccio dichiarativo a componenti funzionali)
- **Tooling & Bundler:** Vite
- **Styling & Layout:** Bootstrap 5 (Grid System, Cards, Badges, Button Groups)
- **Linguaggio:** JavaScript Moderno (ES6+)

### Pattern e Concetti Chiave Applicati

- **State Management (`useState`):** Gestione minimale e centralizzata dello stato (`ruolo`, `dataInput`, `search`, `faseSelezionata`).
- **Valori Derivati:** Sia il filtraggio dell'array (`.filter()`) sia il calcolo delle date sono eseguiti come valori derivati istantanei a ogni ciclo di render.
- **JavaScript Functional Programming:** Utilizzo di metodi immutabili per gli array (`.filter()`, `.map()`) e per le stringhe (`.toLowerCase()`, `.includes()`).
- **Aritmetica Temporale Nativa:** Gestione del calcolo giorni (avanti e a ritroso) tramite l'oggetto nativo `Date`, `setDate()`, `getDate()` e formattazione ISO `YYYY-MM-DD`.
- **Componenti Controllati:** Gestione bidirezionale degli input form (`value` + `onChange`).

## Struttura del Progetto

giusflow/
├── public/              # File statici
├── src/
│   ├── assets/          # Risorse grafiche
│   ├── App.css          # Regole di stile applicative
│   ├── App.jsx          # Componente principale (Stati, logica di calcolo e UI)
│   ├── index.css        # Stili globali
│   └── main.jsx         # Entry point React e bootstrap del DOM
├── index.html           # Template HTML5 con CDN Bootstrap
├── package.json         # Dipendenze e script npm/pnpm
└── vite.config.js       # Configurazione ambiente Vite
