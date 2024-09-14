require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const _ = require('lodash');
const { ListCollectionsCursor } = require('mongodb');

const uri = "mongodb+srv://" + process.env.USER_NAME + ":" + process.env.PASSWORD + "@cluster0.w4z0kmh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri);

const articleSchema = {
    title: String,
    content: String
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/favicon.ico', (req, res) => res.status(204));

const Article = mongoose.model("article", articleSchema);

//////// all articles requests 


app.route('/articles').get((req, res) => {
    let findingArticles = Article.find({});
    findingArticles.exec().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}).post((req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let article = new Article(
        {
            title: title,
            content: content
        }
    );
    article.save();
    res.send('ok');
}).delete((req, res) => {
    Article.deleteMany({}).exec().then(() => {
        res.send('everything is gone');
    }).catch((err) => {
        res.send(err);
    })
});

/////////////// specific article request

app.route('/articles/:articleTitle').get((req, res) => {
    let articleTitle = req.params.articleTitle;
    Article.findOne({ title: articleTitle }).exec().then((result) => {
        res.send(result);
    }).catch((err) => { res.send(err); });
}).put((req, res) => {
    let articleTitle = req.params.articleTitle;
    let newArticleContent = req.body.content;
    let newArticleTitle = req.body.title;
    Article.updateOne({ title: articleTitle },
        {
            title: newArticleTitle,
            content: newArticleContent
        },
        {
            overwrite: true
        }).exec().then(() => {
            res.send('updated');
        }).catch((err) => {
            res.send(err);
        });

}).patch((req, res) => {
    let articleTitle = req.params.articleTitle;
    Article.updateOne({ title: articleTitle }, {
        $set: req.body
    }).exec().then(() => {
        res.send('patched successfully');
    }).catch((err) => {
        res.send(err);
    });
}).delete((req, res) => {
    let articleTitle = req.params.articleTitle;
    Article.deleteOne({ title: articleTitle }).exec().then(() => {
        res.send('ok');
    }).catch((err) => {
        res.send(err);
    });
});



////////// to do list 

const itemsSchema = {
    name: String
};

const listSchema = {
    name: String,
    customListItems: [itemsSchema]
};

const List = mongoose.model('List', listSchema);

const Item = mongoose.model('Item', itemsSchema);

const temp = new Item({ name: 'temp' });


app.route('/todolist').get((req, res) => {
    Item.find({}).exec().then((result) => { res.send(result) }).catch((err) => { res.send(err) });
}).post((req, res) => {
    console.log(req.body.newItem)
    const item = new Item({ name: req.body.newItem });
    console.log(item);
    item.save();
    res.send('added');
}).put((req, res) => {

}).patch((req, res) => {

}).delete((req, res) => {
    Item.deleteOne({ name: req.body.id }).exec().then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    });
});

app.route('/todolist/:customListName').get((req, res) => {
    const customListName = req.params.customListName;
    List.exists({ name: customListName }).exec().then(result => {
        if (result === null) {
            const list = new List({
                name: customListName,
                customListItems: [temp]
            });
            list.save();
        }
        List.find({ name: customListName }).exec().then(function (result) {
            res.send(result[0]);
        }).catch(err => {
            res.send(err);
        });
    }).catch(err => {
        res.send(err);
    });
}).post((req, res) => {
    let customListName = req.params.customListName;
    let item = new Item({ name: req.body.customListNewItemName });
    List.find({ name: customListName }).exec().then(result => {
        let update = result[0].customListItems;
        update.push(item);
        List.findOneAndUpdate({ name: customListName }, { $set: { customListItems: update } }).exec().then(() => {
            res.send('added');
        }).catch(err => {
            res.send(err);
        })
    }).catch(err => {
        res.send(err);
    });
}).put((req, res) => {

}).patch((req, res) => {

}).delete((req, res) => {
    let customListName = req.params.customListName;
    let itemName = req.body.ItemName;
    List.find({ name: customListName }).exec().then(result => {
        let update = result[0].customListItems;
        update.forEach((element) => {
            if (element.name === itemName) {
                update.remove(element);
            }
        })
        List.findOneAndUpdate({ name: customListName }, { $set: { customListItems: update } }).exec().then(() => {
            res.send('deleted');
        }).catch(err => {
            res.send(err);
        })
    }).catch(err => {
        res.send(err);
    });
});



////////// blog posts

const postSchema = {
    title: {
        type: String,
        required: true
    },
    blogContent: {
        type: String,
        required: true
    }
};

const Post = mongoose.model('Post', postSchema);

app.route('/blogposts').get((req, res) => {
    Post.find({}).exec().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}).post((req, res) => {
    let newPostTitle = req.body.title
    let newPostContent = req.body.Content
    const newPost = new Post({
        title: newPostTitle,
        blogContent: newPostContent
    });
    newPost.save();
    res.send('posted');
}).delete((req, res) => {
    Post.deleteMany({}).exec().then(() => {
        res.send('everything is gone');
    }).catch((err) => {
        res.send(err);
    })
});

app.route('/blogposts/:wantedPostid').get((req, res) => {
    const wantedPostid = req.params.wantedPostid;
    Post.findOne({ _id: wantedPostid }).exec().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}).put((req, res) => {
    const wantedPostid = req.params.wantedPostid;
    const newPostTitle = req.body.title;
    const newPostContent = req.body.blogContent;
    Post.updateOne({ _id: wantedPostid },
        {
            title: newPostTitle,
            blogContent: newPostContent
        },
        {
            overwrite: true
        }).exec().then(() => {
            res.send('updated');
        }).catch((err) => {
            res.send(err);
        });
}).patch((req, res) => {
    const wantedPostid = req.params.wantedPostid;
    Post.updateOne({ _id: wantedPostid }, {
        $set: req.body
    }).exec().then(() => {
        res.send('patched successfully');
    }).catch((err) => {
        res.send(err);
    });
}).delete((req, res) => {
    let wantedPostid = req.params.wantedPostid;
    Post.deleteOne({ _id: wantedPostid }).exec().then(() => {
        res.send('ok');
    }).catch((err) => {
        res.send(err);
    });
});



///////////// Keeper App

const noteSchema = {
    title: String,
    content: String
}

const Note = mongoose.model('Note', noteSchema);

app.route('/notes').get((req, res) => {
    console.log("poe");
    Note.find({}).exec().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
}).post((req, res) => {
    const { title, content } = req.body;
    const newNote = new Note({
        title: title,
        content: content
    });
    newNote.save();
    res.send('ok');
}).delete((req, res) => {
    let noteId = req.body.noteId;
    Note.deleteOne({ _id: noteId }).exec().then(() => {
        res.send('ok');
    }).catch((err) => {
        res.send(err);
    });
});


app.listen(3000, () => {
    console.log('listening on port 3000');
});