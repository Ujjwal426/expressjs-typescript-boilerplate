module.exports = {
    apps: [{
        name: 'ExpressJS_Server',
        script: 'dist/server.js',
        autorestart: true,
        max_memory_restart: '800M',
    }]
};