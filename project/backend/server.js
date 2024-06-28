// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const http = require('http');
// const WebSocket = require('ws');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "mydb"
// });

// const port = 8081;
// const server = http.createServer(app);
// // const wss = new WebSocket.Server({ server });
// const adminWss = new WebSocket.Server({ noServer: true });
// const userWss = new WebSocket.Server({ noServer: true });

// server.listen(port, () => {
//     console.log("listening on port", port);
// });

// let notifications = [];
// let unreadNotifications = 0;



// function notifyClients(data) {
//   notifications.push(data);
//   unreadNotifications++;

//   wss.clients.forEach(client => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify({
//         ...data,
//         unreadCount: unreadNotifications
//       }));
//     }
//   });
// }


// app.get('/notifications', (req, res) => {
//   res.json({ notifications: notifications, unreadCount: unreadNotifications });
//   unreadNotifications = 0;
// });


// app.post('/notify', (req, res) => {
//   const { notification } = req.body;
//   notifyClients(notification);
//   res.status(200).send('Notification sent');
// });


// app.post('/reset-notifications', (req, res) => {
//   unreadNotifications = 0;
//   res.status(200).send('Notifications reset');
// });


// let notificationv2 = [];
// let unreadNotificationsv2 = 0;


// function notifyClientsv2(data){
//   notificationv2.push(data);
//   unreadNotificationsv2++;

//   wss.clients.forEach(client => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify({
//         ...data,
//         unreadCountv2: unreadNotificationsv2
//       }));
//     }
//   });
// }

// app.post('/notifyv2',(req,res)=>{

//   const {notificationv2} = req.body;
//   notifyClientsv2(notificationv2);
//   res.status(200).send('Notification sent');
// })

// app.post('/reset-notificationsv2',(req,res) =>{
//   unreadNotificationsv2 = 0;
//   res.status(200).send('Notifications reset');
// })

// app.get('/notificationsv2',(req,res) =>{
//   res.json({notificationv2:notificationv2,unreadCountv2:unreadNotificationsv2})
//   unreadNotificationsv2 = 0;
// })






// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const http = require('http');
// const WebSocket = require('ws');
// const nodemailer = require('nodemailer'); // Add nodemailer
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('internshiptanaphat');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "mydb"
// });

// const port = 8081;
// const server = http.createServer(app);
// const adminWss = new WebSocket.Server({ noServer: true });
// const userWss = new WebSocket.Server({ noServer: true });



// server.on('upgrade', (request, socket, head) => {
//     const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
//     if (pathname === '/admin') {
//         adminWss.handleUpgrade(request, socket, head, ws => {
//             adminWss.emit('connection', ws, request);
//         });
//     } else if (pathname === '/user') {
//         userWss.handleUpgrade(request, socket, head, ws => {
//             userWss.emit('connection', ws, request);
//         });
//     } else {
//         socket.destroy();
//     }
// });

// server.listen(port, () => {
//     console.log("listening on port", port);
// });

// let notifications = [];
// let unreadNotifications = 0;







// // Configure nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // or your email service
//   auth: {
//       user: 'estolinzy50@gmail.com',
//       pass: 'lossblack74'
//   }
// });

// // Function to send email notifications
// function sendEmailNotification(email, subject, text) {
//   const mailOptions = {
//       from: 'estolinzy50@gmail.com',
//       to: email,
//       subject: subject,
//       text: text
//   };
//   console.log(`Sending email to: ${email}, subject: ${subject}, text: ${text}`);
//   transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//           console.log(error);
//       } else {
//           console.log('Email sent: ' + info.response);
//       }
//   });
// }


// app.post('/notifyDeviceOwners', (req, res) => {

//   const sql = `
//       SELECT r.email, ud.device_id, s.due_date
//       FROM register r
//       JOIN user_devices ud ON r.id = ud.user_id
//       JOIN schedules s ON ud.device_id = s.device_id
//   `;

//   db.query(sql, (err, results) => {
//       if (err) {
//           console.error('Database error:', err);
//           return res.status(500).json({ error: 'Database error' });
//       }

//       results.forEach(row => {
//           const email = row.email;
//           const subject = `Upcoming Schedule for Your Device: ${row.device_id}`;
//           const text = `Dear User,\n\nYou have an upcoming schedule for your device (ID: ${row.device_id}) on ${row.due_date}.\n\nBest regards,\nYour Company`;

//           sendEmailNotification(email, subject, text);
//       });

//       res.status(200).json({ message: 'Notifications sent successfully' });
//   });
// });














// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const http = require('http');
// const WebSocket = require('ws');
// const nodemailer = require('nodemailer');
// const line = require('@line/bot-sdk'); // Add LINE SDK

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "mydb"
// });

// // const port = 8081;
// const port = process.env.PORT || 8081;
// const server = http.createServer(app);
// const adminWss = new WebSocket.Server({ noServer: true });
// const userWss = new WebSocket.Server({ noServer: true });

// server.on('upgrade', (request, socket, head) => {
//     const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
//     if (pathname === '/admin') {
//         adminWss.handleUpgrade(request, socket, head, ws => {
//             adminWss.emit('connection', ws, request);
//         });
//     } else if (pathname === '/user') {
//         userWss.handleUpgrade(request, socket, head, ws => {
//             userWss.emit('connection', ws, request);
//         });
//     } else {
//         socket.destroy();
//     }
// });

// server.listen(port, () => {
//     console.log("listening on port", port);
// });

// let notifications = [];
// let unreadNotifications = 0;





















require('dotenv').config(); // Load .env file
const express = require("express");
// const mysql = require("mysql");
const mysql = require("mysql2");
const cors = require("cors");
const http = require('http');
const WebSocket = require('ws');
const nodemailer = require('nodemailer');
const line = require('@line/bot-sdk'); // Add LINE SDK



const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://senddvice123.000webhostapp.com','https://internshiptanaphatt-production.up.railway.app','https://roundhouse.proxy.rlwy.net'],
  optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"

};

app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins, or specify your frontend URL
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});







// const db = mysql.createConnection({
    
//   host: "localhost",
//     user: "root",
//     password: "",
//     database: "mydb"
// });

const db = mysql.createConnection({
  host: "roundhouse.proxy.rlwy.net", // ใช้ host จาก Railway
  user: "root", // ใช้ user จาก Railway
  password: "DPXeeMGqiiVfpQaggUyFxObQxPfnHexx", // ใช้ password จาก Railway
  database: "railway", // ใช้ database name จาก Railway
  port: 11893 // ใช้ port จาก Railway
});


db.connect(err => {
  if (err) {
      console.error('Error connecting to the database:', err);
      return;
  }
  console.log('Connected to the database.');
});


const queryPromise = (sql, params) => {
  return new Promise((resolve, reject) => {
      db.query(sql, params, (error, results) => {
          if (error) {
              return reject(error);
          }
          resolve(results);
      });
  });
};

// const port = 8081;
const port = process.env.PORT ||8080;

const server = http.createServer(app);
const adminWss = new WebSocket.Server({ noServer: true });
const userWss = new WebSocket.Server({ noServer: true });

server.on('upgrade', (request, socket, head) => {
    const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
    if (pathname === '/admin') {
        adminWss.handleUpgrade(request, socket, head, ws => {
            adminWss.emit('connection', ws, request);
        });
    } else if (pathname === '/user') {
        userWss.handleUpgrade(request, socket, head, ws => {
            userWss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

app.listen(port, () => {
    // console.log("listening on port", port);
    console.log(`Server running on port ${port}`);
});

let notifications = [];
let unreadNotifications = 0;





// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'estolinzy50@gmail.com',
        pass: 'aodl hgmr cajc rpir'
    }
});


// LINE SDK Configuration
const lineConfig = {
  channelAccessToken: 'FzS6vo+cb5YXsOvYaqtZcIfQaWwrhOSkJo6UVncxhRoB8fRsGeBDgqo1UANQZBVXOk4phBQBGo1/FjH4r7ZtNw1OZUAvS7biaDrtP+zjr1E0b1QUxUDv4ubylGTg3yzeezhU6Ky7L9XEGHUfNjxO8AdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'd8c8da19dd6fbff60807c36b22c34a5c'
};

const client = new line.Client(lineConfig);


// Function to send email notifications
function sendEmailNotification(email, subject, text) {
    const mailOptions = {
        from: 'estolinzy50@email.com',
        to: email,
        subject: subject,
        text: text
    };
    console.log(`Sending email to: ${email}, subject: ${subject}, text: ${text}`);
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



// Function to send LINE notifications to a group 24/6/67
function sendLineGroupNotification(groupId, message) {
  const payload = {
      to: groupId,
      messages: [
          {
              type: 'text',
              text: message
          }
      ]
  };
  client.pushMessage(payload)
      .then(() => {
          console.log('LINE group message sent successfully');
      })
      .catch((err) => {
          console.error('Error sending LINE group message:', err);
      });
}



app.post('/notifyDeviceOwners', (req, res) => {
  console.log('notifyDeviceOwners endpoint hit');
  const sql = `
      SELECT r.email, ud.device_id, s.due_date
      FROM register r
      JOIN user_devices ud ON r.id = ud.user_id
      JOIN schedules s ON ud.device_id = s.device_id
  `;

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
      }

      console.log('Database query results:', results);

      const link =  'https://senddvice123.000webhostapp.com'; // แทนที่ด้วย URL ของคุณ

    
      results.forEach(row => {
        const email = row.email;
        const lineGroupId = row.line_group_id;
        const subject = `Upcoming Schedule for Your Device: ${row.device_id}`;
        const text = `Dear User,\n\nYou have an upcoming schedule for your device (ID: ${row.device_id}) on ${row.due_date}.\n\nPlease visit the following link for more details: ${link}\n\nBest regards,\nYour Company`;

        sendEmailNotification(email, subject, text);
          if (lineGroupId) {
            const lineMessage = `You have an upcoming schedule for your device (ID: ${row.device_id}) on ${row.due_date}.`;
            console.log(`Sending LINE notification to group ${lineGroupId}`);
            sendLineGroupNotification(lineGroupId, lineMessage);
        }
      });

      res.status(200).json({ message: 'Notifications sent successfully' });
  });
});














function notifyClients(data) {
    notifications.push(data);
    unreadNotifications++;
    adminWss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                ...data,
                unreadCount: unreadNotifications
            }));
        }
    });
}

let notificationsv2 = [];
let unreadNotificationsv2 = 0;

function notifyClientsv2(data) {
    notificationsv2.push(data);
    unreadNotificationsv2++;
    userWss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                ...data,
                unreadCountv2: unreadNotificationsv2
            }));
        }
    });
}

// Existing routes...

app.get('/notifications', (req, res) => {
    res.json({ notifications: notifications, unreadCount: unreadNotifications });
});

app.post('/notify', (req, res) => {
    const { notification } = req.body;
    notifyAdminClients(notification);
    res.status(200).send('Notification sent');
});

app.post('/reset-notifications', (req, res) => {
    unreadNotifications = 0;
    res.status(200).send('Notifications reset');
});

app.get('/notificationsv2', (req, res) => {
    res.json({ notificationsv2: notificationsv2, unreadCountv2: unreadNotificationsv2 });
});

app.post('/notifyv2', (req, res) => {
    const { notificationv2 } = req.body;
    notifyUserClients(notificationv2);
    res.status(200).send('Notification sent');
});

app.post('/reset-notificationsv2', (req, res) => {
    unreadNotificationsv2 = 0;
    res.status(200).send('Notifications reset');
});









app.post('/register', (req, res) => {
    const checkEmailSql = "SELECT * FROM register WHERE email = ?";
    const insertUserSql = "INSERT INTO register (name, surname, email, password, urole, department) VALUES (?)";
    const values = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.password,
        'users',
        'บค.'
    ];

    db.query(checkEmailSql, [req.body.email], (err, results) => {
        if (err) {
            return res.json({ error: "Database error" });
        }
        if (results.length > 0) {
            return res.json({ error: "Email already exists" });
        } else {
            db.query(insertUserSql, [values], (err, data) => {
                if (err) {
                    return res.json({ error: "Error inserting data" });
                }
                return res.json({ success: "User registered successfully" });
            });
        }
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT id,urole, name FROM register WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            const role = data[0].urole;
            const name = data[0].name;
            const userid = data[0].id; // ดึง userId จากผลลัพธ์
            res.json({ message: "Success", role: role, name: name, email: req.body.email, userid: userid  });
        } else {
            res.json("fail");
        }
    });
});


app.get('/api/register/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT * FROM register WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send('Server error');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }

    res.json(results[0]); // ส่งข้อมูลผู้ใช้กลับมา รวมถึง id
  });
});

app.get('/getAssignments', (req, res) => {
    const sql = "SELECT * FROM accepttable";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
});


app.put('/updateAssignmentRemark/:id', (req, res) => {
    const { id } = req.params;
    const { remark, status } = req.body;
    const getNameSql = "SELECT name FROM assignments WHERE id = ?";

    db.query(getNameSql, [id], (err, rows) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ error: "Database error" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        const name = rows[0].name;
        const updateSql = "UPDATE assignments SET remark = ?, assignment = ? WHERE id = ?";

        db.query(updateSql, [remark, status, id], (err, result) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).json({ error: "Database error" });
            }
            res.status(200).json({ success: "Remark and status updated successfully" });

            // Notify WebSocket clients
            const updatedAssignment = {
                type: 'remark', // Ensure this matches the client's check
                remark: { id, name, remark, assignment: status }
            };
            notifyClients(updatedAssignment);
        });
    });
});



  // app.post('/submitForApproval', (req, res) => {
  //   const { device, brand, model, serial, assignment, left, right, Testreport, remark, name } = req.body;
  //   const sql = 'INSERT INTO pending_approvals (device, brand, model, serial, status, `left`, `right`, Testreport, remark, user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  //   db.query(sql, [device, brand, model, serial, assignment, left, right, Testreport, remark, name], (err, result) => {
  //     if (err) {
  //       console.error('Error inserting data:', err);
  //       return res.status(500).json({ error: 'Database error' });
  //     }
  //     res.status(200).json({ success: 'Submitted for approval successfully' });
  //   });
  // });



app.get('/getPendingApprovals', (req, res) => {
    const sql = 'SELECT * FROM pendingapprovals';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});







app.get('/getRecycleBinData', (req, res) => {
    // const sqlSelect = 'SELECT * FROM Recyclebin';
    const sqlSelect = 'SELECT * FROM devices_in_repair'
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.error('Error fetching recycle bin data:', err);
            res.status(500).send('Failed to fetch recycle bin data');
        } else {
            res.send(result);
        }
    });
});




//เพิ่มมาวันที่ 31/5/67
app.get('/getDeviceSchedules/:deviceId', (req, res) => {
    const { deviceId } = req.params;
    const {sticker} = req.params;
    const sql = 'SELECT * FROM schedules WHERE device_id = ?';
    
    db.query(sql, [deviceId], (err, results) => {
        if (err) {
            console.error('Error fetching device schedules:', err);
            return res.status(500).json({ error: 'Failed to fetch device schedules' });
        }
        res.status(200).json(results);
    });
});


// app.post('/submitUserSubmission', (req, res) => {
//   const { userId, name, deviceId, scheduleId, brand, model, serial, status, leftSide, rightSide, testReport, note, sticker,durable} = req.body;

//   console.log('Received sticker value:', sticker);

//   // ตรวจสอบค่าของ sticker ก่อนทำการแทรกข้อมูล
//   if (typeof sticker !== 'string' || sticker.length > 255) { // ปรับตามข้อจำกัดของคอลัมน์ sticker ในฐานข้อมูล
//     return res.status(400).json({ error: 'Invalid sticker value' });
//   }

//   const sql = `
//     INSERT INTO submissions (user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable)
//     SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), d.name, s.round, ?, ?
//     FROM devices d
//     JOIN schedules s ON d.id = s.device_id
//     WHERE d.id = ? AND s.id = ?
// `;

// const values = [userId, name, deviceId, scheduleId, brand, model, serial, status, leftSide, rightSide, testReport, note, sticker, durable, deviceId, scheduleId];

// db.query(sql, values, (err, result) => {
//     if (err) {
//         console.error('Error saving submission:', err);
//         return res.status(500).json({ error: 'Failed to save submission' });
//     }

//     const submissionId = result.insertId;
//     console.log('Inserted submission with ID:', submissionId);

//     const insertUserSubmissionSql = 'INSERT INTO submissionstatus (user_id, submission_id) VALUES (?, ?)';
//     db.query(insertUserSubmissionSql, [userId, submissionId], (err, result) => {
//         if (err) {
//             console.error('Error saving user submission:', err);
//             return res.status(500).json({ error: 'Failed to save user submission' });
//         }

//         console.log('Inserted into submissionstatus with submission_id:', submissionId);

//         const insertPendingApprovalSql = `
//             INSERT INTO pendingapprovals (submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable)
//             SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), d.name, s.round, ?, ?
//             FROM devices d
//             JOIN schedules s ON d.id = s.device_id
//             WHERE d.id = ? AND s.id = ?
//         `;

//         const pendingApprovalValues = [submissionId, userId, name, deviceId, scheduleId, brand, model, serial, status, leftSide, rightSide, testReport, note, sticker, durable, deviceId, scheduleId];

//         db.query(insertPendingApprovalSql, pendingApprovalValues, (err, result) => {
//             if (err) {
//                 console.error('Error saving pending approval:', err);
//                 return res.status(500).json({ error: 'Failed to save pending approval' });
//             }

//             res.status(200).json({ success: 'Submission and pending approval saved successfully' });
//         });
//     });
// });

// });


// app.post('/submitUserSubmission', (req, res) => {
//   const { userId, name, deviceId, scheduleId, brand, model, serial, status, leftSide, rightSide, testReport, note, sticker, durable } = req.body;
  
//   // ตรวจสอบค่าของ sticker ก่อนทำการแทรกข้อมูล
//   if (typeof sticker !== 'string' || sticker.length > 255) { // ปรับตามข้อจำกัดของคอลัมน์ sticker ในฐานข้อมูล
//   return res.status(400).json({ error: 'Invalid sticker value' });
//   }
  
//   // SQL to check for existing pending submission
//   const checkSql = ` SELECT * FROM pendingapprovals WHERE device_id = ? AND serial = ? AND sticker = ? AND schedule_id = ? UNION SELECT * FROM accepttable WHERE device_id = ? AND serial = ? AND sticker = ? AND schedule_id = ? `;
  
//   const checkValues = [deviceId, serial, sticker, scheduleId, deviceId, serial, sticker, scheduleId];
  
//   db.query(checkSql, checkValues, (checkErr, checkResults) => {
//   if (checkErr) {
//   console.error('Error checking existing submissions:', checkErr);
//   return res.status(500).json({ error: 'Database error' });
//   }
//   if (checkResults.length > 0) {
//     // Existing submission found, block the new submission
//     return res.status(400).json({ error: 'A submission with the same device, serial, sticker, and schedule ID is already pending approval.' });
// } else {
//     // No existing submission, proceed with the new submission
//     const sql = `
//         INSERT INTO submissions (user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable)
//         SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), d.name, s.round, ?, ?
//         FROM devices d
//         JOIN schedules s ON d.id = s.device_id
//         WHERE d.id = ? AND s.id = ?
//     `;

//     const values = [userId, name, deviceId, scheduleId, brand, model, serial, status, leftSide, rightSide, testReport, note, sticker, durable, deviceId, scheduleId];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error saving submission:', err);
//             return res.status(500).json({ error: 'Failed to save submission' });
//         }

//         const submissionId = result.insertId;
//         console.log('Inserted submission with ID:', submissionId);

//         const insertUserSubmissionSql = 'INSERT INTO submissionstatus (user_id, submission_id) VALUES (?, ?)';
//         db.query(insertUserSubmissionSql, [userId, submissionId], (err, result) => {
//             if (err) {
//                 console.error('Error saving user submission:', err);
//                 return res.status(500).json({ error: 'Failed to save user submission' });
//             }

//             console.log('Inserted into submissionstatus with submission_id:', submissionId);

//             const insertPendingApprovalSql = `
//                 INSERT INTO pendingapprovals (submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable)
//                 SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), d.name, s.round, ?, ?
//                 FROM devices d
//                 JOIN schedules s ON d.id = s.device_id
//                 WHERE d.id = ? AND s.id = ?
//             `;

//             const pendingApprovalValues = [submissionId, userId, name, deviceId, scheduleId, brand, model, serial, status, leftSide, rightSide, testReport, note, sticker, durable, deviceId, scheduleId];

//             db.query(insertPendingApprovalSql, pendingApprovalValues, (err, result) => {
//                 if (err) {
//                     console.error('Error saving pending approval:', err);
//                     return res.status(500).json({ error: 'Failed to save pending approval' });
//                 }

//                 // ส่งการแจ้งเตือนไปยัง WebSocket Server
//       const newSubmission = {
//         assignment: {
//             submissionId,
//             userId,
//             name,
//             deviceId,
//             scheduleId,
//             brand,
//             model,
//             serial,
//             status,
//             leftSide,
//             rightSide,
//             testReport,
//             note,
//             submissionDate: new Date().toISOString(),
//             deviceName: deviceName,
//             round: round,
//             sticker,
//             durable
//         }
//     };

//     notifyClients(newSubmission);
                

//                 res.status(200).json({ success: 'Submission and pending approval saved successfully' });
//             });
//         });
//     });
// }

// });
// });



// app.post('/submitUserSubmission', (req, res) => {
//   const {
//     userId, name, deviceId, scheduleId, brand, model, serial, status,
//     leftSide, rightSide, testReport, note, sticker, durable
//   } = req.body;

//   // Validate sticker
//   if (typeof sticker !== 'string' || sticker.length > 255) {
//     return res.status(400).json({ error: 'Invalid sticker value' });
//   }

//   // SQL to check for existing pending submission
//   const checkSql = `
//     SELECT * FROM pendingapprovals 
//     WHERE device_id = ? AND serial = ? AND sticker = ? AND schedule_id = ?
//     UNION
//     SELECT * FROM accepttable
//     WHERE device_id = ? AND serial = ? AND sticker = ? AND schedule_id = ?
//   `;

//   const checkValues = [deviceId, serial, sticker, scheduleId, deviceId, serial, sticker, scheduleId];

//   db.query(checkSql, checkValues, (checkErr, checkResults) => {
//     if (checkErr) {
//       console.error('Error checking existing submissions:', checkErr);
//       return res.status(500).json({ error: 'Database error' });
//     }

//     if (checkResults.length > 0) {
//       // Existing submission found, block the new submission
//       return res.status(400).json({ error: 'A submission with the same device, serial, sticker, and schedule ID is already pending approval.' });
//     } else {
//       // No existing submission, proceed with the new submission
//       const sql = `
//         INSERT INTO submissions (
//           user_id, name, device_id, schedule_id, brand, model, serial, status,
//           left_side, right_side, test_report, note, submission_date, device_name,
//           round, sticker, durable
//         )
//         SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), d.name, s.round, ?, ?
//         FROM devices d
//         JOIN schedules s ON d.id = s.device_id
//         WHERE d.id = ? AND s.id = ?
//       `;

//       const values = [userId, name, deviceId, scheduleId, brand, model, serial, status,
//         leftSide, rightSide, testReport, note, sticker, durable, deviceId, scheduleId];

//       db.query(sql, values, (err, result) => {
//         if (err) {
//           console.error('Error saving submission:', err);
//           return res.status(500).json({ error: 'Failed to save submission' });
//         }

//         const submissionId = result.insertId;
//         console.log('Inserted submission with ID:', submissionId);

//         const insertUserSubmissionSql = 'INSERT INTO submissionstatus (user_id, submission_id) VALUES (?, ?)';
//         db.query(insertUserSubmissionSql, [userId, submissionId], (err, result) => {
//           if (err) {
//             console.error('Error saving user submission:', err);
//             return res.status(500).json({ error: 'Failed to save user submission' });
//           }

//           console.log('Inserted into submissionstatus with submission_id:', submissionId);

//           const insertPendingApprovalSql = `
//             INSERT INTO pendingapprovals (
//               submission_id, user_id, name, device_id, schedule_id, brand, model,
//               serial, status, left_side, right_side, test_report, note, submission_date,
//               device_name, round, sticker, durable
//             )
//             SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), d.name, s.round, ?, ?
//             FROM devices d
//             JOIN schedules s ON d.id = s.device_id
//             WHERE d.id = ? AND s.id = ?
//           `;

//           const pendingApprovalValues = [submissionId, userId, name, deviceId, scheduleId, brand, model,
//             serial, status, leftSide, rightSide, testReport, note, sticker, durable, deviceId, scheduleId];

//           db.query(insertPendingApprovalSql, pendingApprovalValues, (err, result) => {
//             if (err) {
//               console.error('Error saving pending approval:', err);
//               return res.status(500).json({ error: 'Failed to save pending approval' });
//             }

//              // Fetch device name and round for notifyClients
//              const fetchDetailsSql = `
//              SELECT d.name AS deviceName, s.round AS round
//              FROM devices d
//              JOIN schedules s
//              WHERE d.id = ? AND s.id = ?
//            `;
//            db.query(fetchDetailsSql, [deviceId, scheduleId], (err, detailsResult) => {
//              if (err) {
//                console.error('Error fetching device and round details:', err);
//                return res.status(500).json({ error: 'Failed to fetch details' });
//              }

//              if (detailsResult.length === 0) {
//                return res.status(400).json({ error: 'Device or schedule not found' });
//              }

//              const { deviceName, round } = detailsResult[0];

//             // Assuming notifyClients is correctly defined and available in your context
//             const newSubmission = {
//               assignment: {
//                 submissionId,
//                 userId,
//                 name,
//                 deviceId,
//                 scheduleId,
//                 brand,
//                 model,
//                 serial,
//                 status,
//                 leftSide,
//                 rightSide,
//                 testReport,
//                 note,
//                 submissionDate: new Date().toISOString(),
//                 deviceName, // Ensure deviceName is defined correctly
//                 round, // Ensure round is defined correctly
//                 sticker,
//                 durable
//               }
//             };

//             console.log(newSubmission);
//             notifyClients(newSubmission);

//             res.status(200).json({ success: 'Submission and pending approval saved successfully' });
//           });
//           });
//         });
//       });
//     }
//   });
// });
//latest version

app.post('/submitUserSubmission', (req, res) => {
  const {
    userId, name, deviceId, scheduleId, brand, model, serial, status,
    leftSide, rightSide, testReport, note, sticker, durable
  } = req.body;

  // Validate sticker
  if (typeof sticker !== 'string' || sticker.length > 255) {
    return res.status(400).json({ error: 'Invalid sticker value' });
  }

  // SQL to check for existing pending submission
  const checkSql = `
    SELECT device_id, serial, sticker, schedule_id FROM pendingapprovals 
    WHERE device_id = ? AND serial = ? AND sticker = ? AND schedule_id = ?
    UNION
    SELECT device_id, serial, sticker, schedule_id FROM accepttable
    WHERE device_id = ? AND serial = ? AND sticker = ? AND schedule_id = ?
  `;

  const checkValues = [deviceId, serial, sticker, scheduleId, deviceId, serial, sticker, scheduleId];

  db.query(checkSql, checkValues, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking existing submissions:', checkErr);
      return res.status(500).json({ error: 'Database error' });
    }

    if (checkResults.length > 0) {
      // Existing submission found, block the new submission
      return res.status(400).json({ error: 'A submission with the same device, serial, sticker, and schedule ID is already pending approval.' });
    } else {
      // No existing submission, proceed with the new submission
      const sql = `
        INSERT INTO submissions (
          user_id, name, device_id, schedule_id, brand, model, serial, status,
          left_side, right_side, test_report, note, submission_date, device_name,
          round, sticker, durable
        )
        SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), d.name, s.round, ?, ?
        FROM devices d
        JOIN schedules s ON d.id = s.device_id
        WHERE d.id = ? AND s.id = ?
      `;

      const values = [userId, name, deviceId, scheduleId, brand, model, serial, status,
        leftSide, rightSide, testReport, note, sticker, durable, deviceId, scheduleId];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error saving submission:', err);
          return res.status(500).json({ error: 'Failed to save submission' });
        }

        const submissionId = result.insertId;
        console.log('Inserted submission with ID:', submissionId);

        const insertUserSubmissionSql = 'INSERT INTO submissionstatus (user_id, submission_id) VALUES (?, ?)';
        db.query(insertUserSubmissionSql, [userId, submissionId], (err, result) => {
          if (err) {
            console.error('Error saving user submission:', err);
            return res.status(500).json({ error: 'Failed to save user submission' });
          }

          console.log('Inserted into submissionstatus with submission_id:', submissionId);

          const insertPendingApprovalSql = `
            INSERT INTO pendingapprovals (
              submission_id, user_id, name, device_id, schedule_id, brand, model,
              serial, status, left_side, right_side, test_report, note, submission_date,
              device_name, round, sticker, durable
            )
            SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), d.name, s.round, ?, ?
            FROM devices d
            JOIN schedules s ON d.id = s.device_id
            WHERE d.id = ? AND s.id = ?
          `;

          const pendingApprovalValues = [submissionId, userId, name, deviceId, scheduleId, brand, model,
            serial, status, leftSide, rightSide, testReport, note, sticker, durable, deviceId, scheduleId];

          db.query(insertPendingApprovalSql, pendingApprovalValues, (err, result) => {
            if (err) {
              console.error('Error saving pending approval:', err);
              return res.status(500).json({ error: 'Failed to save pending approval' });
            }

             // Fetch device name and round for notifyClients
             const fetchDetailsSql = `
             SELECT d.name AS deviceName, s.round AS round
             FROM devices d
             JOIN schedules s
             WHERE d.id = ? AND s.id = ?
           `;
           db.query(fetchDetailsSql, [deviceId, scheduleId], (err, detailsResult) => {
             if (err) {
               console.error('Error fetching device and round details:', err);
               return res.status(500).json({ error: 'Failed to fetch details' });
             }

             if (detailsResult.length === 0) {
               return res.status(400).json({ error: 'Device or schedule not found' });
             }

             const { deviceName, round } = detailsResult[0];

            // Assuming notifyClients is correctly defined and available in your context
            const newSubmission = {
              assignment: {
                submissionId,
                userId,
                name,
                deviceId,
                scheduleId,
                brand,
                model,
                serial,
                status,
                leftSide,
                rightSide,
                testReport,
                note,
                submissionDate: new Date().toISOString(),
                deviceName, // Ensure deviceName is defined correctly
                round, // Ensure round is defined correctly
                sticker,
                durable
              }
            };

            console.log(newSubmission);
            notifyClients(newSubmission);

            res.status(200).json({ success: 'Submission and pending approval saved successfully' });
          });
          });
        });
      });
    }
  });
});






// app.put('/approveAssignment/:id', (req, res) => {
//   const { id } = req.params;

//   // Retrieve data from pendingapprovals
//   const sqlSelect = 'SELECT * FROM pendingapprovals WHERE id = ?';
//   db.query(sqlSelect, [id], (err, result) => {
//       if (err) {
//           console.error('Error selecting from pendingapprovals:', err);
//           return res.status(500).json({ error: 'Failed to approve assignment' });
//       }

//       if (result.length === 0) {
//           return res.status(404).json({ error: 'Assignment not found' });
//       }

//       const approval = result[0];
//       const { submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable } = approval;

//       // Check if submission_id exists in accepttable
//       const checkAcceptTableSql = 'SELECT COUNT(*) AS count FROM accepttable WHERE submission_id = ?';
//       db.query(checkAcceptTableSql, [submission_id], (err, result) => {
//           if (err) {
//               console.error('Error checking accepttable:', err);
//               return res.status(500).json({ error: 'Failed to check accepttable' });
//           }

//           const { count } = result[0];
//           if (count > 0) {
//               // If exists, update accepttable
//               const updateAcceptTableSql = `
//                   UPDATE accepttable
//                   SET user_id = ?, name = ?, device_id = ?, schedule_id = ?, brand = ?, model = ?, serial = ?, status = ?, left_side = ?, right_side = ?, test_report = ?, note = ?, submission_date = ?, device_name = ?, round = ?, sticker = ?, durable = ?
//                   WHERE submission_id = ?
//               `;
//               const values = [user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable, submission_id];

//               db.query(updateAcceptTableSql, values, (err, result) => {
//                   if (err) {
//                       console.error('Error updating accepttable:', err);
//                       return res.status(500).json({ error: 'Failed to approve assignment' });
//                   }

//                   // Remove from pendingapprovals table
//                   const sqlDelete = 'DELETE FROM pendingapprovals WHERE id = ?';
//                   db.query(sqlDelete, [id], (err, result) => {
//                       if (err) {
//                           console.error('Error deleting from pendingapprovals:', err);
//                           return res.status(500).json({ error: 'Failed to remove from pending approvals' });
//                       }

//                       // Update status in submissionstatus table
//                       const updateUserSubmissionSql = 'UPDATE submissionstatus SET status = "อนุมัติแล้ว", at = NOW() WHERE submission_id = ?';
//                       db.query(updateUserSubmissionSql, [submission_id], (err, result) => {
//                           if (err) {
//                               console.error('Error updating submissionstatus:', err);
//                               return res.status(500).json({ error: 'Failed to update submission status' });
//                           }

//                           return res.status(200).json({ success: 'Assignment approved and submission status updated successfully' });
//                       });
//                   });
//               });
//           } else {
//               // If not exists, insert into accepttable
//               const sqlInsert = `
//                   INSERT INTO accepttable (submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable)
//                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//               `;

//               const values = [submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable];

//               db.query(sqlInsert, values, (err, result) => {
//                   if (err) {
//                       console.error('Error inserting into accepttable:', err);
//                       return res.status(500).json({ error: 'Failed to approve assignment' });
//                   }

//                   // Remove from pendingapprovals table
//                   const sqlDelete = 'DELETE FROM pendingapprovals WHERE id = ?';
//                   db.query(sqlDelete, [id], (err, result) => {
//                       if (err) {
//                           console.error('Error deleting from pendingapprovals:', err);
//                           return res.status(500).json({ error: 'Failed to remove from pending approvals' });
//                       }

//                       // Update status in submissionstatus table
//                       const updateUserSubmissionSql = 'UPDATE submissionstatus SET status = "อนุมัติแล้ว", at = NOW() WHERE submission_id = ?';
//                       db.query(updateUserSubmissionSql, [submission_id], (err, result) => {
//                           if (err) {
//                               console.error('Error updating submissionstatus:', err);
//                               return res.status(500).json({ error: 'Failed to update submission status' });
//                           }

//                           return res.status(200).json({ success: 'Assignment approved and submission status updated successfully' });
//                       });
//                   });
//               });
//           }
//       });
//   });
// });


// app.put('/approveAssignment/:id', (req, res) => {
//   const { id } = req.params;

//   // Retrieve data from pendingapprovals
//   const sqlSelect = 'SELECT * FROM pendingapprovals WHERE id = ?';
//   db.query(sqlSelect, [id], (err, result) => {
//       if (err) {
//           console.error('Error selecting from pendingapprovals:', err);
//           return res.status(500).json({ error: 'Failed to approve assignment' });
//       }

//       if (result.length === 0) {
//           return res.status(404).json({ error: 'Assignment not found' });
//       }

//       const approval = result[0];
//       const { submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable } = approval;

//       // Check if submission_id exists in accepttable
//       const checkAcceptTableSql = 'SELECT * FROM accepttable WHERE submission_id = ?';
//       db.query(checkAcceptTableSql, [submission_id], (err, result) => {
//           if (err) {
//               console.error('Error checking accepttable:', err);
//               return res.status(500).json({ error: 'Failed to check accepttable' });
//           }

//           if (result.length > 0) {
//               // If exists, send back the old data along with the new data for comparison
//               const oldData = result[0];
//               return res.status(200).json({ oldData, newData: approval });
//           } else {
//               // If not exists, proceed with the normal approval process
//               handleApprovalProcess(approval, res);
//           }
//       });
//   });
// });


app.put('/approveAssignment/:id', (req, res) => {
  const { id } = req.params;

  // Retrieve data from pendingapprovals
  const sqlSelect = 'SELECT * FROM pendingapprovals WHERE id = ?';
  db.query(sqlSelect, [id], (err, result) => {
      if (err) {
          console.error('Error selecting from pendingapprovals:', err);
          return res.status(500).json({ error: 'Failed to approve assignment' });
      }

      if (result.length === 0) {
          return res.status(404).json({ error: 'Assignment not found' });
      }

      const approval = result[0];
      const { submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable } = approval;

      // Check if submission_id exists in accepttable
      const checkAcceptTableSql = 'SELECT * FROM accepttable WHERE submission_id = ?';
      db.query(checkAcceptTableSql, [submission_id], (err, result) => {
          if (err) {
              console.error('Error checking accepttable:', err);
              return res.status(500).json({ error: 'Failed to check accepttable' });
          }

          if (result.length > 0) {
              // If exists, send back the old data along with the new data for comparison
              const oldData = result[0];
              return res.status(200).json({ oldData, newData: approval });
          } else {
              // If not exists, insert into accepttable
              const sqlInsert = `
                  INSERT INTO accepttable (submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `;

              const values = [submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable];

              db.query(sqlInsert, values, (err, result) => {
                  if (err) {
                      console.error('Error inserting into accepttable:', err);
                      return res.status(500).json({ error: 'Failed to approve assignment' });
                  }

                  // Remove from pendingapprovals table
                  const sqlDelete = 'DELETE FROM pendingapprovals WHERE id = ?';
                  db.query(sqlDelete, [id], (err, result) => {
                      if (err) {
                          console.error('Error deleting from pendingapprovals:', err);
                          return res.status(500).json({ error: 'Failed to remove from pending approvals' });
                      }

                      // Update status in submissionstatus table
                      const updateUserSubmissionSql = 'UPDATE submissionstatus SET status = "อนุมัติแล้ว", at = NOW() WHERE submission_id = ?';
                      db.query(updateUserSubmissionSql, [submission_id], (err, result) => {
                          if (err) {
                              console.error('Error updating submissionstatus:', err);
                              return res.status(500).json({ error: 'Failed to update submission status' });
                          }









    // Assuming notifyClients is correctly defined and available in your context
    const newSubmission = {
      acceptsubmit: {
    submission_id,
    sticker,
    device_name,
    round
      }
    };

    console.log(newSubmission);
    notifyClientsv2(newSubmission);

                          return res.status(200).json({ success: 'Assignment approved and submission status updated successfully' });
                      });
                  });
              });
            
          }
      });
  });
});


// const handleApprovalProcess = (approval, res) => {
//   const { submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable } = approval;

//   // Insert or update into accepttable
//   const sqlInsertOrUpdate = `
//       INSERT INTO accepttable (submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       ON DUPLICATE KEY UPDATE
//       user_id = VALUES(user_id),
//       name = VALUES(name),
//       device_id = VALUES(device_id),
//       schedule_id = VALUES(schedule_id),
//       brand = VALUES(brand),
//       model = VALUES(model),
//       serial = VALUES(serial),
//       status = VALUES(status),
//       left_side = VALUES(left_side),
//       right_side = VALUES(right_side),
//       test_report = VALUES(test_report),
//       note = VALUES(note),
//       submission_date = VALUES(submission_date),
//       device_name = VALUES(device_name),
//       round = VALUES(round),
//       sticker = VALUES(sticker),
//       durable = VALUES(durable)
//   `;
//   db.query(sqlInsertOrUpdate, [submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable], (err, result) => {
//       if (err) {
//           console.error('Error inserting or updating into accepttable:', err);
//           return res.status(500).json({ error: 'Failed to insert or update assignment' });
//       }

//       // Delete from pendingapprovals
//       const sqlDeletePending = 'DELETE FROM pendingapprovals WHERE id = ?';
//       db.query(sqlDeletePending, [approval.id], (err, result) => {
//           if (err) {
//               console.error('Error deleting from pendingapprovals:', err);
//               return res.status(500).json({ error: 'Failed to delete pending approval' });
//           }

//           // Update submissionstatus table
//           const sqlUpdateSubmissionStatus = 'UPDATE submissionstatus SET status = ? WHERE submission_id = ?';
//           db.query(sqlUpdateSubmissionStatus, [status, submission_id], (err, result) => {
//               if (err) {
//                   console.error('Error updating submissionstatus:', err);
//                   return res.status(500).json({ error: 'Failed to update submission status' });
//               }

//               return res.status(200).json({ message: 'Assignment approved and updated successfully' });
//           });
//       });
//   });
// };













const handleApprovalProcess = (approval, res) => {
    const { submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable } = approval;

    // Update the record in accepttable
    const sqlUpdateAcceptTable = `
        UPDATE accepttable
        SET user_id = ?, name = ?, device_id = ?, schedule_id = ?, brand = ?, model = ?, serial = ?, status = ?, left_side = ?, right_side = ?, test_report = ?, note = ?, submission_date = ?, device_name = ?, round = ?, sticker = ?, durable = ?
        WHERE submission_id = ?
    `;
    const values = [user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable, submission_id];

    db.query(sqlUpdateAcceptTable, values, (err, result) => {
        if (err) {
            console.error('Error updating accepttable:', err);
            return res.status(500).json({ error: 'Failed to update accepttable' });
        }

        // Remove from pendingapprovals table
        const sqlDelete = 'DELETE FROM pendingapprovals WHERE id = ?';
        db.query(sqlDelete, [approval.id], (err, result) => {
            if (err) {
                console.error('Error deleting from pendingapprovals:', err);
                return res.status(500).json({ error: 'Failed to remove from pending approvals' });
            }

            // Update status in submissionstatus table
            const updateUserSubmissionSql = 'UPDATE submissionstatus SET status = "อนุมัติแล้ว", at = NOW() WHERE submission_id = ?';
            db.query(updateUserSubmissionSql, [submission_id], (err, result) => {
                if (err) {
                    console.error('Error updating submissionstatus:', err);
                    return res.status(500).json({ error: 'Failed to update submission status' });
                }

                return res.status(200).json({ success: 'Assignment approved and submission status updated successfully' });
            });
        });
    });
};



app.put('/approveAssignmentFinal/:id', (req, res) => {
  const { id } = req.params;

  // Retrieve data from pendingapprovals
  const sqlSelect = 'SELECT * FROM pendingapprovals WHERE id = ?';
  db.query(sqlSelect, [id], (err, result) => {
      if (err) {
          console.error('Error selecting from pendingapprovals:', err);
          return res.status(500).json({ error: 'Failed to approve assignment' });
      }

      if (result.length === 0) {
          return res.status(404).json({ error: 'Assignment not found' });
      }

      const approval = result[0];
      const { submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable } = approval;

      // Update the record in accepttable
      const sqlUpdateAcceptTable = `
          UPDATE accepttable
          SET user_id = ?, name = ?, device_id = ?, schedule_id = ?, brand = ?, model = ?, serial = ?, status = ?, left_side = ?, right_side = ?, test_report = ?, note = ?, submission_date = ?, device_name = ?, round = ?, sticker = ?, durable = ?
          WHERE submission_id = ?
      `;
      const values = [user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable, submission_id];

      db.query(sqlUpdateAcceptTable, values, (err, result) => {
          if (err) {
              console.error('Error updating accepttable:', err);
              return res.status(500).json({ error: 'Failed to update accepttable' });
          }

          // Remove from pendingapprovals table
          const sqlDelete = 'DELETE FROM pendingapprovals WHERE id = ?';
          db.query(sqlDelete, [id], (err, result) => {
              if (err) {
                  console.error('Error deleting from pendingapprovals:', err);
                  return res.status(500).json({ error: 'Failed to remove from pending approvals' });
              }

              // Update status in submissionstatus table
              const updateUserSubmissionSql = 'UPDATE submissionstatus SET status = "อนุมัติแล้ว", at = NOW() WHERE submission_id = ?';
              db.query(updateUserSubmissionSql, [submission_id], (err, result) => {
                  if (err) {
                      console.error('Error updating submissionstatus:', err);
                      return res.status(500).json({ error: 'Failed to update submission status' });
                  }

                      // Assuming notifyClients is correctly defined and available in your context
    const newSubmission = {
      acceptupdate: {
    submission_id,
    sticker,
    device_name,
    round
      }
    };

    console.log(newSubmission);
    notifyClientsv2(newSubmission);

                  return res.status(200).json({ success: 'Assignment approved and submission status updated successfully' });
              });
          });
      });
  });
});

app.delete('/deleteAssignment/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM accepttable WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ success: "Assignment deleted successfully" });
    });
});


app.put('/sendToRepair/:id',(req,res) =>{
    const {id} = req.params;
    
    // Retrieve data from pendingapprovals
    const sqlSelect = 'SELECT * FROM pendingapprovals WHERE id = ?';
    db.query(sqlSelect, [id], (err, result) => {
        if (err) {
            console.error('Error selecting from pendingapprovals:', err);
            return res.status(500).json({ error: 'Failed to sendtorecycle assignment' });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ error: 'Assignment not found' });
        }


const approval = result[0];
        const { submission_id, user_id, name, device_id, schedule_id, brand, model, serial,status, left_side, right_side, test_report, submission_date,note, device_name, round ,sticker,durable} = approval;

        // Insert into accepttable
        const sqlInsert = `
            INSERT INTO recyclebin (submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report,note, submission_date, device_name, round,sticker,durable)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)
        `;

        const values = [submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report,note, submission_date, device_name, round,sticker,durable];

        db.query(sqlInsert, values, (err, result) => {
            if (err) {
                console.error('Error inserting into accepttable:', err);
                return res.status(500).json({ error: 'Failed to approve assignment' });
            }
            // Remove from pendingapprovals table
            const sqlDelete = 'DELETE FROM pendingapprovals WHERE id = ?';
            db.query(sqlDelete, [id], (err, result) => {
                if (err) {
                    console.error('Error deleting from pendingapprovals:', err);
                    return res.status(500).json({ error: 'Failed to remove from pending approvals' });
                }

                // Update status in user_submissions table
                const updateUserSubmissionSql = 'UPDATE submissionstatus SET status = "อนุมัติแล้ว",at = NOW()  WHERE submission_id = ?';
                db.query(updateUserSubmissionSql, [submission_id], (err, result) => { 
                  if (err) {
                    console.error('Error updating submissionstatus:', err);
                    return res.status(500).json({ error: 'Failed to update submission status' });
                  }

                      // Assuming notifyClients is correctly defined and available in your context
    const newSubmission = {
      repair: {
    submission_id,
    sticker,
    device_name
      }
    };

    console.log(newSubmission);
    notifyClientsv2(newSubmission);
                
                  // ส่งการตอบกลับแบบไม่มีข้อผิดพลาด
                  return res.status(200).json({ success: 'Assignment approved and submission status updated successfully' });
                });
            });
        });
    });
});



app.put('/rejectAssignment/:id', (req, res) => {
    const { id } = req.params;

    const sqlSelect = 'SELECT submission_id FROM pendingapprovals WHERE id = ?';
    db.query(sqlSelect, [id], (err, result) => {
        if (err) {
            console.error('Error selecting from pendingapprovals:', err);
            return res.status(500).json({ error: 'Failed to approve assignment' });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
 

    const {submission_id} = result[0];

    const updateusersubmission = 'UPDATE submissionstatus SET status = "ปฏิเสธแล้ว",at = NOW() WHERE submission_id =? ';
    db.query(updateusersubmission,[submission_id],(err,result)=>{
        if(err){
            console.error("Error updating submissionstatus",err);
            return res.status(500).json({error:"failed to update submission status"});
        }

    const sqlDelete = 'DELETE FROM pendingapprovals WHERE id = ?';
    db.query(sqlDelete, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
    // Assuming notifyClients is correctly defined and available in your context
    const newSubmission = {
      rejectsubmit: {
    submission_id,
      }
    };

    console.log(newSubmission);
    notifyClientsv2(newSubmission);

        res.status(200).json({ success: 'Assignment rejected successfully' });
    });
    });
});
  
});

app.get('/getDevices', (req, res) => {
    const sql = "SELECT * FROM devices";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.get('/getUserDevices/:userId', (req, res) => {
  const { userId } =  req.params;
  // const sql = `
  //   SELECT d.id, d.name
  //   FROM user_devices ud
  //   JOIN devices d ON ud.device_id = d.id
  //   WHERE ud.user_id = ?
  // `;
const sql =`SELECT d.id, d.name,ud.sticker FROM user_devices ud JOIN devices d ON ud.device_id = d.id WHERE ud.user_id = ?;`;

  // const sql = `SELECT sticker FROM user_devices WHERE user_id = ?;`;
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query', err); // Log the error
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
 
app.post('/addUserDeviceRequest', (req, res) => {
    const { userId, newDevice, brand, model, serial,sticker,durable} = req.body;
  
    const insertHistorySql = `
      INSERT INTO changeaddhistory (user_id, new_device_id, username, newdevices, brand, model, serial_number,sticker,durable)
        SELECT ?, ?, r.name, d.name, ?, ?, ?,?,?
        FROM register r, devices d
        WHERE r.id = ? AND d.id = ?
      `;
    db.query(insertHistorySql, [userId, newDevice, brand, model, serial,sticker,durable ,userId, newDevice], (err, historyResult) => {
      if (err) {
        console.error('Error saving to changeaddhistory:', err);
        return res.status(500).json({ error: 'Failed to save to changeaddhistory' });
      }
  
      const historyId = historyResult.insertId;
  
      const insertRequestSql = `
       INSERT INTO pendingacceptchange (user_id, new_device_id, username, newdevices, brand, model, serial_number, action, change_id, sticker,durable)
SELECT ?, ?, r.name, d.name, ?, ?, ?, 'add', ?, ?,?
FROM register r, devices d
WHERE r.id = ? AND d.id = ?
      `;
  
      db.query(insertRequestSql, [userId, newDevice, brand, model, serial,historyId,sticker,durable, userId, newDevice], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: err.message });
        }
        
        
                // Fetch device name and round for notifyClients
                const fetchDetailsSql = `
                SELECT p.username
                FROM pendingacceptchange p
                WHERE  p.user_id = ?
              `;
              db.query(fetchDetailsSql, [userId], (err, detailsResult) => {
                if (err) {
                  console.error('Error fetching device and round details:', err);
                  return res.status(500).json({ error: 'Failed to fetch details' });
                }
      
                if (detailsResult.length === 0) {
                  return res.status(400).json({ error: 'Device or schedule not found' });
                }
      
                const {username} = detailsResult[0];
      
                // Assuming notifyClients is correctly defined and available in your context
                const newSubmission = {
                  adevice: {
                   username,
                   historyId
                  }
                };
      
                console.log(newSubmission);
                notifyClients(newSubmission);

        res.json({ success: 'Device add request sent successfully', changeId: results.insertId });
      });
    });
  });
});

app.post('/addChangeDeviceStatus', (req, res) => {
  const { userId, changeId } = req.body;
  
  // ตรวจสอบว่า changeId มีอยู่ใน changeaddhistory
  const checkSql = 'SELECT id FROM changeaddhistory WHERE id = ?';
  db.query(checkSql, [changeId], (checkErr, checkResult) => {
      if (checkErr || checkResult.length === 0) {
          return res.status(400).json({ error: 'Invalid changeId' });
      }
      
      // ถ้า changeId ถูกต้อง ดำเนินการต่อ
      const sql = 'INSERT INTO changedevicestatus (user_id, change_id, status) VALUES (?, ?, "ส่งแล้ว")';
      db.query(sql, [userId, changeId], (err, result) => {
          if (err) {
              console.error('Error inserting into changedevicestatus:', err);
              return res.status(500).json({ error: 'Failed to add change device status' });
          }
          res.status(200).json({ success: 'Change device status added successfully' });
      });
  });
});

  app.post('/changeUserDeviceRequest', (req, res) => {
    const { userId, selectedDevice, newDevice, brand, model, serial, selectedSerial, sticker, durable, selectedSticker } = req.body;
  
    const insertHistorySql = `
      INSERT INTO changeaddhistory (user_id, selected_device_id, new_device_id, username, selecteddevice, newdevices, brand, model, serial_number, selecteddeviceserial, sticker, durable, selectedSticker)
      SELECT ?, ?, ?, r.name, od.name, nd.name, ?, ?, ?, ?, ?, ?, ?
      FROM register r, devices od, devices nd
      WHERE r.id = ? AND od.id = ? AND nd.id = ?
    `;
  
    db.query(insertHistorySql, [userId, selectedDevice, newDevice, brand, model, serial, selectedSerial, sticker, durable, selectedSticker, userId, selectedDevice, newDevice], (err, historyResult) => {
      if (err) {
        console.error('Error saving to changeaddhistory:', err);
        return res.status(500).json({ error: 'Failed to save to changeaddhistory' });
      }
  
      const historyId = historyResult.insertId;
  
      const insertRequestSql = `
        INSERT INTO pendingacceptchange (user_id, selected_device_id, new_device_id, username, selecteddevice, newdevices, brand, model, serial_number, action, selecteddeviceserial, sticker, durable, change_id, selectedSticker)
        SELECT ?, ?, ?, r.name, od.name, nd.name, ?, ?, ?, 'change', ?, ?, ?, ?, ?
        FROM register r, devices od, devices nd
        WHERE r.id = ? AND od.id = ? AND nd.id = ?
      `;
  
      db.query(insertRequestSql, [userId, selectedDevice, newDevice, brand, model, serial, selectedSerial, sticker, durable, historyId, selectedSticker, userId, selectedDevice, newDevice], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: err.message });
        }
        
        // Fetch device name and round for notifyClients
          const fetchDetailsSql = `
          SELECT p.username
          FROM pendingacceptchange p
          WHERE  p.user_id = ?
        `;
        db.query(fetchDetailsSql, [userId], (err, detailsResult) => {
          if (err) {
            console.error('Error fetching device and round details:', err);
            return res.status(500).json({ error: 'Failed to fetch details' });
          }

          if (detailsResult.length === 0) {
            return res.status(400).json({ error: 'Device or schedule not found' });
          }

          const {username} = detailsResult[0];

          // Assuming notifyClients is correctly defined and available in your context
          const newSubmission = {
            cdevice: {
             username,
             historyId
            }
          };

          console.log(newSubmission);
          notifyClients(newSubmission);

        res.json({ success: 'Device change request sent successfully', changeId: results.insertId });
      });
    });
  });
});
  
  

  app.post('/deleteUserDeviceRequest', (req, res) => {
    const { userId, selectedDevice, selectedSerial, selectedSticker } = req.body;
    console.log(req.body);
  
    // Insert into changeaddhistory first
    const insertHistorySql = `
      INSERT INTO changeaddhistory (user_id, selected_device_id, username, selecteddevice, selecteddeviceserial, selectedSticker)
      SELECT ?, ?, r.name, od.name, ?, ?
      FROM register r, devices od
      WHERE r.id = ? AND od.id = ?
    `;
  
    db.query(insertHistorySql, [userId, selectedDevice, selectedSerial, selectedSticker, userId, selectedDevice], (err, historyResult) => {
      if (err) {
        console.error('Error saving to changeaddhistory:', err);
        return res.status(500).json({ error: 'Failed to save to changeaddhistory' });
      }
  
      const historyId = historyResult.insertId;
  
      // Insert into pendingacceptchange using the historyId
      const insertReqsql = `
        INSERT INTO pendingacceptchange (user_id, selected_device_id, username, selecteddevice, selecteddeviceserial, action, change_id, selectedSticker)
        SELECT ?, ?, r.name, od.name, ?, 'deletedevice', ?, ?
        FROM register r, devices od
        WHERE r.id = ? AND od.id = ?
      `;
  
      db.query(insertReqsql, [userId, selectedDevice, selectedSerial, historyId, selectedSticker, userId, selectedDevice], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: err.message });
        }

         // Fetch device name and round for notifyClients
         const fetchDetailsSql = `
         SELECT p.username
         FROM pendingacceptchange p
         WHERE  p.user_id = ?
       `;
       db.query(fetchDetailsSql, [userId], (err, detailsResult) => {
         if (err) {
           console.error('Error fetching device and round details:', err);
           return res.status(500).json({ error: 'Failed to fetch details' });
         }

         if (detailsResult.length === 0) {
           return res.status(400).json({ error: 'Device or schedule not found' });
         }

         const {username} = detailsResult[0];

         // Assuming notifyClients is correctly defined and available in your context
         const newSubmission = {
           ddevice: {
            username,
            historyId
           }
         };

         console.log(newSubmission);
         notifyClients(newSubmission);

  
        // If the query is successful, send a success response
        res.json({ success: 'Device change request sent successfully', changeId: results.insertId });
      });
    });
  });
});



  app.get('/getrequestaddchangedevice',(req,res)=>{
    const sqlSelect = 'SELECT * FROM pendingacceptchange';
    db.query(sqlSelect,(err,result)=>{
        if (err) {
            console.error('Error fetching recycle bin data:', err);
            res.status(500).send('Failed to fetch recycle bin data');
        } else {
            res.send(result);
        }
    })
  })

  app.post('/addUserDevice', (req, res) => {
    const { userId, newDevice, brand, model, serial_number,sticker,durable } = req.body;
  
    const insertUserDeviceSql = `
      INSERT INTO user_devices (user_id, device_id, username, device_name, brand, model, serial_number,sticker,durable)
      SELECT ?, ?, r.name, d.name, ?, ?, ?,?,?
      FROM register r, devices d
      WHERE r.id = ? AND d.id = ?;
    `;
  
    db.query(insertUserDeviceSql, [userId, newDevice, brand, model, serial_number,sticker,durable, userId, newDevice], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: err.message });
      }
  
      // Update status in changedevicestatus table
      const updateChangeStatusSql = 'UPDATE changedevicestatus SET status = "อนุมัติแล้ว", at = NOW() WHERE change_id = (SELECT id FROM pendingacceptchange WHERE user_id = ? AND new_device_id = ? AND action = "add" ORDER BY id DESC LIMIT 1)';
      db.query(updateChangeStatusSql, [userId, newDevice], (err, result) => {
        if (err) {
          console.error('Error updating changedevicestatus:', err);
          return res.status(500).json({ error: 'Failed to update change device status' });
        }
  
      
          // Assuming notifyClients is correctly defined and available in your context
          const newSubmission = {
            acceptadevice: {
             sticker,
             newDevice,
             serial_number
            }
          };

          console.log(newSubmission);
          notifyClientsv2(newSubmission);

        res.json({ success: 'Device added successfully' });
      });
    });
  });



  app.post('/changeUserDevice', (req, res) => {
    const { userId, selectedDevice, newDevice, brand, model, serial, selectedSerial,sticker,durable } = req.body;
    const updateUserDeviceSql = `
      UPDATE user_devices
      SET device_id = ?, brand = ?, model = ?, serial_number = ?,sticker = ?,durable=?
      WHERE serial_number = ?
    `;
  
    db.query(updateUserDeviceSql, [newDevice, brand, model, serial,sticker,durable,selectedSerial], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      // Update status in changedevicestatus table
      const updateChangeStatusSql = 'UPDATE changedevicestatus SET status = "อนุมัติแล้ว", at = NOW() WHERE change_id = (SELECT id FROM pendingacceptchange WHERE user_id = ? AND selected_device_id = ? AND new_device_id = ? AND action = "change" ORDER BY id DESC LIMIT 1)';
      db.query(updateChangeStatusSql, [userId, selectedDevice, newDevice], (err, result) => {
        if (err) {
          console.error('Error updating changedevicestatus:', err);
          return res.status(500).json({ error: 'Failed to update change device status' });
        }
  
          // Assuming notifyClients is correctly defined and available in your context
          const newSubmission = {
           changedevice: {
            selectedSerial,
            selectedDevice,
            sticker,
            newDevice
            }
          };

          console.log(newSubmission);
          notifyClientsv2(newSubmission);

        res.json({ success: 'Device changed successfully' });
      });
    });
  });


  app.post('/DeleteUserDevice', (req, res) => {
    const { userId, selectedDevice, selectedSerial } = req.body;
  
    const deletedevice = `
      DELETE FROM user_devices
WHERE user_id = ? and device_id = ? and serial_number =?;
    `;
  
    // Ensure all required parameters are passed in the correct order
    db.query(deletedevice, [userId, selectedDevice, selectedSerial], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: err.message });
      }
  
        // Update status in changedevicestatus table
        const updateChangeStatusSql = 'UPDATE changedevicestatus SET status = "อนุมัติแล้ว", at = NOW() WHERE change_id = (SELECT id FROM pendingacceptchange WHERE user_id = ? AND selected_device_id = ? AND action = "deletedevice" ORDER BY id DESC LIMIT 1)';
        db.query(updateChangeStatusSql, [userId, selectedDevice], (err, result) => {
          if (err) {
            console.error('Error updating changedevicestatus:', err);
            return res.status(500).json({ error: 'Failed to update change device status' });
          }

           // Assuming notifyClients is correctly defined and available in your context
           const newSubmission = {
            deletedevice: {
            userId,
            selectedDevice,
            selectedSerial
             }
           };
 
           console.log(newSubmission);
           notifyClientsv2(newSubmission);

      // If the query is successful, send a success response
      res.status(200).json({ message: 'Device delete request inserted successfully.' });
    });

  });
})



  
app.put('/rejectaddchange/:id', (req, res) => {
    const { id } = req.params;
    const sqlDelete = 'DELETE FROM pendingacceptchange WHERE id = ?';
    db.query(sqlDelete, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ success: 'Assignment rejected successfully' });
    });
    // Assuming notifyClients is correctly defined and available in your context
    const newSubmission = {
      rejectaddchange: {
       id
      }
    };

    console.log(newSubmission);
    notifyClientsv2(newSubmission);
});

app.get('/user-submissions', (req, res) => {
    const userId = req.query.userId; // ดึง userId จากเซสชัน หรือใช้วิธีอื่นในการยืนยันตัวตน
  
    const sql = `
    SELECT 
    us.id, 
    us.submission_id, 
    us.status, 
    us.submitted_at, 
    us.at, 
    s.schedule_id,
    s.device_id, 
    s.round, 
    s.brand, 
    s.model, 
    s.serial, 
    s.test_report,
    s.sticker,
    s.durable, 
    d.name,
    s.status AS status2,  -- เปลี่ยนชื่อคอลัมน์ s.status เป็น status2
    s.left_side,
    s.right_side,
    s.note 
FROM 
    submissionstatus us 
JOIN 
    submissions s ON us.submission_id = s.id 
JOIN 
    devices d ON s.device_id = d.id 
WHERE 
    us.user_id = ?;

    `;
  
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching user submissions:', err);
        return res.status(500).json({ error: 'Failed to fetch user submissions' });
      }
  
      res.json(results);
    });
  }); 

app.get('/getSerialsNumbers/:deviceId/:userId/:sticker', (req, res) => {
  const deviceId = req.params.deviceId;
  const userId = req.params.userId;
  const sticker = req.params.sticker;
  const query = 'SELECT * FROM user_devices WHERE device_id = ? AND user_id = ? AND sticker = ?';
  db.query(query, [deviceId, userId, sticker], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(results);
    }
  });
});

app.get('/change-device-status', (req, res) => {
    const userId = req.query.userId;
    const sql = `
          select cds.id, cds.user_id, cds.change_id, cds.status, cds.submitted_at, cds.at,
            cah.selecteddevice,cah.selecteddeviceserial, cah.newdevices, cah.brand, cah.model, cah.serial_number,cah.sticker,cah.durable,cah.selectedSticker
        FROM changedevicestatus cds
        JOIN changeaddhistory cah ON cds.change_id = cah.id
        WHERE cds.user_id = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching change device status:', err);
            return res.status(500).json({ error: 'Failed to fetch change device status' });
        }

        res.json(results);
    });
});

app.post('/insertActionLog', (req, res) => {
    const { action, assignmentId, note, status, submissionId } = req.body;
    const sql = 'INSERT INTO action_logs (action, assignment_id, note, status, submission_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [action, assignmentId, note, status, submissionId], (err, result) => {
      if (err) {
        console.error('Error inserting action log:', err);
        return res.status(500).json({ error: 'Failed to insert action log' });
      }
      res.status(200).json({ success: 'Action log inserted successfully' });
    });
  });

app.post('/insertActionLog2',(req, res) => {
  const { action, assignmentId, note, status} = req.body;
  const sql = 'INSERT INTO action_logs (action, note, status,change_id,hisaddchange_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [action, note, status, assignmentId ,assignmentId,], (err, result) => {
    if (err) {
      console.error('Error inserting action log:', err);
      return res.status(500).json({ error: 'Failed to insert action log' });
    }
    res.status(200).json({ success: 'Action log inserted successfully' });
  });
});
  // Route for fetching action logs
app.get('/getActionLog', (req, res) => {
  
    const sql = `SELECT
    al.action,
    al.submission_id,
    al.note,
    al.status,
    al.time,
    s.name,
    s.device_name,
    s.serial,
    s.test_report,
    s.round,
    s.durable,
    s.sticker
FROM action_logs al
JOIN submissions s ON al.submission_id = s.id `;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching action logs:', err);
        return res.status(500).json({ error: 'Failed to fetch action logs' });
      }
      res.json(results);
    });
  }); 

  // Route for fetching action logs
app.get('/getActionLog2', (req, res) => {
  
  const sql = `SELECT al.action, al.hisaddchange_id, al.note, al.status, al.time, ch.username,ch.selectedSticker, ch.selecteddevice, ch.selecteddeviceserial,ch.sticker,ch.durable,ch.newdevices, ch.serial_number,ch.brand,ch.model
   FROM action_logs al 
  JOIN changeaddhistory ch ON al.hisaddchange_id = ch.id `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching action logs:', err);
      return res.status(500).json({ error: 'Failed to fetch action logs' });
    }
    res.json(results);
  });
}); 

app.post('/add-to-repair', (req, res) => {
  const { userId, deviceId, username, brand, model, serial, sticker,durable,submissionId } = req.body;

  const sql = 'INSERT INTO devices_in_repair (user_id, device_id, username, device_name, brand, model, serial_number, submission_id,sticker,durable) VALUES (?, ?, ?, (SELECT name FROM devices WHERE id = ?), ?, ?, ?, ?,?,?)';
  db.query(sql, [userId, deviceId, username, deviceId, brand, model, serial, submissionId,sticker,durable,], (err, result) => {
    if (err) {
      console.error('Error inserting into devices_in_repair:', err);
      return res.status(500).json({ error: 'Failed to add device to repair' });
    }
    res.status(200).json({ success: 'Device added to repair successfully' });
  });
});

app.delete('/remove-user-device/:userId/:sticker/:deviceId', (req, res) => {
  const { userId, deviceId,sticker } = req.params;

  const sql = 'DELETE FROM user_devices WHERE user_id = ? AND device_id = ? AND sticker = ?';
  db.query(sql, [userId, deviceId, sticker], (err, result) => {
    if (err) {
      console.error('Error deleting from user_devices:', err);
      return res.status(500).json({ error: 'Failed to remove device from user' });
    }
    res.status(200).json({ success: 'Device removed from user successfully' });
  });
});

// app.put('/repair-completed/:id', (req, res) => {
//   const { id } = req.params;
//   const { userId, deviceId, serial,sticker,durable } = req.body;

//   // Retrieve device data from devices_in_repair
//   const selectSql = 'SELECT * FROM devices_in_repair WHERE id = ?';
//   db.query(selectSql, [id], (err, results) => {
//       if (err) {
//           console.error('Error selecting from devices_in_repair:', err);
//           return res.status(500).json({ error: 'Failed to return device to user' });
//       }

//       if (results.length === 0) {
//           return res.status(404).json({ error: 'Device not found' });
//       }

//       const deviceData = results[0];

//       // Insert device data back into user_devices
//       const insertSql = `
//           INSERT INTO user_devices (user_id, device_id, username, device_name, brand, model, serial_number,sticker,durable)
//           VALUES (?, ?, ?, ?, ?, ?, ?,?,?)
//       `;
//       const values = [userId, deviceId, deviceData.username, deviceData.device_name, deviceData.brand, deviceData.model, serial,sticker,durable];

//       db.query(insertSql, values, (err, result) => {
//           if (err) {
//               console.error('Error inserting into user_devices:', err);
//               return res.status(500).json({ error: 'Failed to return device to user' });
//           }

//           // Remove from devices_in_repair
//           const deleteSql = 'DELETE FROM devices_in_repair WHERE id = ?';
//           db.query(deleteSql, [id], (err, result) => {
//               if (err) {
//                   console.error('Error deleting from devices_in_repair:', err);
//                   return res.status(500).json({ error: 'Failed to remove device from repair' });
//               }

//               res.status(200).json({ success: 'Device returned to user successfully' });
//           });
//       });
//   });
// });


// app.put('/repair-completed/:id', (req, res) => {
//   const { id } = req.params;
//   const { userId, deviceId, serial,sticker,durable } = req.body;

//   const sql = `UPDATE devices_in_repair 
//                SET user_id = ?, device_id = ?, serial_number = ? 
//                WHERE recycle_id = ?`;

//   db.query(sql, [userId, deviceId, serial, id], (err, result) => {
//       if (err) {
//           console.error('Error updating devices_in_repair:', err);
//           return res.status(500).json({ error: 'Failed to update device in repair' });
//       }
//       res.status(200).json({ success: 'Device updated in repair successfully' });
//   });
// });

app.put('/repair-completed/:id', (req, res) => {
  const { id } = req.params;
  const { userId, deviceId, serial, sticker, durable } = req.body;

  // Retrieve device data from devices_in_repair
  const selectSql = 'SELECT * FROM devices_in_repair WHERE id = ?';
  db.query(selectSql, [id], (err, results) => {
    if (err) {
      console.error('Error selecting from devices_in_repair:', err);
      return res.status(500).json({ error: 'Failed to return device to user' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }

    const deviceData = results[0];

    // Insert device data back into user_devices
    const insertSql = `
      INSERT INTO user_devices (user_id, device_id, username, device_name, brand, model, serial_number, sticker, durable)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [userId, deviceId, deviceData.username, deviceData.device_name, deviceData.brand, deviceData.model, deviceData.serial_number, deviceData.sticker, deviceData.durable];

    db.query(insertSql, values, (err, result) => {
      if (err) {
        console.error('Error inserting into user_devices:', err);
        return res.status(500).json({ error: 'Failed to return device to user' });
      }

      // Remove from devices_in_repair
      const deleteSql = 'DELETE FROM devices_in_repair WHERE id = ?';
      db.query(deleteSql, [id], (err, result) => {
        if (err) {
          console.error('Error deleting from devices_in_repair:', err);
          return res.status(500).json({ error: 'Failed to remove device from repair' });
        }

        res.status(200).json({ success: 'Device returned to user successfully' });
      });
    });
  });
});



app.get('/getUserStickers/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT DISTINCT sticker FROM user_devices WHERE user_id = ?';

  db.query(sql, [userId], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(results);
    }
  });
});



app.get('/getUserDevicesBySticker/:userId/:sticker', (req, res) => {
  const { userId, sticker } = req.params;
  const sql = `
      SELECT ud.user_device_id, ud.device_id, d.name AS device_name
      FROM user_devices ud
      JOIN devices d ON ud.device_id = d.id
      WHERE ud.user_id = ? AND ud.sticker = ?
  `;

  db.query(sql, [userId, sticker], (error, results) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.json(results);
      }
  });
});

app.get('/getUsersAndSubmissions', (req, res) => {
  const sql = `
     SELECT 
    u.user_device_id,
    u.user_id,
    u.device_id,
    u.sticker,
    u.username,
    u.durable,
    u.device_name,
    u.brand,
    u.model,
    u.serial_number,
    s.round,
    s.id,
    CASE 
        WHEN a.sticker IS NOT NULL AND a.device_id IS NOT NULL AND a.schedule_id IS NOT NULL 
        THEN 'ส่งแล้ว'
        ELSE 'ยังไม่ส่ง'
    END AS status
FROM 
    user_devices u
JOIN 
    schedules s 
ON 
    u.device_id = s.device_id
LEFT JOIN 
    accepttable a 
ON 
    u.sticker = a.sticker 
    AND u.device_id = a.device_id 
    AND s.id = a.schedule_id

  `;
  db.query(sql, (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json(results);
  });
});

app.get('/getStickerDevices/:userId/:sticker', (req, res) => {
  const { userId, sticker } = req.params;
  const sql = `
      SELECT 
          d.device_name,
          ds.round,
          ds.status
      FROM 
          devices d
      JOIN 
          device_status ds ON d.id = ds.device_id
      WHERE 
          d.user_id = ? AND d.sticker = ?
  `;

  db.query(sql, [userId, sticker], (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json(results);
  });
});

// server.js
app.get('/getUsers', (req, res) => {
  const sql = `
      SELECT u.user_id, r.name,r.surname FROM users u JOIN register r where u.user_id = r.id and r.urole = 'users'
  `;
  db.query(sql, (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json(results);
  });
});

// server.js //25/6/67
// app.get('/getUserInfo/:userId', (req, res) => {
//   const userId = req.params.userId;
//   const query = `
//      SELECT 
//     u.user_device_id,
//     u.user_id,
//     u.device_id,
//     a.submission_id,
//     u.sticker,
//     u.username,
//     u.durable,
//     u.device_name,
//     u.brand,
//     u.model,
//     u.serial_number,
//     s.round,
//     s.id AS schedule_id,
//     CASE 
//         WHEN a.sticker IS NOT NULL AND a.device_id IS NOT NULL AND a.schedule_id IS NOT NULL 
//         THEN 'ส่งแล้ว'
//         ELSE 'ยังไม่ส่ง'
//     END AS status,
//     a.status AS teststatus,
//     r.surname,
//     s.due_date,
//     a.submission_date
// FROM 
//     user_devices u
// JOIN 
//     schedules s 
//     ON u.device_id = s.device_id
// JOIN
//     register r
//     ON r.id = u.user_id
// LEFT JOIN 
//     accepttable a 
//     ON u.sticker = a.sticker 
//     AND u.device_id = a.device_id 
//     AND s.id = a.schedule_id

// WHERE 
//     u.user_id = ?; `
// ;

//   db.query(query, [userId], (err, results) => {
//       if (err) {
//           console.error('Error fetching user:', err);
//           res.status(500).send('Server error');
//           return;
//       }

//       if (results.length === 0) {
//           res.status(404).send('User not found');
//           return;
//       }

//       res.json(results);
//   });
// });


// Get user devices by sticker
app.get('/getUserDevicesByStickerAdmin/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
      SELECT ud.user_device_id, ud.device_id, ud.sticker, d.name AS device_name
      FROM user_devices ud
      JOIN devices d ON ud.device_id = d.id
      WHERE ud.user_id = ?
  `;

  db.query(sql, [userId], (error, results) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.json(results);
      }
  });
});

// server
app.get('/getStickerDetails/:userId/:sticker/:deviceId', async (req, res) => {
  const { userId, sticker, deviceId } = req.params;
  try {
      const sql = `
          SELECT u.user_device_id, u.user_id, u.device_id, a.submission_id, u.sticker, u.username, u.durable, u.device_name, u.brand, u.model, u.serial_number, s.round, s.id AS schedule_id, 
                 CASE WHEN a.sticker IS NOT NULL AND a.device_id IS NOT NULL AND a.schedule_id IS NOT NULL THEN 'ส่งแล้ว' ELSE 'ยังไม่ส่ง' END AS status, 
                 a.status AS teststatus, r.surname, s.due_date, a.submission_date ,a.test_report
          FROM user_devices u 
          JOIN schedules s ON u.device_id = s.device_id 
          JOIN register r ON r.id = u.user_id 
          LEFT JOIN accepttable a ON u.sticker = a.sticker AND u.device_id = a.device_id AND s.id = a.schedule_id 
          WHERE u.user_id = ? AND u.sticker = ? AND u.device_id = ?`;

      const results = await queryPromise(sql, [userId, sticker, deviceId]);

      console.log('Query results:', results); // Log the results to see their structure

      if (results.length > 0) {
          res.json(results); // Return all results
      } else {
          res.status(404).json({ error: 'No details found for the given parameters' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
  }
});


app.get('/getUserStickers/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT DISTINCT sticker,device_id,device_name,serial_number FROM user_devices WHERE user_id = ?';

  db.query(sql, [userId], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(results);
    }
  });
});


app.get('/getUserStickers/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT DISTINCT sticker FROM user_devices WHERE user_id = ?';

  db.query(sql, [userId], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(results);
    }
  });
});

app.get('/getDevicesBySticker/:sticker', (req, res) => {
  const { sticker } = req.params;
  const sql = 'SELECT DISTINCT device_id, device_name FROM user_devices WHERE sticker = ?';

  db.query(sql, [sticker], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(results);
    }
  });
});

app.get('/getSerialsByDevice/:deviceId/:userId/:sticker', (req, res) => {
  const { deviceId, userId, sticker } = req.params;
  const sql = 'SELECT serial_number FROM user_devices WHERE device_id = ? AND user_id = ? AND sticker = ?';

  db.query(sql, [deviceId, userId, sticker], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(results);
    }
  });
});



// Update submission
app.post('/update-submission', (req, res) => {
  const { id, status2, note, left_side, right_side } = req.body;

  const sql = `
    UPDATE submissions 
    SET 
      status = ?, 
      note = ?, 
      left_side = ?, 
      right_side = ? 
    WHERE id = ?`;

  db.query(sql, [status2, note, left_side, right_side, id], (err, results) => {
    if (err) {
      console.error('Error updating submission:', err);
      return res.status(500).json({ error: 'Failed to update submission' });
    }

    res.json({ success: true });
  });
});

// server
app.put('/update-submission-pending', (req, res) => {
  const { id, status2, note, left_side, right_side, submission_id, sticker, device_id, serial, schedule_id, test_report } = req.body;

  console.log('Schedule_id', schedule_id);
  console.log('Request body:', req.body);

  // Check for duplicates in pendingapprovals
  const checkDuplicatesSql = `
    SELECT * FROM pendingapprovals
    WHERE sticker = ? AND device_id = ? AND serial = ? AND schedule_id = ?
  `;
  const duplicateValues = [sticker, device_id, serial, schedule_id];

  db.query(checkDuplicatesSql, duplicateValues, (err, results) => {
    if (err) {
      console.error('Error checking for duplicates:', err);
      return res.status(500).json({ error: 'Failed to check for duplicates' });
    }

    if (results.length > 0) {
      // Block the update if duplicates are found
      return res.status(400).json({ error: 'Duplicate sticker, device ID, serial, or schedule ID found in pending approvals, or previous update not yet approved' });
    }

    // Update the submission in the submissions table
    const updateSubmissionSql = `
      UPDATE submissions
      SET status = ?, note = ?, left_side = ?, right_side = ?, test_report = ?
      WHERE id = ?
    `;
    const submissionValues = [status2, note, left_side, right_side, test_report, submission_id];

    db.query(updateSubmissionSql, submissionValues, (err, results) => {
      if (err) {
        console.error('Error updating submission:', err);
        return res.status(500).json({ error: 'Failed to update submission' });
      }

      // After updating the submission, insert the pending approval
      const insertPendingApprovalSql = `
        INSERT INTO pendingapprovals (submission_id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable)
        SELECT id, user_id, name, device_id, schedule_id, brand, model, serial, status, left_side, right_side, test_report, note, submission_date, device_name, round, sticker, durable
        FROM submissions
        WHERE id = ?
      `;

      db.query(insertPendingApprovalSql, [submission_id], (err, results) => {
        if (err) {
          console.error('Error inserting into pendingapprovals:', err);
          return res.status(500).json({ error: 'Failed to insert into pendingapprovals' });
        }

        // Update the submission status in the submissionstatus table
        const updateSubmissionStatusSql = `
          UPDATE submissionstatus
          SET status = 'ส่งแล้ว'
          WHERE submission_id = ?
        `;

        db.query(updateSubmissionStatusSql, [submission_id], (err, results) => {
          if (err) {
            console.error('Error updating submission status:', err);
            return res.status(500).json({ error: 'Failed to update submission status' });
              }
              

                // Fetch device name and round for notifyClients
          const fetchDetailsSql = `
          SELECT d.name AS deviceName, s.round AS round, ss.name As username
          FROM devices d
          JOIN schedules s
          JOIN submissions ss
          ON d.id = ? AND s.id = ? AND ss.id = ?
        `;
        db.query(fetchDetailsSql, [device_id, schedule_id,submission_id], (err, detailsResult) => {
          if (err) {
            console.error('Error fetching device and round details:', err);
            return res.status(500).json({ error: 'Failed to fetch details' });
          }

          if (detailsResult.length === 0) {
            return res.status(400).json({ error: 'Device or schedule not found' });
          }

          const { deviceName, round,username } = detailsResult[0];

          // Assuming notifyClients is correctly defined and available in your context
          const newSubmission = {
            update: {
              submission_id,
              name: req.body.name, // Make sure name is included in req.body
              deviceId: device_id,
              scheduleId: schedule_id,
              brand: req.body.brand, // Make sure brand is included in req.body
              model: req.body.model, // Make sure model is included in req.body
              serial,
              status: status2,
              leftSide: left_side,
              rightSide: right_side,
              testReport: test_report,
              note,
              submissionDate: new Date().toISOString(),
              deviceName, 
              round, 
              sticker,
              username,
              durable: req.body.durable // Make sure durable is included in req.body
            }
          };

          console.log(newSubmission);
          notifyClients(newSubmission);

          res.json({ success: true, message: 'คำขอแก้ไขข้อมูลของคุณถูกส่งเรียบร้อยแล้ว' });
        });
      });
    });
  });
});
});



app.get('/submission/:id', (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM submissions WHERE id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching submission:', err);
      return res.status(500).json({ error: 'Failed to fetch submission' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(results[0]);
  });
});


app.get('/getAcceptTable', (req, res) => {
  const sql = "SELECT * FROM accepttable";
  db.query(sql, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.json(result);
  });
});




// app.get('/user_devices/:userId', (req, res) => {
//   const userId = req.params.userId;
//   const sql = 'SELECT * FROM user_devices WHERE user_id = ?';
//   db.query(sql, [userId], (err, results) => {
//       if (err) {
//           console.error('Error fetching user devices:', err);
//           res.status(500).send('Server error');
//           return;
//       }
//       console.log(results); // ตรวจสอบค่าผลลัพธ์
//       res.status(200).json(results);
//   });
// });


// server.js or your server file
app.get('/user_devices/:userId', (req, res) => {
  const userId = req.params.userId;

  const userDevicesQuery = 'SELECT * FROM user_devices WHERE user_id = ?';
  const userRegisterQuery = 'SELECT * FROM register WHERE id = ?';

  db.query(userDevicesQuery, [userId], (err, userDevices) => {
      if (err) {
          console.error('Error fetching user devices:', err);
          res.status(500).send('Server error');
          return;
      }

      db.query(userRegisterQuery, [userId], (err, userRegister) => {
          if (err) {
              console.error('Error fetching user register:', err);
              res.status(500).send('Server error');
              return;
          }

          res.status(200).json({ userDevices, userRegister });
      });
  });
});
