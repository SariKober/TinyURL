const Link = require('../models/link');

exports.createLink = async (req, res) => {
  const { originalUrl, targetParamName, targetValues } = req.body;
  const newLink = new Link({ originalUrl, targetParamName, targetValues });
  await newLink.save();
  res.status(201).json(newLink);
};

exports.getLinks = async (req, res) => {
  const links = await Link.find();
  res.status(200).json(links);
};

exports.getLink = async (req, res) => {
  const link = await Link.findById(req.params.id);
  if (!link) return res.status(404).json({ message: 'Link not found' });
  res.status(200).json(link);
};

exports.updateLink = async (req, res) => {
  const { originalUrl, targetParamName, targetValues } = req.body;
  const link = await Link.findByIdAndUpdate(req.params.id, { originalUrl, targetParamName, targetValues }, { new: true });
  if (!link) return res.status(404).json({ message: 'Link not found' });
  res.status(200).json(link);
};

exports.deleteLink = async (req, res) => {
  const link = await Link.findByIdAndDelete(req.params.id);
  if (!link) return res.status(404).json({ message: 'Link not found' });
  res.status(204).send();
};

exports.redirectLink = async (req, res) => {
  const link = await Link.findById(req.params.id);
  if (!link) return res.status(404).json({ message: 'Link not found' });

  // עדכון מספר הקליקים
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const targetParamValue = req.query[link.targetParamName] || '';
  link.clicks.push({ ipAddress, targetParamValue });
  await link.save();

  res.redirect(link.originalUrl);
};

exports.getLinkStats = async (req, res) => {
  const link = await Link.findById(req.params.id);
  if (!link) return res.status(404).json({ message: 'Link not found' });

  const stats = link.clicks.reduce((acc, click) => {
    if (click.targetParamValue) {
      if (!acc[click.targetParamValue]) acc[click.targetParamValue] = 0;
      acc[click.targetParamValue]++;
    } else {
      if (!acc['unknown']) acc['unknown'] = 0;
      acc['unknown']++;
    }
    return acc;
  }, {});

  res.status(200).json(stats);
};
