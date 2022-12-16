const debug = require('debug')('car-shop:db:setup')
import inquirer from 'inquirer' // Interaction with software engineer
import minimist from 'minimist'
import path from 'path'


const db = require(path.join(__dirname, '../')),
  args = minimist(process.argv),
  prompt = inquirer.createPromptModule()

async function setup () {
  if (!args.yes) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database, are you sure?'
      }
    ])

    if (!answer.setup) {
      return console.log('Nothing happened :)')
    }
  }

  const config = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`fatal error!: ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()