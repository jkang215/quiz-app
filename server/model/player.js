const db = require("./../database");

const createPlayer = (req, res, next) => {
  // TODO: save created game as the value of the res.locals.game key
  // req.body will have the key quizID which should be saved to the game model
  const query = `INSERT INTO player(displayName) VALUES($1) RETURNING *`;

  // TODO: change with correct value
  const values = ["SomeDisplayName"];

  // callback
  db.query(query, values, (err, res) => {
    if (err) {
      // handle error
    } else {
      const player = res.rows[0];
      // do something
      next();
    }
  });
};

const getPlayer = (req, res, next) => {};

module.exports = {
  createPlayer,
  getPlayer
};
