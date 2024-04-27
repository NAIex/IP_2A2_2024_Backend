import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'REST API Docs',
            version: "5.0.0"
        },

        servers: [
            {
                url: "http://localhost:4000"
            }
        ],
    },

    apis: ['./api/routes/*.js']

};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
