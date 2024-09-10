const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config();

// HubSpot private app token
const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_TOKEN;

// Route 1: Get contacts and render homepage
app.get('/', async (req, res) => {
    const contactsUrl = 'https://api.hubapi.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${process.env.PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(contactsUrl, { headers });
        const data = response.data.results;
        res.render('homepage', { title: 'Contacts', data });
    } catch (error) {
        console.error('Error fetching contact data:', error);
        res.status(500).send('Error fetching data');
    }
});

// Route 2: Render form to create new contact
app.get('/update-contact', (req, res) => {
    res.render('updates', { title: 'Add a New Contact' });
});

// Route 3: Handle POST request to create new contact
app.post('/update-contact', async (req, res) => {
    const { firstname, lastname, email } = req.body;
    const contactsUrl = 'https://api.hubapi.com/crm/v3/objects/contacts';

    const headers = {
        Authorization: `Bearer ${process.env.PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(contactsUrl, {
            properties: {
                firstname,
                lastname,
                email
            }
        }, { headers });
        res.redirect('/');
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).send('Error creating contact');
    }
});

// Start server on port 3000
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


