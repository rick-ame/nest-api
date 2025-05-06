/* eslint-disable @typescript-eslint/no-require-imports */
// @ts-check
/** @typedef {import('webpack').Configuration} WebpackConfiguration */

require('dotenv').config()

const git = require('git-rev-sync')
const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge')

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { version } = require('./package.json')

/**
 * @param {WebpackConfiguration} options
 * @returns {WebpackConfiguration}
 * */
module.exports = (options) =>
  merge(options, {
    plugins: [
      new DefinePlugin({
        'globalThis.VERSION': JSON.stringify(`${version}-${git.short()}`),
        'globalThis.ENABLE_SWAGGER': process.env.ENABLE_SWAGGER,
      }),
    ],
  })
