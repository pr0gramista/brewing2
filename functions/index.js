const admin = require("firebase-admin");
const functions = require("firebase-functions");

console.log('functions.config().firebase', functions.config());
const app = admin.initializeApp({
  ...functions.config(),
  databaseURL: 'https://brewing2.firebaseio.com'
});

const db = admin.database(app);

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
    
    db.ref('/readings/' + Date.now()).set({
      temp,
      cpu_temp
    }, (error) => {
      if (error) {
        console.error("Something went wrong...");
        console.error(e);
        res.sendStatus(500);
      } else {
        res.sendStatus(200)
      }
    })
  } else {
  	res.sendStatus(401); 
  }
};
