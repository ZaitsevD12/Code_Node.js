const express = require('express');
const mongoose = require('mongoose');
// const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const morgan = require('morgan');

// подключение к базе данных
mongoose.set("strictQuery", false);

// отключают предупреждения об устаривании useNewUrlParser: true, useUnifiedTopology: true
mongoose.connect('mongodb://127.0.0.1:27017/nodetools', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// engine
app.set('view engine', 'ejs');


app.use(express.static('public'));
// прописывается чтобы через req.body получать введёные данные из формы в декодированном виде
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// сохранение и вытягивание данных из бд 
  // добавление данных в бд
// app.get('/add-blog', (req, res) => {
// const blog = new Blog({ 
//     title: 'new blog',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
// });
  // сохранение данных в бд
// blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

    // поиск всех данных (блогов) и отпрвка их на страницу all-blogs
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//           res.send(result);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
// });

    // поиск конкретного массисва данных (блога) по индентификатору
// app.get('/single-blog', (req, res) => {
//     Blog.findById('63f05a7c0c9d27ead27e3332')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
});

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', { title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    res.render('about', { title: 'About' });
});

app.use(blogRoutes);

    // выдача блогов на страницу index
// app.get('/blogs', (req, res) => {
//     Blog.find().sort({ createAt: -1 })
//         .then((result) => {
//             res.render('index', { title: 'All Blogs', blogs: result })
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });


    // сохраняем данные из формы в бд
// app.post('/blogs', (req, res) => {
//     const blog = new Blog(req.body)

//     blog.save()
//       .then((result) => {
    // перенаправялем на страницу с блогами, после отправки формы
//         res.redirect('/blogs');
//       })
//       .catch((err) => {
//         console.log(err);
//       })
// })

// app.get('/blogs/:id', (req, res) => {
    // получаем id блога 
//     const id = req.params.id;
//     Blog.findById(id)
        // делаем маршрут после нажатие на один из блогов
//       .then(result => {
//         res.render('details', { blog: result, title: 'Blog Details' });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });
    
    // удаление
// app.delete('/blogs/:id', (req, res) => {
//     const id = req.params.id;

//     Blog.findByIdAndDelete(id)
//         .then(result => {
//           res.json({ redirect: '/blogs' })
//         })   
//         .catch(err => {
//             console.log(err);
//         })
// })

// app.get('/blog/create', (req, res) => {
//     res.render('create', { title: 'Create a new blog' });
// })

app.use((req, res) => {
    res.status(404).render('400', { title: '404' });
})

