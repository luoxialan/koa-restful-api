const config = {
    PORT: 3000,
    GCP_API_KEY: '',
    GCP_URL: 'https://maps.googleapis.com/maps/api/distancematrix/json',
    DB_OPTIONS: {
        host: 'mysql-container',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'demodb',
        connectionLimit : 20,
        debug: false
    },
    ORDER_STATUS: {
        1: 'SUCCESS',
        0: 'UNASSIGNED'
    },
    DIST_UNIT: {
        kilometer: 'km',
        meter: 'm'
    }
};
module.exports = config;