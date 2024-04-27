const gqlEndpoint = 'http://localhost:3000/api/gql'

/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const config = {
  react: true,
  scalarTypes: { DateTime: 'string' },
  introspection: {
    endpoint: gqlEndpoint,
    headers: {},
  },
  destination: './src/gqty/index.ts',
  subscriptions: false,
  javascriptOutput: false,
  enumsAsConst: false,
}

module.exports = config
