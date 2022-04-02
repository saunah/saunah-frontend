const users = require('./data/users')
const greeting = require('./data/greeting')

module.exports = () => ({
    greeting: greeting,
    users: users,
})
