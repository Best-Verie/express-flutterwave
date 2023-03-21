
const express = require("express");
const Flutterwave = require("flutterwave-node");
const dotenv = require('dotenv')
const app = express();
app.use(express.json());
dotenv.config()
const flutterwave = new Flutterwave(process.env.FLUTTERWAVE_PUBLIC_KEY, process.env.FLUTTERWAVE_SECRET_KEY, process.env.FLUTTERWAVE_ENCRYPTION_KEY);

app.post("/card-charge", async (req, res) => {
    try {
        // Get the card details from the request body
        // const { card_number, cvv, expiry_month, expiry_year, pin } = req.body;

        console.log(req.body)

        // Set up the Flutterwave payment details
        // const paymentData = {
        //     txRef: "test_transaction",
        //     amount: "100",
        //     currency: "NGN",
        //     payment_options: "card",
        //     card: {
        //         number: card_number,
        //         cvv: cvv,
        //         expiry_month: expiry_month,
        //         expiry_year: expiry_year,
        //         pin: pin
        //     },
        //     customer: {
        //         email: "user@example.com",
        //         phonenumber: "08123456789",
        //         name: "John Doe"
        //     },
        //     meta: {
        //         consumer_id: 23,
        //         consumer_mac: "92a3-912ba-1192a"
        //     },
        //     on_success: function (response) {
        //         console.log(response);
        //         res.send("Payment successful!");
        //     },
        //     on_error: function (error) {
        //         console.log(error);
        //         res.send("Payment failed.");
        //     },
        //     on_close: function () {
        //         console.log("Payment closed.");
        //     }
        // };
        // console.log("paymentData", paymentData)

        const details = {
            "cardno": "5531886652142950",
            "cvv": "564",
            "expirymonth": "09",
            "expiryyear": "32",
            "currency": "NGN",
            "amount": "100",
            "fullname": "Yolande Aglaé Colbert",
            "email": "user@example.com",
            "txRef": "MC-3243e",
            "redirect_url": "https://www.flutterwave.ng"
        };

        // Make the Flutterwave API call to charge the card
        const response = await flutterwave.Card.charge(details);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred.");
    }
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
