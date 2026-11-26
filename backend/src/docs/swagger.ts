import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Temu API Documentation",
    description: "Temu API Documentation",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local server",
    },
    {
      url: "https://temu-up62.onrender.com/api",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "dev",
        password: "dev123",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
