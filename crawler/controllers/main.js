

const postNewsData = (req, db) => {
  // const { title } = req
  const added = new Date()
  db('articles').insert({
    "title": req[0], "date": req[1], "newsorg": req[2], "pubtime": req[3], "link": req[4], "created_at": added, "updated_at": added
  })
    .returning('*')
    .catch(err => console.log(err))
}

const getNewsData = (req, res, db) => {
  db.select('*').from('articles').orderBy("pubtime", "desc")
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json({ dataExists: 'false' })
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

module.exports = {
  postNewsData,
  getNewsData
}