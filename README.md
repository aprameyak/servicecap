# ServiceCap

Home services cost transparency. Post a project, get quotes from contractors, see market pricing.

## Features

- Post home service jobs (roofing, plumbing, electrical, HVAC, etc.)
- Contractors submit quotes for jobs
- View quote statistics: median, min, max
- Compare pricing across contractors
- Transparent project details and quote history

## Quick Start

```bash
npm install
npm start
```

Open `index.html` in your browser. API runs on `http://localhost:3002`.

## API

- `POST /api/jobs` - Post a new job
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job with quotes and stats
- `POST /api/quotes` - Submit a quote for a job

## License

MIT, see [LICENSE](LICENSE).
