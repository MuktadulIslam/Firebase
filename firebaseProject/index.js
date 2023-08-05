const express = require("express");
const cors = require("cors");
const { database } = require("firebase-admin");
const app = express();
app.use(express.json());
app.use(cors());

const User = require('./util/user-database');

app.post('/register', async (req, res) => {
  const userInfo = req.body;
  const email = req.body.email;

  if (!(await User.doc(email).get()).data()) {
    await User.doc(email).set(userInfo)
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id);
        res.send({ message: 'success' });
      })
      .catch(error => {
        console.error('Error adding document: ', error);
        res.send({ message: 'error' });
      });
  }
  else {
    res.send({ message: 'duplicate email' });
  }
})

app.post('/getinfo', async (req, res) => {
  const email = req.body.email;
  // console.log(email);

  const data = await User.doc(email).get()
    .catch(error => {
      console.error('Error adding document: ', error);
      res.send({ message: 'error' });
    });

  if (data) {
    res.send(data.data());
  }
})

app.post('/delete', async (req, res) => {
  const email = req.body.email;

  await User.doc(email).delete()
    .then(() => {
      res.send({ message: 'success' });
    })
    .catch(error => {
      console.error('Error adding document: ', error);
      res.send({ message: 'error' });
    });
})


app.post('/alldata', async (req, res) => {

  const responsedata = await User.get()
    .catch(error => {
      console.error('Error adding document: ', error);
      res.send({ message: 'error' });
    });

  if (responsedata) {
    let dataArray = [];
    responsedata.forEach(doc => {
      dataArray.push(doc.data());
    })

    res.send(dataArray);
  }
})





app.listen(3001, () => {
  console.log("Running backend server on port 3001");
});