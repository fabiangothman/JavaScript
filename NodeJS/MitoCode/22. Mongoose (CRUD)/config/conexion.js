let mongoose = require('mongoose');

//Localmente
mongoose.connect('mongodb://localhost:27017/TutorialesNodeJS_MitoCode', { useMongoClient: true });

//En la nube (Mlab)     //MyPW: 4lVL9QhIGI2kqVME
//mongoose.connect('mongodb+srv://fabiangothman:4lVL9QhIGI2kqVME@fabicluster1.lym44.mongodb.net/fabi_app_database>?retryWrites=true&w=majority', {useMongoClient:true});

module.exports = mongoose;