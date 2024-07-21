module.exports = {
  env: 'deployed',
  databaseHost: 'forum-db-instance.ccixejdpat1b.us-east-1.rds.amazonaws.com',
  secrets: {
    databaseCredentials: "arn:aws:secretsmanager:us-east-1:575737149124:secret:rds!db-6035f1d0-ab4e-4f9b-b7b6-1edcd9d96a8a-DW4W51",
  }
};
