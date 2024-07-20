module.exports = {
  env: 'deployed',
  databaseHost: 'forum-db-instance.ccixejdpat1b.us-east-1.rds.amazonaws.com',
  secrets: {
    databaseCredentials: "arn:aws:secretsmanager:us-east-1:575737149124:secret:rds!db-4cdd19b8-52a2-490a-83f8-fa437e1ee598-pUflCa",
  }
};
