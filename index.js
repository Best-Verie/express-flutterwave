const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const Flutterwave = require('flutterwave-node');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const flutterwave = new Flutterwave(process.env.FLUTTERWAVE_PUBLIC_KEY, process.env.FLUTTERWAVE_SECRET_KEY);

app.post('/invoices', async (req, res) => {
    const { customer, amount, currency, description } = req.body;

    const data = {
        tx_ref: `INV-${Math.floor(Math.random() * 1000000)}`,
        amount,
        currency,
        payment_options: 'card',
        redirect_url: 'https://example.com/redirect',
        customer: {
            email: customer.email,
            phone_number: customer.phone_number,
            name: customer.name,
        },
        customizations: {
            title: 'My Store',
            description,
            logo: 'https://example.com/logo.png',
        },
    };

    try {
        const response = await flutterwave.flutterwaveInvoices(data);
        res.json({ url: response.data.data.link });
    } catch (error) {
        res.json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
