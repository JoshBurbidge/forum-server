const { Post } = require('../model/Post');


const extractData = (post) => {
    post.map((p => p.toJSON()));
}

module.exports = { extractData }