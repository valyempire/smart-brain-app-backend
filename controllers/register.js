const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  console.log(req.body);
  if (!email || !name || !password) {
    return res.status(400).json("incolrect form submision");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    console.log(trx);
    trx

      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")

      .then(() => {
        return trx("users")
          .returning("*")
          .insert({
            email: email,
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json(err));
};

export default { handleRegister };
