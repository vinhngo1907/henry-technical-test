const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const transactionController = {
    create: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: "Please login now!" })
            const { date, content, amount, type } = req.body;
            console.log("?????", req.body)
            const parsedDate = dayjs(date, 'DD/MM/YYYY HH:mm:ss', true);
            if (!parsedDate.isValid()) {
                return res.status(400).json({ error: 'Invalid date format. Expected DD/MM/YYYY HH:mm:ss' });
            }

            const transaction = await prisma.transaction.create({
                data: {
                    date: parsedDate.toDate(),
                    content,
                    amount: parseFloat(amount),
                    type,
                    user: {
                        connect: {
                            id: req.user.id,
                        },
                    },
                }
            });
            console.log({ transaction })
            res.status(201).json(transaction);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create transaction' });
        }
    },

    get: async (req, res) => {
        console.log("???", req.user)
        console.log("???", req.query)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [transactions, total] = await Promise.all([
            prisma.transaction.findMany({
                skip,
                take: limit,
                orderBy: { date: 'desc' }, // optional
            }),
            prisma.transaction.count()
        ]);

        res.json({
            transactions,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    }
}

module.exports = transactionController;