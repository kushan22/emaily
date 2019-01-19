
const keys = require('../../config/keys');
const stripe = require('stripe')(
    keys.stripeSecretKey
);

const requireLogin = require('../../middlewares/requireLogin');


module.exports = (app) => {
    app.post('/api/stripe',requireLogin,async (req,res) => {

    

        // Create charge and get the response
       const charge =  await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: 'You were charged $5 for 5 credits',
            source: req.body.id
        });

        //console.log(charge);
        // Now add credits to user account based on the charge

       
        req.user.credits += 5;
        const user = await req.user.save(); 
        

        // Uptodate user model gets returned

        res.send(user);
    });
}