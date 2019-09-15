const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.tempGetter = (req, res) => {
  const auth = req.header('Authorization')
  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'GET, POST')
  res.set('Access-Control-Allow-Headers', "*")
  if (req.method == "OPTIONS") {
    res.sendStatus(200)
    return
 }
  
  if (auth === 'PASSWORD_HERE') {
    db.collection("temp")
      .orderBy('timestamp')
      .limit(1440)
      .get()
      .then(snapshot => {
        res.send(snapshot.docs.map(doc => doc.data()));
      })
      .catch((e) => {
        console.error("Something went wrong...");
        console.error(e);
        res.sendStatus(500);
      });
  } else {
  	res.sendStatus(401); 
  }
};
