export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'This is a sample API for learning purpose using express and swagger'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Localhost server'
            }
        ]
    },
};
