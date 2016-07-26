#!/usr/bin/env node

'use strict'

const path = require('path')
const child = require('child_process')
const foreground = require('foreground-child')
const flatten = require('flatten')

const nyc = path.resolve(child.execFileSync('npm', ['bin']).toString().trim(), 'nyc')
const types = ['lines', 'functions', 'branches']
const args = process.argv.slice(2)

if (!args.length) {
  const pkg = require('./package.json')
  return console.log(`
    ${pkg.description}

    Usage
      $ 100 <command> <args...>
    Examples:
      $ 100 tape test.js
      $ 100 mocha test.js
      $ 100 node test.js
    Options:
      https://github.com/istanbuljs/nyc


    **   ****   ****
   ***  *///** *///**
  //** /*  */*/*  */*
   /** /* * /*/* * /*
   /** /**  /*/**  /*
   /** /*   /*/*   /*
   ****/ **** / ****
  ////  ////   ////
  `)
}

foreground(nyc, flatten([
  '--check-coverage',
  types.map(toFlag),
  process.argv.slice(2)
]))

function toFlag (type) {
  return `--${type}=100`
}
