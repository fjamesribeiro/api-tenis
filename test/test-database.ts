const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://jamesribeiro:mongodb@tenis.1zkjn44.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const collection = client.db('test').collection('devices');
  console.log(collection);
  client.close();
});
