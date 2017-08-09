const models = require('./server/db/models');

const { Meme, UserFavorite } = models;

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
    return Promise.all([meme1, meme2]);
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

