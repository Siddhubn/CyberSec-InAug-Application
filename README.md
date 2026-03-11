# InAug Authentication Application

This repository contains the InAug Authentication Application — a lightweight, offline-capable authentication interface built for the inauguration of a university cyber security club. The application is designed to confirm authentication from devices connected to a host system and present simple role-based pages (coordinator, HOD, principal, president) during the event.

**Key ideas**
- **Offline-first:** The UI is static and works from local files or a local HTTP server; authentication confirmation is stored/served locally.
- **Host-driven confirmation:** Devices connected to the host system can be confirmed/authenticated and reflected in a local status store (`status.json`).
- **Minimal stack:** Static HTML/CSS/JS front-end with small Python utilities in `server/`.

**Files & structure**
- **Pages:** [cyber sec inaug 4/launch.html](cyber%20sec%20inaug%204/launch.html) and role pages: [cyber sec inaug 4/coordinator1.html](cyber%20sec%20inaug%204/coordinator1.html), [cyber sec inaug 4/coordinator2.html](cyber%20sec%20inaug%204/coordinator2.html), [cyber sec inaug 4/coordinator3.html](cyber%20sec%20inaug%204/coordinator3.html), [cyber sec inaug 4/hod1.html](cyber%20sec%20inaug%204/hod1.html), [cyber sec inaug 4/hod2.html](cyber%20sec%20inaug%204/hod2.html), [cyber sec inaug 4/principal.html](cyber%20sec%20inaug%204/principal.html), [cyber sec inaug 4/president.html](cyber%20sec%20inaug%204/president.html)
- **Assets:** [cyber sec inaug 4/style/cyberpunk.css](cyber%20sec%20inaug%204/style/cyberpunk.css) and [cyber sec inaug 4/js/launch.js](cyber%20sec%20inaug%204/js/launch.js)
- **Server utilities:** [cyber sec inaug 4/server/update_status.py](cyber%20sec%20inaug%204/server/update_status.py), [cyber sec inaug 4/server/reset_status.py](cyber%20sec%20inaug%204/server/reset_status.py), and the local status store [cyber sec inaug 4/server/status.json](cyber%20sec%20inaug%204/server/status.json)

**Features**
- Simple role pages for event presenters and organisers.
- Local JSON state (`status.json`) used to record authentication/confirmation state.
- Static, fast UI with a retro/cyberpunk stylesheet.

**Quick Start (local/offline)**
Prerequisites: `python` (3.x) and a modern browser.

- Serve files with Python's simple HTTP server (recommended to avoid cross-origin restrictions):

```powershell
cd "c:\cyber sec inaug 4"
python -m http.server 8000
# Open http://localhost:8000/launch.html in a browser
```

- Alternatively, open `launch.html` directly in a browser for a purely local run (some browsers block local AJAX to JSON files; use the local server if you see missing status updates).

- If you use the provided Python utilities to manage local state, run them from the `server/` folder:

```powershell
cd "c:\cyber sec inaug 4\server"
python update_status.py   # update/confirm device status (if implemented)
python reset_status.py    # reset the local status store
```

Note: The exact CLI behavior of these scripts depends on their implementation; run with `-h` or open the files to see available options.

**How the app typically works**
- The host opens `launch.html` on a machine that acts as the display/host.
- Devices to be authenticated connect to the same local network (or are otherwise reachable by the host) and are confirmed by the host operator.
- The host updates the local `status.json` (manually or via the provided Python utilities), and the front-end reads that file to reflect current authentication/confirmation state.

**Troubleshooting**
- If the UI does not update when authentication changes, run a local HTTP server instead of opening files directly (see Quick Start).
- Ensure Python 3 is installed and on `PATH` when running the scripts.
- Check file permissions for `server/status.json` if state changes fail to persist.

**Extending / Contributing**
- Add more role pages or enhance `js/launch.js` to support additional device discovery or a more robust local API.
- Consider replacing local JSON with a lightweight local web service (Flask/FastAPI) if you want richer device discovery or socket-based live updates.

