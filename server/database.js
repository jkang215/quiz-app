const { Client } = require("pg");
const url =
  "postgres://njdtemfqmjdghs:3875341f65105a84486a922bfea0958397530a6f4aa427cf6e6074b2e3ab0e3b@ec2-23-23-130-158.compute-1.amazonaws.com:5432/d7kg52e6big7qp";
const database = new Client({
  connectionString: url,
  ssl: true
});

module.exports = database;
