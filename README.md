# ServiceCap

A quote board for home repair and improvement jobs. Homeowners post a job, contractors add quotes, and each job shows the median, low, and high price across its quotes.

## Features

- Post a job with service type (roofing, plumbing, electrical, HVAC, painting, landscaping, flooring), description, square footage, location, and urgency
- Browse posted jobs with their quote counts
- Submit a quote for a job with company name, amount, estimated days, and notes
- Each job shows median, lowest, and highest quote and the number of quotes
- Entries are saved to a local JSON file

## Getting started

Requires Node.js.

```bash
npm install
npm start
```

Then open http://localhost:3002. `npm run dev` runs the same command.

## How it works

- `index.html` has three tabs: Post a Job, Browse Jobs, and Submit Quote. It calls the API at `http://localhost:3002`.
- `server.js` is an Express app that serves the page and exposes:
  - `POST /api/jobs` and `GET /api/jobs` to create and list jobs.
  - `GET /api/jobs/:id` to return a job, its quotes, and quote stats.
  - `POST /api/quotes` to add a quote to a job.
  - `GET /api/services` to list the service types that have jobs.
- Data is written to `data.json`, created on first run and ignored by git. `utils.js` holds helpers not yet wired in.

## Status

Prototype. No accounts, so anyone can post jobs or quotes, and there is no contractor verification or messaging.

## License

MIT, see [LICENSE](LICENSE).
