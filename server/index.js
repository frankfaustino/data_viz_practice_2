require('dotenv').config()
const app = require('express')()
const cors = require('cors')

const db = require('./db')

app.use(cors())

const getCreatedAtCount = async (date, name) => {
  try {
    const response = await db.count('*')
      .from('ConversationDetailsTable')
      .where({ name })
      .andWhere('created_at', 'like', date)
    return response[0]['count(*)']
  } catch (e) { console.error(e) }
}

const getClosedCount = async (date, name) => {  
  try {
    const response = await db.count('*')
      .from('ConversationDetailsTable')
      .where({ name })
      .andWhere('updated_at', 'like', date)
      .andWhere('open', false)
    return response[0]['count(*)']
  } catch (e) { console.error(e) }
}

app.get('/stats', async ({ query: { name } }, res) => {
  const count = []
  const startDate = new Date(2019, 0, 304)

  if (name) {
    for (let i = 0; i < 47; i++) {
      startDate.setDate(startDate.getDate() + 1)
      const dateStr = `${startDate.getUTCFullYear()}-${startDate.getUTCMonth()}-${startDate.getUTCDate()}%`
      const open = await getCreatedAtCount(dateStr, name)
      const close = await getClosedCount(dateStr, name)
      count.push({ date: startDate.toISOString(), open, close })
    }
  }
  res.json(count)
})


app.listen(8888, () => console.log('listening on port 8888'))