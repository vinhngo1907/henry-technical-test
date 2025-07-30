const transactionController = {
    create: async (req, res) => {
        try {
            const { date, content, amount, type } = req.body;

            const transaction = await prisma.transaction.create({
                data: {
                    date: new Date(date),
                    content,
                    amount: parseFloat(amount),
                    type
                }
            });
            res.status(201).json(transaction);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create transaction' });
        }
    },

    get: async (req, res) => {
        const transactions = await prisma.transaction.findMany();
        res.json(transactions);
    }
}

module.exports = transactionController;