const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

async function filterByDepartment(department) {
  const query = 'SELECT * FROM employees WHERE department = ?';
  const response = await db.all(query, [department]);

  return { employees: response };
}

// /employees/department/Marketing
app.get('/employees/department/:department', async (req, res) => {
  const department = req.params.department;

  try {
    const results = await filterByDepartment(department);

    if (results.employees.length === 0) {
      return res
        .status(404)
        .json({ message: 'No employees found for department: ' + department });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function filterByJobTitle(job_title) {
  const query = 'SELECT * FROM employees WHERE job_title = ?';
  const response = await db.all(query, [job_title]);

  return { employees: response };
}

// /employees/job_title/HR%20Manager
app.get('/employees/job_title/:job_title', async (req, res) => {
  const job_title = req.params.job_title;

  try {
    const results = await filterByJobTitle(job_title);

    if (results.employees.length === 0) {
      return res
        .status(404)
        .json({ message: 'No employees found for job title: ' + job_title });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function filterByLocation(location) {
  const query = 'SELECT * FROM employees WHERE location = ?';
  const response = await db.all(query, [location]);

  return { employees: response };
}

// /employees/location/New%20York
app.get('/employees/location/:location', async (req, res) => {
  const location = req.params.location;

  try {
    const results = await filterByLocation(location);

    if (results.employees.length === 0) {
      return res
        .status(404)
        .json({ message: 'No employees found for location: ' + location });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function filterByGender(gender) {
  const query = 'SELECT * FROM employees WHERE gender = ?';
  const response = await db.all(query, [gender]);

  return { employees: response };
}

// /employees/gender/male
app.get('/employees/gender/:gender', async (req, res) => {
  const gender = req.params.gender;

  try {
    const results = await filterByGender(gender);

    if (results.employees.length === 0) {
      return res
        .status(404)
        .json({ message: 'No employees found for gender: ' + gender });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log('Server running on port 3000'));
