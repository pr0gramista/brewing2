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
exports.tempLogger = (req, res) => {
  const auth = req.header('Authorization')
  
  if (auth === 'PASSWORD_HERE') {
    const temp = req.body.temp;
    const cpu_temp = req.body.cpu_temp;
    if (temp === undefined) {
      console.error("Temperature not found for req.body " + JSON.stringify(req.body));
      res.status(400).send("Temperature not found"); 
      return;
    }
    
    db.collection("temp")
      .add({
        temp,
        cpu_temp,
        timestamp: Date.now()
      })
      .then(() => {
        res.sendStatus(200)
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
