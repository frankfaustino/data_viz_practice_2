require('dotenv').config()
const app = require('express')()
const axios = require('axios')

const { baseURL, password, username } = process.env
const jira = axios.create({
  baseURL,
  auth: { username, password },
  headers: { 'Accept': 'application/json' }
})

// const devrel = [
//   'nahmadkhani',
//   'rachel.antion',
//   'chetan.bhatia',
//   'nathan.binding',
//   'lauri.cerneck',
//   'dex.cook',
//   'tcottingham',
//   'sreya.dutta',
//   'sonny.espinoza',
//   'frank.faustino',
//   'lori.heles',
//   'richelle.herrli',
//   'nicholas.ho',
//   'rkavasseri',
//   'emily.lucek',
//   'joel.mcintyre',
//   'paul.petyo',
//   'brie.ruse',
//   'aditya.singh',
//   'michael.szekley',
//   'mike.tomko',
//   'ricardo.ventura'
// ]

app.get('/issue', async ({ query: { issueKey } }, res) => {
  try {
   const { data } = await jira.get(`/issue/${issueKey}`)
    console.log(data)
    res.json(data)
  } catch ({ message }) {
    console.log(message)
  }
})

app.get('/timetracking', async (req, res) => {
  try {
    const { data } = await jira.get('/configuration/timetracking/list')
    console.log(data)
    res.json(data)
  } catch ({ message }) {
    console.log(message)
  }
})

app.get('/myself', async (req, res) => {
  try {
    const { data } = await jira.get('/myself')
    console.log(data)
    res.json(data)
  } catch ({ message }) {
    console.log(message)
  }
})

app.listen(8888, () => console.log('listening on port 8888'))