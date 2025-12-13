#!/usr/bin/env node

'use strict'

const chalk = require("chalk")
const lolcat = require("lolcatjs")

lolcat.options.spread = 2
lolcat.options.seed = Math.round(Math.random() * 1000)

const { readFile } = require("fs")
const { join } = require("path")
const bee = "          .                      \n       . '                       \n   . '                           \n  .                              \n .                               \n .         .' '.            __   \n  .        .   .           (__\\ \n   .         .         . -{{_(|8)\n     ' .  . ' ' .  . '     (__/  \n"

readFile(join(__dirname, "info.json"), "utf8", (err, content) => {
  if (err) throw err

  lolcat.fromString(bee)

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

  for (const [k, v] of Object.entries(info)) {
    let spaces = 0
    const space = ' '

    spaces = largestAttribute.length - k.length
    let key = ` ${space.repeat(spaces)}${k} `
    console.log(`${chalk.bgMagenta.black(key)} ${chalk.magenta.bold(v)}`)
  }
})
