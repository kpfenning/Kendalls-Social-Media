const { connect, connection } = require('mongoose');

const connections = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/SocialMediaDB';

connect(connections, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connection.on('connected', () => {
    console.log('MongoDB connected')
});

module.exports = { connect, connection}

