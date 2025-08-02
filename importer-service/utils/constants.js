const clientUrl = process.env.NODE_ENV !== "production" 
? process.env.CLIENT_URL 
: "https://mern-v-client.netlify.app";

const transactionUrl = process.env.NODE_ENV !== 'production'
? process.env.TRANSACTION_URL
:"https://transaction-service-ch4q.onrender.com"

module.exports = {
    clientUrl,
    transactionUrl
};