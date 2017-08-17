const _ = require('lodash');

const Data = {
     authors: [
        {
            'name': 'William Shakespear',
            'imageUrl':  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/220px-Shakespeare.jpg',
            'titles': ['Henry V', 'Romeo and Juliet ']
        },
        {
            'name': 'Mark Twain',
            'imageUrl':  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Mark_Twain%2C_Brady-Handy_photo_portrait%2C_Feb_7%2C_1871%2C_cropped.jpg/220px-Mark_Twain%2C_Brady-Handy_photo_portrait%2C_Feb_7%2C_1871%2C_cropped.jpg',
            'titles': ['The Adventures of Huckleberry Finn']
        },
        {
            'name': 'J.K. Rowling',
            'imageUrl':  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/J._K._Rowling_2010.jpg/220px-J._K._Rowling_2010.jpg',
            'titles': ['Harry Potter and the Sorcerers Stone']
        }
    ]
};

Data.authors.selectGame = function () {
    let books = _.shuffle(this.reduce(function (p, c, i) {
        return p.concat(c.titles);
    }, [])).slice(0, 4);

    let answer = books[_.random(books.length - 1)];

    return {
        books: books,
        author: _.find(this, function(author) {
            return author.titles.some(function (title) {
                return title === answer;
            });
        })
    };
};

export default Data;
