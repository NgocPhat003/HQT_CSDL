const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Cho phép truy cập từ tất cả các nguồn (* hoặc bạn có thể chỉ định nguồn cụ thể)
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
  
var { conn } = require('./connect'); 
const { scheduleAppointment } = require('./patient');

app.post('/getAllPatientsInfo', async function(req, res){
  const pool = await conn;
  const sqlString = "SELECT * FROM Patient";
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const patients = result.recordset;
    if (patients) {
      res.status(200).json(patients); 
    } else {
      res.status(404).json({ message: 'Không có thông tin bệnh nhân' }); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin bệnh nhân:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin bệnh nhân' });
  }
});

app.post('/getPatientInfo', async function(req, res) {
  const {patientPhoneNumber}  = req.body;
  const pool = await conn;
  const sqlString = 
  `SELECT * FROM Patient  WHERE patientPhoneNumber = '${patientPhoneNumber}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const patient = result.recordset[0];
    console.log(patient);
    if (patient) {
      res.status(200).json(patient); 
    } else {
      res.status(404).json({ message: 'Không tìm thấy thông tin bệnh nhân' }); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin bệnh nhân:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin bệnh nhân' });
  }        
});
  
app.post('/updatePatientInfo', async function(req, res){
  const { enterPatientPhoneNumber, patientFullName, updatePatientPhoneNumber,  patientPassword, patientDateOfBirth, patientAddress } = req.body;
  const pool = await conn;
  // console.log(enterPatientPhoneNumber, patientFullName, updatePatientPhoneNumber,  patientPassword, patientDateOfBirth, patientAddress);
  const sqlString = `
  UPDATE Patient 
  SET patientFullName = '${patientFullName}',
      patientPhoneNumber = '${updatePatientPhoneNumber}',
      patientPassword = '${patientPassword}',
      patientDateOfBirth = '${patientDateOfBirth}',
      patientAddress = '${patientAddress}'                         
  WHERE patientPhoneNumber = '${enterPatientPhoneNumber}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    console.log(result.rowsAffected[0]);
      if (result.rowsAffected[0] === 1) {
        res.status(200).json({ message: 'Thông tin bệnh nhân đã được cập nhật.' });
      } else if (result.rowsAffected[0] === 0) {
        res.status(404).json({ message: 'Không tìm thấy bệnh nhân cần cập nhật' });
      } else {
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật thông tin bệnh nhân' });
      }
  } catch (error) {
    console.error('SĐT bệnh nhân đã tồn tại', error);
    res.status(500).json({ message: 'SĐT bệnh nhân đã tồn tại' });
  };
});

app.post('/addPatientInfo', async function(req, res){
  const { patientFullName, patientPhoneNumber,  patientPassword, patientDateOfBirth, patientAddress } = req.body;
  const pool = await conn;
  const sqlString = `
  INSERT INTO Account (username, password, accountType)
  VALUES ('${patientPhoneNumber}', '${patientPassword}', 'Patient') 

  INSERT INTO Patient (patientFullName, patientPhoneNumber,  patientPassword, patientDateOfBirth, patientAddress)
  VALUES ('${patientFullName}', '${patientPhoneNumber}', '${patientPassword}', '${patientDateOfBirth}', '${patientAddress}')`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: 'Thông tin bệnh nhân đã được thêm.' });
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi thêm thông tin bệnh nhân' });
    }
  } catch (error) {
    console.error('SĐT bệnh nhân đã tồn tại', error);
    res.status(500).json({ message: 'SĐT bệnh nhân đã tồn tại' });
  }
});

app.delete('/deletePatientInfo/:patientPhoneNumber', async function(req, res){
  const patientPhoneNumber  = req.params.patientPhoneNumber;
  const pool = await conn;
  const sqlString = `
  DELETE FROM Account WHERE username = '${patientPhoneNumber}'
  DELETE FROM Patient WHERE patientPhoneNumber = '${patientPhoneNumber}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] === 1) {
      res.status(200).json({ message: 'Thông tin bệnh nhân đã được xóa.' });  
    } else {
      res.status(500).json({ message: 'Bệnh nhân không tồn tại.' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa thông tin bệnh nhân:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi xóa thông tin bệnh nhân' });
  }
  
});

app.post('/getAllStaffsInfo', async function(req, res){
  const pool = await conn;
  const sqlString = "SELECT * FROM Staff";
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const staffs = result.recordset;
    if (staffs) {
      res.status(200).json(staffs); 
    } else {
      res.status(404).json({ message: 'Không có thông tin nhân viên' }); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin nhân viên', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin nhân viên' });
  }
});

app.post('/getStaffInfo', async function(req, res) {
  const {staffUserName}  = req.body;
  const pool = await conn;
  const sqlString = 
  `SELECT * FROM Staff  WHERE staffUserName = '${staffUserName}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const staff = result.recordset[0];
    if (staff) {
      res.status(200).json(staff); 
    } else {
      res.status(404).json({ message: 'Không tìm thấy thông tin nhân viên' }); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin nhân viên', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin nhân viên' });
  }        
});
  
app.post('/updateStaffInfo', async function(req, res){
  const { enterStaffUserName, staffFullName, updateStaffUserName,  staffPassword} = req.body;
  const pool = await conn;
  const sqlString = `
  UPDATE Staff 
  SET staffFullName = '${staffFullName}',
      staffUserName = '${updateStaffUserName}',
      staffPassword = '${staffPassword}'                         
  WHERE staffUserName = '${enterStaffUserName}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
      if (result.rowsAffected[0] === 1) {
        res.status(200).json({ message: 'Thông tin nhân viên đã được cập nhật.' });
      } else if (result.rowsAffected[0] === 0) {
        res.status(404).json({ message: 'Không tìm thấy nhân viên cần cập nhật' });
      } else {
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật thông tin nhân viên' });
      }
  } catch (error) {
    console.error('Username nhân viên đã tồn tại', error);
    res.status(500).json({ message: 'Username nhân viên đã tồn tại' });
  };
});

app.post('/addStaffInfo', async function(req, res){
  const { staffFullName, staffUserName,  staffPassword} = req.body;
  const pool = await conn;
  const sqlString = `
  INSERT INTO Account (username, password, accountType)
  VALUES ('${staffUserName}', '${staffPassword}', 'Staff') 

  INSERT INTO Staff (staffFullName, staffUserName,  staffPassword)
  VALUES ('${staffFullName}', '${staffUserName}', '${staffPassword}')`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: 'Thông tin nhân viên đã được thêm.' });
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi thêm thông tin nhân viên' });
    }
  } catch (error) {
    console.error('Username nhân viên đã tồn tại', error);
    res.status(500).json({ message: 'Username nhân viên đã tồn tại' });
  }
});

app.delete('/deleteStaffInfo/:staffUserName', async function(req, res){
  const staffUserName  = req.params.staffUserName;
  const pool = await conn;
  const sqlString = `
  DELETE FROM Account WHERE username = '${staffUserName}'
  DELETE FROM Staff WHERE staffUserName = '${staffUserName}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] === 1) {
      res.status(200).json({ message: 'Thông tin nhân viên đã được xóa.' });  
    } else {
      res.status(500).json({ message: 'Nhân viên không tồn tại.' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa thông tin nhân viên', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi xóa thông tin nhân viên' });
  }
  
});

app.post('/getAllDentistsInfo', async function(req, res){
  const pool = await conn;
  const sqlString = "SELECT * FROM Dentist";
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const dentists = result.recordset;
    if (dentists) {
      res.status(200).json(dentists); 
    } else {
      res.status(404).json({ message: 'Không có thông tin nha sĩ' }); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin nha sĩ', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin nha sĩ' });
  }
});

app.post('/getDentistInfo', async function(req, res) {
  const {dentistUserName}  = req.body;
  const pool = await conn;
  const sqlString = 
  `SELECT * FROM Dentist  WHERE dentistUserName = '${dentistUserName}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const dentist = result.recordset[0];
    if (dentist) {
      res.status(200).json(dentist); 
    } else {
      res.status(404).json({ message: 'Không tìm thấy thông tin nha sĩ' }); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin nha sĩ', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin nha sĩ' });
  }        
});
  
app.post('/updateDentistInfo', async function(req, res){
  const { enterDentistUserName, dentistFullName, updateDentistUserName,  dentistPassword} = req.body;
  const pool = await conn;
  const sqlString = `
  UPDATE Dentist 
  SET dentistFullName = '${dentistFullName}',
      dentistUserName = '${updateDentistUserName}',
      dentistPassword = '${dentistPassword}'                         
  WHERE dentistUserName = '${enterDentistUserName}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
      if (result.rowsAffected[0] === 1) {
        res.status(200).json({ message: 'Thông tin nha sĩ đã được cập nhật' });
      } else if (result.rowsAffected[0] === 0) {
        res.status(404).json({ message: 'Không tìm thấy nha sĩ cần cập nhật' });
      } else {
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật thông tin nha sĩ' });
      }
  } catch (error) {
    console.error('Username nha sĩ đã tồn tại', error);
    res.status(500).json({ message: 'Username nha sĩ đã tồn tại' });
  };
});

app.post('/addDentistInfo', async function(req, res){
  const { dentistFullName, dentistUserName,  dentistPassword} = req.body;
  const pool = await conn;
  const sqlString = `
  INSERT INTO Account (username, password, accountType)
  VALUES ('${dentistUserName}', '${dentistPassword}', 'Dentist') 

  INSERT INTO Dentist (dentistFullName, dentistUserName,  dentistPassword)
  VALUES ('${dentistFullName}', '${dentistUserName}', '${dentistPassword}')`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: 'Thông tin nha sĩ đã được thêm' });
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi thêm thông tin nha sĩ' });
    }
  } catch (error) {
    console.error('Username nha sĩ đã tồn tại', error);
    res.status(500).json({ message: 'Username nha sĩ đã tồn tại' });
  }
});

app.delete('/deleteDentistInfo/:dentistUserName', async function(req, res){
  const dentistUserName  = req.params.dentistUserName;
  const pool = await conn;
  const sqlString = `
  DELETE FROM Account WHERE username = '${dentistUserName}'
  DELETE FROM Dentist WHERE dentistUserName = '${dentistUserName}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] === 1) {
      res.status(200).json({ message: 'Thông tin nha sĩ đã được xóa' });  
    } else {
      res.status(500).json({ message: 'Nha sĩ không tồn tại' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa thông tin nha sĩ', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi xóa thông tin nha sĩ' });
  }
});

app.post('/getAllDrugsInfo', async function(req, res){
  const pool = await conn;
  const sqlString = "SELECT * FROM Drug";
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const drugs = result.recordset;
    if (drugs) {
      res.status(200).json(drugs); 
    } else {
      res.status(404).json({ message: 'Không có thông tin thuốc' }); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin thuốc', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin thuốc' });
  }
});

app.post('/getDrugInfo', async function(req, res) {
  const {drugId}  = req.body;
  const pool = await conn;
  const sqlString = 
  `SELECT * FROM Drug  WHERE drugId = '${drugId}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const drug = result.recordset[0];
    if (drug) {
      res.status(200).json(drug); 
    } else {
      res.status(404).json({ message: 'Không tìm thấy thông tin thuốc' }); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin thuốc', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin thuốc' });
  }        
});

app.post('/updateDrugInfo', async function(req, res){
  const { enterDrugId, drugName, unit, indication, expiredDate, price} = req.body;
  const pool = await conn;
  const sqlString = `
  UPDATE Drug 
  SET drugName = '${drugName}',
      unit = '${unit}',
      indication = '${indication}',
      expiredDate = '${expiredDate}',
      price = '${price}'         
  WHERE drugId = '${enterDrugId}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
      if (result.rowsAffected[0] === 1) {
        res.status(200).json({ message: 'Thông tin thuốc đã được cập nhật' });
      } else if (result.rowsAffected[0] === 0) {
        res.status(404).json({ message: 'Không tìm thấy thuốc cần cập nhật' });
      } else {
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật thông tin thuốc' });
      }
  } catch (error) {
    console.error('Id thuốc đã tồn tại', error);
    res.status(500).json({ message: 'Id thuốc đã tồn tại' });
  };
});

app.post('/updateStockNumber', async function(req, res){
  const { drugId, stockNumber} = req.body;
  const stockNumberInt = parseInt(stockNumber);
  const pool = await conn;
  const sqlString = `
  UPDATE Drug 
  SET stockNumber = ${stockNumberInt}     
  WHERE drugId = '${drugId}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
      if (result.rowsAffected[0] === 1) {
        res.status(200).json({ message: 'Thông tin thuốc đã được cập nhật' });
      } else if (result.rowsAffected[0] === 0) {
        res.status(404).json({ message: 'Không tìm thấy thuốc cần cập nhật' });
      } else {
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật thông tin thuốc' });
      }
  } catch (error) {
    console.error('Id thuốc đã tồn tại hoặc số lượng tồn kho không hợp lệ', error);
    res.status(500).json({ message: 'Id thuốc đã tồn tại hoặc số lượng tồn kho không hợp lệ' });
  };
});

app.post('/addDrugInfo', async function(req, res){
  const { drugName, unit, indication, expiredDate, stockNumber, price} = req.body;
  const stockNumberInt = parseInt(stockNumber);
  const priceInt = parseInt(price);
  const pool = await conn;
  const sqlString = `
  INSERT INTO Drug (drugName, unit, indication, expiredDate, stockNumber, price)
  VALUES ('${drugName}', '${unit}', '${indication}', '${expiredDate}', ${stockNumberInt}, ${priceInt} )`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: 'Thông tin thuốc đã được thêm' });
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi thêm thông tin thuốc' });
    }
  } catch (error) {
    console.error('Số lượng tồn kho không hợp lệ', error);
    res.status(500).json({ message: 'Số lượng tồn kho không hợp lệ' });
  }
});

app.delete('/deleteDrugInfo/:drugId', async function(req, res){
  const drugId  = req.params.drugId;
  const pool = await conn;
  const sqlString = `DELETE FROM Drug WHERE drugId = '${drugId}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] === 1) {
      res.status(200).json({ message: 'Thông tin thuốc đã được xóa' });  
    } else {
      res.status(500).json({ message: 'Thuốc không tồn tại' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa thông tin thuốc', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi xóa thông tin thuốc' });
  }
});

app.delete('/deleteExpiredDrugs', async function(req, res){
  const today = new Date();
  const currentDate = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
  console.log(currentDate);
  const pool = await conn; 
  const sqlString = `DELETE FROM Drug WHERE expiredDate < '${currentDate}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: 'Thông tin thuốc hết hạn đã được xóa' });  
    } else {
      res.status(404).json({ message: 'Không có thuốc hết hạn vào hôm nay' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa thuốc hết hạn', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi xóa thuốc hạn' });
  }
});

app.post('/Login', async function(req, res) {
  const { username, password } = req.body;
  const pool = await conn;
  const sqlString = 
  `SELECT accountType FROM Account WHERE username = '${username}' AND password = '${password}'`;
  
  if (password !== ' ') {
    try {
      const request = pool.request();
      const result = await request.query(sqlString);
      if (result.recordset[0]) {
        if (result.recordset[0].accountType === 'Admin') {
            res.status(200).json('Admin');
        } else if ( result.recordset[0].accountType === 'Staff') {
            res.status(200).json('Staff');
        } else if (result.recordset[0].accountType === 'Dentist') {
            res.status(200).json('Dentist');
        } else if (result.recordset[0].accountType === 'Patient') {
          res.status(200).json('Patient');
        }
      } else {
          res.status(404).json({message: 'Thông tin đăng nhập không chính xác'});
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi kiểm tra đăng nhập', error);
      res.status(500).json({ message: 'Có lỗi xảy ra khi kiểm tra đăng nhập' });
    }
  } else {
    res.status(404).json({message: 'Thông tin đăng nhập không chính xác'});
  }
});

app.post('/patientRegister', async function(req, res) {
  const { patientFullName, patientPhoneNumber,  patientPassword, patientDateOfBirth, patientAddress } = req.body;
  const pool = await conn;
  const sqlString_Check_Patient_Account = `
  SELECT username, password
  FROM Account
  WHERE username = '${patientPhoneNumber}'`;
  try { 
    const request1 = pool.request();
    const result1 = await request1.query(sqlString_Check_Patient_Account);
    const patient = result1.recordset[0];
    // const password = result1.recordset[0].password
    // nếu tồn tại sđt
    if (patient) {
      // nếu có password
      console.log('pass' + patient.password + ',');
      if (patient.password !== ' ') {
        res.status(500).json({ message: 'SĐT bệnh nhân đã tồn tại, vui lòng nhập lại' });
      }
      // nếu ko có password 
      else {
        const sqlString_Update_Info = `
        UPDATE Account 
        SET password = '${patientPassword}'
        WHERE username = '${patientPhoneNumber}'

        UPDATE Patient
        SET patientFullName = '${patientFullName}',
        patientPassword = '${patientPassword}',
        patientDateOfBirth = '${patientDateOfBirth}',
        patientAddress = '${patientAddress}'
        WHERE patientPhoneNumber = '${patientPhoneNumber}'`;
        try {
          const request2 = pool.request();
          const result2 = await request2.query(sqlString_Update_Info);
          if (result2.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Đăng kí thành công, mời bạn đăng nhập!' });
          } else {
            res.status(500).json({ message: 'Có lỗi xảy ra' });
          }
        } catch (error) {
          console.error('Có lỗi xảy ra', error);
          res.status(500).json({ message: 'Có lỗi xảy ra' });
        }
      }
    // nếu không tồn tại sđt, đăng kí mới
    } else {
      const sqlString_Add_Info = `
      INSERT INTO Account (username, password, accountType)
      VALUES ('${patientPhoneNumber}', '${patientPassword}', 'Patient')

      INSERT INTO Patient (patientFullName, patientPhoneNumber,  patientPassword, patientDateOfBirth, patientAddress)
      VALUES ('${patientFullName}', '${patientPhoneNumber}', '${patientPassword}', '${patientDateOfBirth}', '${patientAddress}')`;
      try {
        const request = pool.request();
        const result = await request.query(sqlString_Add_Info);
        if (result.rowsAffected[0] > 0) {
          res.status(200).json({ message: 'Thông tin bệnh nhân đã được thêm.' });
        } else {
          res.status(500).json({ message: 'Có lỗi xảy ra khi đăng kí' });
        }
      } catch (error) {
        console.error('Có lỗi xảy ra khi đăng kí', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi đăng kí' });
      }
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi đăng kí', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi đăng kí' });
  }       
});

app.post('/displayAvailableDentist', async function(req, res) {
  const {appointmentDate, appointmentTime} = req.body;
  const pool = await conn;
  const sqlString = ` SELECT d.dentistUserName, d.dentistFullName
                      FROM Dentist d JOIN workSchedule ws ON d.dentistUserName = ws.dentistUserName
                      WHERE ws.workingDate = '${appointmentDate}'
                      AND ws.startTime <= '${appointmentTime}' 
                      AND ws.endTime > '${appointmentTime}'
                      AND ws.busyStatus = 'Free' `;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const dentists = result.recordset;
    if (result.rowsAffected[0] > 0) {
      res.status(200).json(dentists); 
    } else {
      res.status(404).json({message: 'Không tìm thấy bác sĩ phù hợp'}); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin bác sĩ', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin bác sĩ' });
  }        
});

app.post('/scheduleAppointment', async function (req, res) {
  const { patientPhoneNumber, appointmentDate, appointmentTime, dentistUserName} = req.body;
  const pool = await conn;
  const sqlString_Check_Exist_Schedule = `
  SELECT sa.appointmentId, sa.patientPhoneNumber, sa.appointmentDate, sa.appointmentTime, d.dentistFullName
  FROM scheduleAppointment sa
  JOIN workSchedule ws ON ws.workingDate = sa.appointmentDate
  JOIN Dentist d ON d.dentistUserName = sa.dentistUserName
  WHERE sa.patientPhoneNumber = '${patientPhoneNumber}'
  AND workingDate = '${appointmentDate}'
  AND startTime <= '${appointmentTime}'
  AND endTime > '${appointmentTime}'
  AND busyStatus = 'Busy'`;
  try {
    const request1 = pool.request();
    const result1 = await request1.query(sqlString_Check_Exist_Schedule);
    const appointment = result1.recordset[0];
    // nếu đã có lịch hẹn trong khung giờ này
    if (appointment) {
      res.status(401).json(appointment);
    } 
    //nếu chưa có lịch hẹn
    else {
      const sqlString_Add_Appointment = `
      INSERT INTO scheduleAppointment (patientPhoneNumber, appointmentDate, appointmentTime, dentistUserName)
      VALUES ('${patientPhoneNumber}', '${appointmentDate}', '${appointmentTime}', '${dentistUserName}')

      UPDATE workSchedule
      SET busyStatus = 'Busy'                       
      WHERE dentistUserName = '${dentistUserName}' 
      AND workingDate = '${appointmentDate}'
      AND startTime <= '${appointmentTime}'
      AND endTime > '${appointmentTime}'`;

      try {
        const request2 = pool.request();
        const result2 = await request2.query(sqlString_Add_Appointment);
        if (result2.rowsAffected[0] > 0) {
          res.status(200).json({ message: 'Thêm lịch hẹn thành công' });
        } else {
          res.status(500).json({ message: 'Thêm lịch hẹn không thành công, vui lòng kiểm tra lại thông tin' });
        }
      } catch (error) {
        console.error('Có lỗi xảy ra khi thêm lịch hẹn', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi thêm lịch hẹn' });
      }
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm lịch hẹn', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi thêm lịch hẹn' });
  }
});

app.post('/searchService', async function(req, res){
  const {serviceName} = req.body;
  const pool = await conn;
  const sqlString = `SELECT serviceId, serviceName FROM Service WHERE serviceName like '%${serviceName}%'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const service = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(service); 
    } else {
      res.status(404).json({ message: 'Không có thông tin dịch vụ' }); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin dịch vụ', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin dịch vụ' });
  }
});

app.post('/searchDrug', async function(req, res){
  const {drugName} = req.body;
  const pool = await conn;
  const sqlString = `SELECT drugId, drugName, stockNumber FROM Drug WHERE drugName = '${drugName}' AND stockNumber > 0`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const drug = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(drug); 
    } else {
      res.status(404).json({ message: 'Không có thông tin thuốc hoặc hết hàng' }); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin thuốc', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin thuốc' });
  }
});

app.post('/getServicePrice', async function(req, res){
  const {serviceId} = req.body;
  const pool = await conn;
  const sqlString = `SELECT price FROM Service WHERE serviceId = '${serviceId}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const servicePrice = result.recordset[0].price;
    if (servicePrice) {
      res.status(200).json(servicePrice); 
    } else {
      res.status(404).json({ message: 'Không có thông tin giá dịch vụ' }); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy giá dịch vụ', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy giá dịch vụ' });
  }
});

app.post('/getDrugPrice', async function(req, res){
  const {drugId} = req.body;
  const pool = await conn;
  const sqlString = `SELECT price FROM Drug WHERE drugId = '${drugId}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const drugPrice = result.recordset[0].price;
    if (drugPrice) {
      res.status(200).json(drugPrice); 
    } else {
      res.status(404).json({ message: 'Không có thông tin giá thuốc' }); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy giá thuốc', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy giá thuốc' });
  }
});

app.post('/addPatientMedicalRecord', async function(req, res) {
  const {patientPhoneNumber, examinationDate, examinationTime, servicesId, drugsId, drugsQuantity, totalPrice } = req.body;
  const totalPriceInt = parseInt(totalPrice);
  const pool = await conn;
  const sqlString1 = `
  INSERT INTO patientMedicalRecords (patientPhoneNumber, examinationDate, examinationTime)
  VALUES ('${patientPhoneNumber}', '${examinationDate}', '${examinationTime}')

  SELECT medicalRecordId 
  FROM patientMedicalRecords 
  WHERE patientPhoneNumber = '${patientPhoneNumber}' 
  AND examinationDate = '${examinationDate}' 
  AND examinationTime = '${examinationTime}'`;
  try {
    const request1 = pool.request();
    const result1 = await request1.query(sqlString1);
    const medicalRecordId = result1.recordset[0].medicalRecordId;
    console.log(medicalRecordId);
    if (medicalRecordId) {
      const sqlString2 = `
      INSERT INTO Receipt (medicalRecordId, totalPrice, paymentStatus)
      VALUES (${medicalRecordId}, ${totalPriceInt}, 'Unpaid')`;
      const request2 = pool.request();
      const result2 = await request2.query(sqlString2);
      for (let i = 0; i < servicesId.length; i++) {
        const serviceId = parseInt(servicesId[i]);
        const sqlString = `
        INSERT INTO patientServices (medicalRecordId, serviceId) 
        VALUES (${medicalRecordId}, ${serviceId})`;
        try {
          const request = pool.request();
          const result = await request.query(sqlString);
        } catch (error) {
          console.error('Có lỗi xảy ra khi thêm hồ sơ', error);
          res.status(500).json({ message: 'Có lỗi xảy ra khi thêm hồ sơ' });
        }
      }
      for (let i = 0; i < drugsId.length; i++) {
        const drugId = parseInt(drugsId[i]);
        const drugQuantity = parseInt(drugsQuantity[i]);
        const sqlString = `
        INSERT INTO patientDrugs (medicalRecordId, drugId, quantity) 
        VALUES (${medicalRecordId}, ${drugId}, ${drugQuantity})
        
        UPDATE Drug
        SET stockNumber = stockNumber - ${drugQuantity}
        WHERE drugId = ${drugId}
        `;
        try {
          const request = pool.request();
          const result = await request.query(sqlString);
        } catch (error) {
          console.error('Có lỗi xảy ra khi thêm hồ sơ', error);
          res.status(500).json({ message: 'Có lỗi xảy ra khi thêm hồ sơ' });
        }
      }
      res.status(200).json({ message: 'Thông tin hồ sơ bệnh nhân đã được thêm' });
        
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi thêm hồ sơ' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm hồ sơ', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi thêm hồ sơ' });
  }
});

app.post('/checkAppointmentsListByDate', async function(req, res){
  const { dentistUserName, selectedDate} = req.body;
  const pool = await conn;
  const sqlString = `
  SELECT sa.appointmentId, sa.patientPhoneNumber, sa.appointmentDate, sa.appointmentTime, d.dentistFullName
  FROM scheduleAppointment sa 
  JOIN Dentist d ON sa.dentistUserName = d.dentistUserName
  WHERE sa.dentistUserName = '${dentistUserName}' and sa.appointmentDate = '${selectedDate}'`;

  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    appointment = result.recordset;
    if (result.rowsAffected[0] > 0) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ message: 'Không có lịch hẹn trong ngày' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi kiểm tra lịch hẹn', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi kiểm tra lịch hẹn' });
  }
});

app.post('/addMedicalRegisterForm', async function (req, res) {
  const { patientFullName, medicalPatientPhoneNumber, patientDateOfBirth, patientAddress, appointmentDate, appointmentTime, dentistUserName} = req.body;
  const pool = await conn;
  const sqlString_Check_Patient_Account = `
  SELECT patientPhoneNumber 
  FROM Patient 
  WHERE patientPhoneNumber = '${medicalPatientPhoneNumber}'`;
  try {
    const request1 = pool.request();
    const result1 = await request1.query(sqlString_Check_Patient_Account);
    const patient = result1.recordset[0];
    if (!patient)
    {
      const sqlString_Add_and_Update_Info = `
      INSERT Account (username, password, accountType)
      VALUES ('${medicalPatientPhoneNumber}', ' ', 'Patient')

      INSERT INTO Patient (patientFullName, patientPhoneNumber, patientPassword, patientDateOfBirth, patientAddress)
      VALUES ('${patientFullName}', '${medicalPatientPhoneNumber}', ' ', '${patientDateOfBirth}', '${patientAddress}')
    
      INSERT INTO scheduleAppointment (patientPhoneNumber, appointmentDate, appointmentTime, dentistUserName)
      VALUES ('${medicalPatientPhoneNumber}', '${appointmentDate}', '${appointmentTime}', '${dentistUserName}')
      
      UPDATE workSchedule
      SET busyStatus = 'Busy'                       
      WHERE dentistUserName = '${dentistUserName}' 
      AND workingDate = '${appointmentDate}'
      AND startTime <= '${appointmentTime}'
      AND endTime > '${appointmentTime}'`;
      try {
        const request2 = pool.request();
        const result2 = await request2.query(sqlString_Add_and_Update_Info);
        if (result2.rowsAffected[0] > 0) {
          res.status(200).json({ message: 'Đăng kí khám bệnh thành công' });
        } else {
          res.status(500).json({ message: 'Đăng kí khám bệnh không thành công, vui lòng kiểm tra lại thông tin' });
        }
      } catch (error) {
        console.error('Có lỗi xảy ra khi đăng kí khám bệnh', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi đăng kí khám bệnh' });
      }
    } else {
      const sqlString_Check_Exist_Schedule = `
      SELECT sa.appointmentId, sa.patientPhoneNumber, sa.appointmentDate, sa.appointmentTime, d.dentistFullName
      FROM scheduleAppointment sa
      JOIN workSchedule ws ON ws.workingDate = sa.appointmentDate
      JOIN Dentist d ON d.dentistUserName = sa.dentistUserName
      WHERE sa.patientPhoneNumber = '${medicalPatientPhoneNumber}'
      AND workingDate = '${appointmentDate}'
      AND startTime <= '${appointmentTime}'
      AND endTime > '${appointmentTime}'
      AND busyStatus = 'Busy'`;
      try {
        const request1 = pool.request();
        const result1 = await request1.query(sqlString_Check_Exist_Schedule);
        const appointment = result1.recordset[0];
        // nếu đã có lịch hẹn trong khung giờ này
        if (appointment) {
          res.status(401).json(appointment);
        } 
        //nếu chưa có lịch hẹn
        else {
          const sqlString_Add_Appointment = `
          INSERT INTO scheduleAppointment (patientPhoneNumber, appointmentDate, appointmentTime, dentistUserName)
          VALUES ('${medicalPatientPhoneNumber}', '${appointmentDate}', '${appointmentTime}', '${dentistUserName}')

          UPDATE workSchedule
          SET busyStatus = 'Busy'                       
          WHERE dentistUserName = '${dentistUserName}' 
          AND workingDate = '${appointmentDate}'
          AND startTime <= '${appointmentTime}'
          AND endTime > '${appointmentTime}'`;

          try {
            const request2 = pool.request();
            const result2 = await request2.query(sqlString_Add_Appointment);
            if (result2.rowsAffected[0] > 0) {
              res.status(200).json({ message: 'Đăng kí khám bệnh thành công' });
            } else {
              res.status(500).json({ message: 'Đăng kí khám bệnh không thành công, vui lòng kiểm tra lại thông tin' });
            }
          } catch (error) {
            console.error('Có lỗi xảy ra khi đăng kí khám bệnh', error);
            res.status(500).json({ message: 'Có lỗi xảy ra khi đăng kí khám bệnh' });
          }
        }
      } catch (error) {
        console.error('Có lỗi xảy ra đăng kí khám bệnh', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi đăng kí khám bệnh' });
      }
    }
  } catch (error) {
    console.error('Có lỗi xảy ra đăng kí khám bệnh', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi đăng kí khám bệnh' });
  }
});

// app.post('/getUnpaidReceiptInfo', async function(req, res) {
//   const {patientPhoneNumber, }  = req.body;
//   const pool = await conn;
  
//   const sqlString1 = `
//   SELECT p.patientPhoneNumber, r.date, r.time, dt.dentistFullName, r.totalPrice, r.paymentStatus
//   FROM Patient p 
//   JOIN scheduleAppointment sa ON p.patientPhoneNumber = sa.patientPhoneNumber
//   JOIN Dentist dt ON sa.dentistUserName = dt.dentistUserName
//   JOIN patientMedicalRecords mr ON mr.patientPhoneNumber = p.patientPhoneNumber
//   JOIN Receipt r ON p.patientPhoneNumber = r.patientPhoneNumber 
//   WHERE p.patientPhoneNumber = '${patientPhoneNumber}'
//   AND sa.appointmentDate = mr.examinationDate 
//   AND mr.examinationDate = r.date
//   AND mr.examinationTime = r.time
//   AND r.paymentStatus = 'Unpaid'`;

//   const sqlString2 = `
//   SELECT p.patientPhoneNumber, ps.examinationDate, ps.examinationTime, ps.serviceId
//   FROM Patient p  JOIN patientServices ps ON p.patientPhoneNumber = ps.patientPhoneNumber
//   WHERE p.patientPhoneNumber  = '${patientPhoneNumber}'`;
  
//   const sqlString3 = `
//   SELECT p.patientPhoneNumber , pd.examinationDate, pd.examinationTime, drugId, pd.quantity
//   FROM Patient p  JOIN patientDrugs pd ON p.patientPhoneNumber = pd.patientPhoneNumber`;

//   try {
//     const request = pool.request();
//     const result = await request.query(sqlString1);
//     const receipt = result.recordset[0];
//     console.log(receipt);
//     if (receipt)
//       const request2 = pool.request();
//       const result2 = await request2.query(sqlString2);
//       const receipt2 = result2.recordset[0];
      
        
//         res.status(200).json(patient); 
//       } else {
//         res.status(404).json({ message: 'Không tìm thấy thông tin bệnh nhân' }); 
//       }
//   } catch (error) {
//     console.error('Có lỗi xảy ra khi lấy thông tin bệnh nhân:', error);
//     res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin bệnh nhân' });
//   }        
// });

app.post('/getAllAppointmentsInfo', async function(req, res){
  const {patientPhoneNumber} = req.body;
  const pool = await conn;
  const sqlString = `
  SELECT sa.appointmentId, sa.patientPhoneNumber, sa.appointmentDate, sa.appointmentTime, d.dentistFullName
  FROM scheduleAppointment sa JOIN Dentist d ON sa.dentistUserName = d.dentistUserName
  WHERE sa.patientPhoneNumber = '${patientPhoneNumber}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const appointments = result.recordset;
    console.log(appointments);
    if (result.recordset[0]) {
      res.status(200).json(appointments); 
    } else {
      res.status(404).json({ message: 'Không có thông tin lịch hẹn' }); 
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin lịch hẹn:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin lịch hẹn' });
  }
});

app.listen(3000, function(){
    console.log("server listen at port 3000");
});