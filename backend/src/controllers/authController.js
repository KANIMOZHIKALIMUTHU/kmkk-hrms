const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Organisation, User, Log } = require('../models');

exports.register = async (req, res) => {
  const { orgName, adminName, email, password } = req.body;
  try {
    const org = await Organisation.create({ name: orgName });
    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      organisation_id: org.id,
      email,
      password_hash,
      name: adminName
    });
    const token = jwt.sign({ userId: user.id, orgId: org.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    await Log.create({ organisation_id: org.id, user_id: user.id, action: 'organisation_created', meta: { orgName } });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if(!user) return res.status(401).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password_hash);
    if(!match) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ userId: user.id, orgId: user.organisation_id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    await Log.create({ organisation_id: user.organisation_id, user_id: user.id, action: 'user_logged_in' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
