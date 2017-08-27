const models = require('./server/db/models');

const { Meme, UserFavorite, Category, WinningAnswer } = models;

const db = require('./server/db/db');

db.sync({ force: true })
  .then(() => {
    const meme1 = Meme.create({
      image: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
      topText: 'One does not simply ',
      bottomText: '',
      title: 'One does not simply',
    });
    const meme2 = Meme.create({
      image: 'https://imgflip.com/s/meme/Futurama-Fry.jpg',
      topText: 'Not sure if ',
      bottomText: 'Or',
      title: 'Not sure if',
    });
    const meme3 = Meme.create({
      image: 'https://i.imgflip.com/12eyxp.jpg',
      topText: '',
      bottomText: '',
      title: 'Overly Attached Girlfriend'
    });
    const meme4 = Meme.create({
      image: 'https://imgflip.com/s/meme/Success-Kid.jpg',
      topText: '',
      bottomText: '',
      title: 'Success Baby',
    });
    const meme5 = Meme.create({
      image: 'http://i.imgur.com/O0o6htv.png',
      topText: 'You can\'t ',
      bottomText: 'If you don\'t ',
      title: 'You can\'t if you don\'t',
    });
    const meme6 = Meme.create({
      image: 'http://i.imgur.com/w3GCjM7.png',
      topText: '',
      bottomText: '',
      title: 'X, X, Everywhere'
    });
    const meme7 = Meme.create({
      image: 'http://i.imgur.com/p4F4vgh.png',
      topText: '',
      bottomText: '',
      title: 'Leonardo Dicaprio Cheers',
    });
    const meme8 = Meme.create({
      image: 'http://i.imgur.com/ktHMJaR.png',
      topText: '',
      bottomText: '',
      title: 'First World Problems',

    });
    const meme9 = Meme.create({
      image: 'http://i.imgur.com/woOG4Z5.png',
      topText: '',
      bottomText: 'Y U No',
      title: 'Y U No'
    });

    const meme10 = Meme.create({
      image: 'http://i.imgur.com/DbmjKV3.png',
      topText: 'What if I told you',
      bottomText: '',
      title: 'Matrix Morpheus'
    });
    const meme11 = Meme.create({
      image: 'http://i.imgur.com/7rr6IX6.png',
      topText: '',
      bottomText: 'aaaand it\'s gone',
      title: 'aaaand it\'s gone',
    });
    const meme12 = Meme.create({
      image: 'http://i.imgur.com/MMGf1J2.png',
      topText: '',
      bottomText: '',
      title: 'Disaster Girl',
    });
    const meme13 = Meme.create({
      image: 'http://i.imgur.com/QON8w32.png',
      topText: '',
      bottomText: 'Don\'t you Squidward',
      title: 'Don\'t you Squidward'
    });
    const category1 = Category.create({
      text: 'Rough mornings',
    })
    const category2 = Category.create({
      text: 'Rolling with the squad',
    })
    const category3 = Category.create({
      text: 'Things Grandma says',
    })
    const category4 = Category.create({
      text: 'First date',
    })
    const category5 = Category.create({
      text: 'It\'s not a bug, it\'s a feature',
    })
    const category6 = Category.create({
      text: 'Pet Peeves',
    })
    const category7 = Category.create({
      text: 'Exam Week',
    })

    return Promise.all([meme1, meme2, meme3, meme4, meme5, meme6, meme7, meme8, meme9, meme10, meme11, meme12, meme13, category1, category2, category3, category4]);
  })
  .then(() => {
    const favorite1 = UserFavorite.create({
      name: 'notBrian',
      text: 'show up on time for reacto',
      memeId: 1,
    });

    const favorite2 = UserFavorite.create({
      name: 'my every day',
      text: 'fixed the bug, or just created another that hides it',
      memeId: 2,
    });

    return Promise.all([favorite1, favorite2]);
  })
  .then(() => {
    console.log('finished seeding');
    db.close();
  })
  .catch();

