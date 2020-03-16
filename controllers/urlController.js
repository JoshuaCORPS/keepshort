const Url = require('./../models/urlModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');

const searchRenderUrl = async (title, page, req, res, next) => {
  const url = await Url.findOne({ short: req.params.id });

  if (!url) {
    return next(new AppError('URL NOT FOUND', 404));
  }

  const webUrl = `${req.protocol}://${req.get('host')}/${url.short}`;
  return res.status(200).render(`${page}`, {
    title: `${title}`,
    url,
    webUrl
  });
};

exports.getHome = (req, res) => {
  res.status(200).render('index', {
    title: 'Url Shortener'
  });
};

exports.getUrl = catchAsync(async (req, res, next) => {
  const url = await Url.findOne({ short: req.params.id });

  if (!url) {
    return next(new AppError('URL NOT FOUND', 404));
  }

  url.clicks++;
  await url.save();

  res.redirect(url.full);
});

exports.getResult = catchAsync(async (req, res, next) => {
  await searchRenderUrl('Result', 'result', req, res, next);
});

exports.getTotal = catchAsync(async (req, res, next) => {
  await searchRenderUrl('Total Clicks', 'total', req, res, next);
});

exports.createUrl = catchAsync(async (req, res, next) => {
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
});

exports.deleteUrl = catchAsync(async (req, res, next) => {
  const url = await Url.findOneAndDelete({ short: req.params.id });

  if (!url) {
    return next(new AppError('URL NOT FOUND', 404));
  }

  return res.status(204).json({
    status: 'Success',
    data: null
  });
});
