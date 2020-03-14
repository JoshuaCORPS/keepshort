const Url = require('./../models/urlModel');

const searchRenderUrl = async (req, res) => {
  const url = await Url.findOne({ short: req.params.id });

  if (!url) {
    return res.status(404).render('notfound', {
      title: '404',
      msg: 'URL NOT FOUND'
    });
  }

  return url;
};

exports.getHome = (req, res) => {
  res.status(200).render('index', {
    title: 'Url Shortener'
  });
};

exports.getUrl = async (req, res) => {
  try {
    const url = await searchRenderUrl(req, res);

    url.clicks++;
    await url.save();

    res.redirect(url.full);
  } catch (err) {
    console.log(err.message);
  }
};

exports.getResult = async (req, res) => {
  try {
    const url = await searchRenderUrl(req, res);

    const webUrl = `${req.protocol}://${req.get('host')}/${url.short}`;
    return res.status(200).render('result', {
      title: 'Result',
      url,
      webUrl
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getTotal = async (req, res) => {
  try {
    const url = await searchRenderUrl(req, res);

    return res.status(200).render('total', {
      title: 'Total Clicks',
      url
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.createUrl = async (req, res) => {
  try {
    const createdUrl = await Url.create({
      full: req.body.full,
      short: req.body.short
    });

    return res.status(201).json({
      status: 'Success',
      data: {
        url: createdUrl
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.deleteUrl = async (req, res) => {
  try {
    const url = await Url.findOneAndDelete({ short: req.params.id });

    if (!url) {
      return res.status(404).render('notfound', {
        title: '404',
        msg: 'URL NOT FOUND'
      });
    }

    return res.status(204).json({
      status: 'Success',
      data: null
    });
  } catch (err) {
    console.log(err.stack);
  }
};
