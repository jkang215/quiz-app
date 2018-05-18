const pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

// var conString = process.env.ELEPHANTSQL_URL || "postgres://postgres:5432@localhost/postgres";
const conString = 'postgres://njdtemfqmjdghs:3875341f65105a84486a922bfea0958397530a6f4aa427cf6e6074b2e3ab0e3b@ec2-23-23-130-158.compute-1.amazonaws.com:5432/d7kg52e6big7qp';

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log('connected at ', result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});