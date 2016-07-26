#!/usr/bin/env node

'use strict'

const path = require('path')
const child = require('child_process')
const foreground = require('foreground-child')
const flatten = require('flatten')

const nyc = path.resolve(child.execFileSync('npm', ['bin']).toString().trim(), 'nyc')
const types = ['lines', 'functions', 'branches']

foreground(nyc, flatten([
  '--check-coverage',
  types.map(toFlag),
  process.argv.slice(2)
]))

function toFlag (type) {
  return `--${type}=100`
}
