module.exports = {
    dev: {
        port : process.env.port || 5555,
        local_db  : process.env.DB_LINK || "mongodb://localhost:27017/blogdata",
        mlab: 'mongodb://adopter30:passlock30@ds241019.mlab.com:41019/adopters'
    }
}
