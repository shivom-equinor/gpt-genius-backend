const config = {
    user: 'shivom0412', // better stored in an app setting such as process.env.DB_USER
    password: 'Shiv@1204', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'gptgeniuspocsqlserver.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'GPTGeniusPOC', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

module.exports = config;