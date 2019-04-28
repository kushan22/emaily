
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const creditsRequired = require('../../middlewares/minimumCreditsRequired');
const loginRequired = require('../../middlewares/requireLogin');
const mongoose = require('mongoose');
const Mailer = require('../../services/Mailer');
const surveyTemplate = require('../../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = (app) => {


    app.get('/api/surveys', loginRequired, async (req,res) => {
       const surveys = await  Survey.find({
            _user:req.user.id
        }).select({recipients: false});

        res.send(surveys);
    });

    app.get('/api/surveys:surveyId/:choice', (req,res) => {
        res.send("Thanks for voting");
    });

    app.post('/api/surveys/webhooks',(req,res) => {

        //console.log(req.body);
        const parser = new Path('/api/surveys/:surveyId/:choice');
        const events = _.map(req.body,(event) => {
        if (event.event === 'click'){
            const pathName = new URL(event.url).pathname;
            const match = parser.test(pathName);
            if (match){
                return {
                    email: event.email,
                    surveyId: match.surveyId,
                    choice: match.choice
                };
            }
        }    
        
        
        });

        const compactEvents = _.compact(events); // Removes undefined values
        const uniqueEvents = _.uniqBy(compactEvents,'email','surveyId'); // Removes Duplicates

        _.map(uniqueEvents, (event) => {
            Survey.updateOne({
                _id: event.surveyId,
                recipients: {
                    $elemMatch: {email: event.email,responded:false}
                }
            }, {
                $inc: { [event.choice]: 1},
                $set: {'recipients.$.responded': true},
                lastResponded: new Date()
            }
            ).exec();
        });

        console.log(uniqueEvents);

        res.send({});

        //console.log(events);
    });

    app.post('/api/surveys',loginRequired,creditsRequired, async (req,res) => {
        const title = req.body.title;
        const subject = req.body.subject;
        const body = req.body.body;
        
        const recipients = req.body.recipients;
        

        const survey = new Survey({
            title: title,
            subject: subject,
            body: body,
            recipients: recipients.split(",").map((email) => {
                return { email : email.trim()}
            }),
            _user: req.user.id,
            dateSent: Date.now()

        });

        // Send email

        const mailer = new Mailer(survey,surveyTemplate(survey));

        try{
            await mailer.send();
            await survey.save();

            req.user.credits -= 1;
            const user = await req.user.save();

        

        
            res.send(user);
        }catch( err ){
            res.status(422).send(err);
        }

        


    });
};