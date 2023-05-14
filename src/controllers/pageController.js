export const renderHome = async (req, res) => {
  return res.render('home', { pageTitle: 'Home' });
};

export const renderChart = async (req, res) => {
  return res.render('chart', { pageTitle: 'Chart' });
};
