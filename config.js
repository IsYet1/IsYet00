var config = {}

config.host = process.env.HOST || "https://isyet.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "bV1ExLh7Pmah4VO5AvlkadtN50nirOeTBoWGgzes4GTQ44ce8Yq0X3NFcOJcJagg6A4qXAhPlV7uReWTwVabFA==";
config.databaseId = "DocDb00";
config.collectionId = "Coll00";

module.exports = config;