const models = require('./server/db/models');

const { Meme, UserFavorite, Category, WinningAnswer } = models;

const db = require('./server/db/db');

db.sync({ force: true })
  .then(() => {
    const meme1 = Meme.create({
      image: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
      text: 'One does not simply'
    });
    const meme2 = Meme.create({
      image: 'https://imgflip.com/s/meme/Futurama-Fry.jpg',
      text: 'Not sure if'
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
    return Promise.all([meme1, meme2, category1, category2, category3, category4]);
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

    const winningAnswer1 = WinningAnswer.create({
      text: 'write the front-end in one go',
      memeId: 1,
    });

    const winningAnswer2 = WinningAnswer.create({
      text: 'this is just a joke, or if Charles really is leaving us for Bunker Labs',
      memeId: 2,
    });
    return Promise.all([favorite1, favorite2, winningAnswer1, winningAnswer2]);
  })
  .then(() => {
    console.log('finished seeding');
    db.close();
  })
  .catch();

