#!/usr/bin/env node

'use strict'

const chalk = require("chalk")

const { readFile } = require("fs")
const { join } = require("path")

readFile(join(__dirname, "key.asc"), "utf8", (err, key) => {
  if (!err)
    process.stdout.write(chalk.cyan.bold(key))
})

readFile(join(__dirname, "info.json"), "utf8", (err, content) => {
  if (err) throw err

  const info = JSON.parse(content)
  let largestAttribute = null

  for (const [k, _] of Object.entries(info)) {
    if (largestAttribute) {
      if (k.length > largestAttribute.length) {
        largestAttribute = k
      }
    } else {
      largestAttribute = k
    }
  }

  let infos = []

  for (const [k, v] of Object.entries(info)) {
    let spaces = 0
    const space = ' '

    spaces = largestAttribute.length - k.length
    let key = ` ${space.repeat(spaces)}${k} `
    infos.push(`${chalk.bgMagenta.black(key)} ${chalk.magenta.bold(v)}`)
  }

  // FIX: dont access the array directly like that
  const bee =
    `          .\n\
       . '\n\
   . '        ${infos[0]}\n\
  .           ${infos[1]}\n\
 .            ${infos[2]}\n\
 .         .' '.            __\n\
  .        .   .           (__\\\n\
   .         .         . -{{_(|8)\n\
     ' .  . ' ' .  . '     (__/\n`


  console.log(chalk.yellow(bee))
})
