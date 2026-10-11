const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

const dataFile = path.join(__dirname, 'data.json');

const initData = () => {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({
      jobs: [],
      quotes: []
    }));
  }
};

const readData = () => {
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

app.post('/api/jobs', (req, res) => {
  const { serviceType, description, squareFeet, location, urgency } = req.body;

  const data = readData();
  const job = {
    id: Date.now(),
    serviceType,
    description,
    squareFeet: parseInt(squareFeet),
    location,
    urgency,
    createdAt: new Date().toISOString(),
    quotes: []
  };
  data.jobs.push(job);
  writeData(data);

  res.json({ success: true, jobId: job.id });
});

app.post('/api/quotes', (req, res) => {
  const { jobId, contractorName, amount, estimatedDays, notes } = req.body;

  const data = readData();
  const job = data.jobs.find(j => j.id === parseInt(jobId));

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  const quote = {
    id: Date.now(),
    contractorName,
    amount: parseFloat(amount),
    estimatedDays: parseInt(estimatedDays),
    notes,
    submittedAt: new Date().toISOString()
  };

  job.quotes.push(quote);
  writeData(data);

  res.json({ success: true, message: 'Quote added' });
});

app.get('/api/jobs', (req, res) => {
  const data = readData();
  res.json({ jobs: data.jobs });
});

app.get('/api/jobs/:id', (req, res) => {
  const data = readData();
  const job = data.jobs.find(j => j.id === parseInt(req.params.id));

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  const stats = job.quotes.length > 0 ? {
    count: job.quotes.length,
    median: job.quotes.map(q => q.amount).sort((a, b) => a - b)[Math.floor(job.quotes.length / 2)],
    mean: job.quotes.reduce((a, b) => a + b.amount, 0) / job.quotes.length,
    min: Math.min(...job.quotes.map(q => q.amount)),
    max: Math.max(...job.quotes.map(q => q.amount))
  } : null;

  res.json({ job, stats });
});

app.get('/api/services', (req, res) => {
  const data = readData();
  const services = [...new Set(data.jobs.map(j => j.serviceType))];
  res.json({ services });
});

const PORT = 3002;
initData();
app.listen(PORT, () => {
  console.log(`ServiceCap API running on port ${PORT}`);
});
