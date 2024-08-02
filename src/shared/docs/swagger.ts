import swaggerAutogen from 'swagger-autogen';
const outputFile = './swagger_output.json';
const endpointsFiles = ['src/modules/**/routes.ts'];
const doc = {
  info: {
    version: '1.0.0',
    title: 'Teddy API',
    description: 'Routes available for the use of the api',
  },
  host: 'localhost',

  basePath: '/',
  schemes: ['http'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description:
        ">- Enter the token with the `Bearer: ` prefix, e.g. 'Bearer abcde12345'",
    },
  },
  consumes: ['application/json'],
  produces: ['application/json'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
