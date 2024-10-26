//environment.development.ts//
export const environment = {
    production: false,
    appName: '[DEV] Web App',
    apiBaseUrl: 'https://localhost:5001',
    allowedDomains: ['localhost:5001'] // Allow requests to these domains for JWT module in app.config.ts
};