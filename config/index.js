const dev = process.env.NODE_ENV !== 'production'

export const server = dev ?  'http://127.0.0.1:3000': 'http://167.172.186.37:3000'