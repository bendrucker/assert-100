'use strict'

const test = require('tape')
const child = require('child_process')

test('covered', function (t) {
  t.plan(2)
  child.execFile('node', ['./cli.js', 'node', './covered.js'], function (err, output) {
    if (err) return t.end(err)
    output = output.toString()
    t.comment('nyc output')
    console.log(output)
    t.ok(/covered\.js/.test(output), 'mentions file name')
    const matches = output.match(/100/g)
    t.equal(matches.length, 8, '8 100s, 4 types per file + summary')
  })
})

test('uncovered', function (t) {
  t.plan(4)
  child.execFile('node', ['./cli.js', 'node', './uncovered.js'], function (err, output) {
    output = output.toString()
    t.comment('nyc output')
    console.log(output)
    t.ok(err, 'returns non-zero exit')
    t.ok(/uncovered\.js/.test(output), 'mentions file name')
    const covered = output.match(/100/g)
    const halfCovered = output.match(/50/g)
    t.equal(covered.length, 4, 'full fn and line coverage')
    t.equal(halfCovered.length, 4, 'half statement and branch coverage')
  })
})
