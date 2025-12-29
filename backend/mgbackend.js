

// DATABASE
const sqlite3 = require("sqlite3").verbose();
const database = new sqlite3.Database("users.db");


function printDatabaseContent() {
  console.log("\nCurrent Users in the SQLite:");
  database.all("SELECT * FROM users", function (err, results) {
    if (err) {
      throw err;
    }
    console.log(results);
  });
}



database.serialize(function () {
  database.run("DROP TABLE IF EXISTS Users");
  database.run("CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");

  var statement = database.prepare("INSERT INTO Users (username, password) VALUES (?, ?)");
  statement.run(["test", "test"]);
  statement.finalize();

});



//REDIS
const redis = require('redis');
const client = redis.createClient();






async function printRedisList() {
  console.log('\nScore List Retrieved: ');
  await getRedisList().then((result) => {
    result.forEach(function (item) {
      console.log(" - " + item);
    });
  })
}




async function getRedisList() {
  try {
    var result = await client.lRange('users', 0, 9)
  } catch (error) {
    console.log('Can not get score List: ' + error);
  } finally {
    return result
  }
}


async function setUpRedisData() {
  try {
    console.log('Adding data to Redis...');

    client.connect().then(() => {
      client.del('users')
      client.lPush('users', 'Homer_Simpson')
      client.lPush('users', 'Mickey_Mouse')
      client.rPush('users', 'Bugs_Bunny')
      client.rPush('users', 'Donald_Duck')
      client.rPush('users', 'Bugs_Bunny')
      client.rPush('users', 'Mr.Bean')
      client.rPush('users', 'Fred_Flintstone')
      client.rPush('users', 'Snoopy')
      client.rPush('users', 'Donald_Duck')
      client.rPush('users', 'Popeye')
      client.rPush('users', 'Popeye')
      client.rPush('users', 'Yogi_ Bear')
    })
  } catch (error) {
    console.log('Can not add items: ' + error);
  } finally {
    //client.quit();
  }
}


setUpRedisData().then(() => {
  printRedisList().then(() => {
      printDatabaseContent();
    })
})




// HTTP
http = require('http');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors({ origin: '*' }));



app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("\nLogging in as: " + username + " with password: " + password);
  database.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], function (err, row) {
    if (err) {
      throw err;
    }
    if (row) {
      console.log("Username and password match found:", row);
      res.json({ status: "success" });
    } else {
      console.log("No matching username and password found for username: " + username + " and password: " + password);
      res.json({ status: "failure" });
    }
  });

});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  console.log("\nCreating User: " + username + " with password: " + password);
  var statement = database.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
  statement.run(username, password, function (err) {
    if (err) {
      console.log("ERROR:", err);
      res.json({ status: "failure" });
    } else {
      console.log("User Added: " + username);
      res.json({ status: "success" });
      printDatabaseContent();
    }
  });
  statement.finalize();
});


app.post("/update",
  function (req, res) {
    const { username, result } = req.body;

    if (result == 'correct') {
      client.lPush('users', username).then(() => {
        getRedisList().then((result) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ leaders: result });
          printRedisList()
        })
      })
    } else {
      getRedisList().then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ leaders: result });

      })
    }
  });


app.get('*', function (req, res) {
  res.json({ 'error': 'route not found' });
});


app.listen(3000, function () {
  console.log("\nMathGame Server listening on port 3000");
});
