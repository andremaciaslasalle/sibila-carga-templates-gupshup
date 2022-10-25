const { DataTypes,Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_DB,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
    host:process.env.DATABASE_HOST,
    dialect:'mysql'
});

const Template = sequelize.define('templates_gupshups',{
    //id
    //message_reference
    message_reference:{
        type:DataTypes.STRING(1000),
        allowNull:true
    },
    //message_content
    message_content:{
        type:DataTypes.STRING(1000),
        allowNull:true
    },
    //template_token
    template_token:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    //client_organization_ident
    //createdAt
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:new Date()
    },
    //updatedAt
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue:new Date()
    },
    //companyId
    companyId:{
        type:DataTypes.INTEGER,
        defaultValue:process.env.DATABASE_COMPANY,
        allowNull:true
    }
})

module.exports = Template