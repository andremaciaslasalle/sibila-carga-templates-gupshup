require('dotenv').config();
const axios = require('axios');

const Template = require('./models/Template')

const headers = { token: `${process.env.ACCESS_TOKEN}` }
let templates = [];

const descargaTemplates = async () => {
    await axios.get(`http://partner.gupshup.io/partner/app/${process.env.APP_ID}/templates`, { headers })
        .then((response) => {
            templates = response.data.templates.map((template) => {
                if (template.status != 'REJECTED') {
                    const templateReturn = {
                        appId: template.appId,
                        data: template.data,
                        elementName: template.elementName,
                        id: template.id,
                        example: template?.meta ? template.meta.replace(`{\"example\":\"`, '').replace(`\"}`, '').replaceAll(`[`, '{{').replaceAll(`]`, '}}') : null,
                        status: template.status
                    }
                    return templateReturn;
                } else {
                    return null;
                }
            });
            insertaTemplates();
        });
}

const insertaTemplates = async () => {
    templates.forEach(async (template) => {
        if (template !== null) {
            console.log('\n*******TEMPLATE*******\n', template);
            await Template.create({
                message_reference: template.data,
                message_content: template.example,
                template_token: template.id
            });
            console.log('\n************************\n');
        }
    });
}

templates = descargaTemplates();