const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const chokidar = require('chokidar');

class JSONDatabaseServer {
  constructor(file, port = 3000, delay = 0) {
    this.file = file;
    this.port = port;
    this.delay = delay;
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  loadDatabase() {
    try {
      const data = fs.readFileSync(this.file, 'utf8');
      this.database = JSON.parse(data);
    } catch (err) {
      console.error('Error loading database file:', err.message);
      this.database = {};
    }
  }

  saveDatabase() {
    try {
      fs.writeFileSync(this.file, JSON.stringify(this.database, null, 2));
    } catch (err) {
      console.error('Error saving database file:', err.message);
    }
  }

  setupRoutes() {
    Object.keys(this.database).forEach((key) => {
      // GET all records for a resource
      this.app.get(`/${key}`, (req, res) => {
        setTimeout(() => res.json(this.database[key]), this.delay);
      });

      // GET a single record by ID
      this.app.get(`/${key}/:id`, (req, res) => {
        const record = this.database[key].find((item) => item.id == req.params.id);
        if (record) {
          setTimeout(() => res.json(record), this.delay);
        } else {
          setTimeout(() => res.status(404).json({ error: `No record found with ID ${req.params.id}` }), this.delay);
        }
      });

      // POST a new record
      this.app.post(`/${key}`, (req, res) => {
        const newRecord = { id: Date.now(), ...req.body };
        this.database[key].push(newRecord);
        this.saveDatabase();
        setTimeout(() => res.status(201).json(newRecord), this.delay);
      });

      // PUT (update) a record by ID
      this.app.put(`/${key}/:id`, (req, res) => {
        const index = this.database[key].findIndex((item) => item.id == req.params.id);
        if (index > -1) {
          this.database[key][index] = { ...this.database[key][index], ...req.body };
          this.saveDatabase();
          setTimeout(() => res.json(this.database[key][index]), this.delay);
        } else {
          setTimeout(() => res.status(404).json({ error: `No record found with ID ${req.params.id}` }), this.delay);
        }
      });

      // DELETE a record by ID
      this.app.delete(`/${key}/:id`, (req, res) => {
        const index = this.database[key].findIndex((item) => item.id == req.params.id);
        if (index > -1) {
          const [deleted] = this.database[key].splice(index, 1);
          this.saveDatabase();
          setTimeout(() => res.json(deleted), this.delay);
        } else {
          setTimeout(() => res.status(404).json({ error: `No record found with ID ${req.params.id}` }), this.delay);
        }
      });
    });
  }

  watchDatabase() {
    chokidar.watch(this.file).on('change', () => {
      console.log('Database file updated. Reloading...');
      this.loadDatabase();
    });
  }

  start() {
    this.loadDatabase();
    this.setupRoutes();
    this.watchDatabase();
    this.app.listen(this.port, () => {
      console.log(`Mock DB Server running on http://localhost:${this.port}`);
    });
  }
}

module.exports = JSONDatabaseServer;
