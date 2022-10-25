require('dotenv').config();
const axios = require('axios');

const Template = require('./models/Template')

const headers = {token:`${process.env.ACCESS_TOKEN}`}
let templates = [];

const descargaTemplates = async()=>{
    await axios.get(`http://partner.gupshup.io/partner/app/${process.env.APP_ID}/templates`,{headers})
    .then((response)=>{
        templates = response.data.templates.map((template)=>{
            const templateReturn = {
                appId:template.appId,
                data:template.data,
                elementName:template.elementName,
                id:template.id,
                example:template?.meta?template.meta.replace(`{\"example\":\"`,'').replace(`\"}`,'').replace(`[`,'{{').replace(`]`,'}}'):null,
                status:template.status
            }
            return templateReturn;
        });
        insertaTemplates();
    });
}

const insertaTemplates = async()=>{
    templates.forEach(async(template)=>{
        console.log('\n*******TEMPLATE*******\n',template);
        await Template.create({
            message_reference:template.data,
            message_content:template.example,
            template_token:template.id
        });
    });
}

templates = descargaTemplates();