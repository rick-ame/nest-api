/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
/** @typedef {import('webpack').Configuration} WebpackConfiguration */

const git = require('git-rev-sync')
const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge')

const { version } = require('./package.json')

/** @returns {WebpackConfiguration} */
module.exports = (options) =>
  merge(options, {
    plugins: [
      new DefinePlugin({
        'globalThis.VERSION': JSON.stringify(`${version}-${git.short()}`),
      }),
    ],
  })
