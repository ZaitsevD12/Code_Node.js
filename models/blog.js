const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// в схеме мы прописываем как будут устроены данные (структуру документов) в бд, их типы и тгд

const blogSchema = new Schema({
    title: {
        type: String,
        // обозначает что этот тип обязателен для таблицы блога
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    } 
}, {timestamps: true });

// timestamps включает временные метки

const Blog = mongoose.model('Blogs', blogSchema);
module.exports = Blog;