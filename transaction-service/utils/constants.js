const clientUrl = process.env.NODE_ENV !== "production" 
? process.env.CLIENT_URL 
: "https://mern-v-client.netlify.app";

const importerUrl = process.env.NODE_ENV !== 'production'
? process.env.IMPORTER_URL
:"https://importer-service.onrender.com"

const transactionUrl = process.env.NODE_ENV !== 'production'
? process.env.TRANSACTION_URL
:"https://transaction-service-ch4q.onrender.com"

module.exports = {
    clientUrl,
    importerUrl,
    transactionUrl
};