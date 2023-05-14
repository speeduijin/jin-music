import Song from '../models/Song';

export const renderHome = async (req, res) => {
  return res.render('home', { pageTitle: 'Home' });
};

export const renderChart = async (req, res, next) => {
  try {
    const songs = await Song.findAll({
      order: [['playCount', 'DESC']],
    });
    return res.render('chart', { pageTitle: 'Chart', songs: songs });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
