export const transactionUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3002'
        : 'https://transaction.onrender.com'

export const importerUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3001'
        : 'https://importer.onrender.com'