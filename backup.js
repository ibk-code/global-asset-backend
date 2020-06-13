const fs = require('fs');
const _ = require('lodash');
const exec = require('child_process').exec;
const path = require('path');

// Concatenate root directory path with our backup folder.

const command = `mongodump --forceTableScan --host global-asset-shard-0/global-asset-shard-00-00-uovhy.mongodb.net:27017,global-asset-shard-00-01-uovhy.mongodb.net:27017,global-asset-shard-00-02-uovhy.mongodb.net:27017 --ssl --username global-asset --password globalasset@2020 --authenticationDatabase admin --db global-asset`

exports.backUp =() => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
}

// const backupDirPath = path.join(__dirname, 'backup');

// const dbOptions = {
//     user: 'global-asset',
//     pass: 'globalasset@2020',
//     host: 'mongodb+srv://global-asset-uovhy.mongodb.net/global-asset?retryWrites=true&w=majority',
//     port: 27017,
//     database: 'global-asset',
//     autoBackup: true, 
//     removeOldBackup: true,
//     keepLastDaysBackup: 2,
//     autoBackupPath: './backup' // i.e. /var/database-backup/
// };

// // return stringDate as a date object.
// exports.stringToDate = dateString => {
//   return new Date(dateString);
// };

// // Check if variable is empty or not.
// exports.empty = mixedVar => {
//   let undef, key, i, len;
//   const emptyValues = [undef, null, false, 0, '', '0'];
//   for (i = 0, len = emptyValues.length; i < len; i++) {
//     if (mixedVar === emptyValues[i]) {
//       return true;
//     }
//   }
//   if (typeof mixedVar === 'object') {
//     for (key in mixedVar) {
//       return false;
//     }
//     return true;
//   }
//   return false;
// };

// // Auto backup function
// exports.dbAutoBackUp = () => {
//   // check for auto backup is enabled or disabled
//   if (dbOptions.autoBackup == true) {
//     let date = new Date();
//     let beforeDate, oldBackupDir, oldBackupPath;

//     // Current date
//     currentDate = this.stringToDate(date);
//     let newBackupDir =
//       currentDate.getFullYear() +
//       '-' +
//       (currentDate.getMonth() + 1) +
//       '-' +
//       currentDate.getDate();

//     // New backup path for current backup process
//     let newBackupPath = dbOptions.autoBackupPath + '-mongodump-' + newBackupDir;
//     // check for remove old backup after keeping # of days given in configuration
//     if (dbOptions.removeOldBackup == true) {
//       beforeDate = _.clone(currentDate);
//       // Substract number of days to keep backup and remove old backup
//       beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup);
//       oldBackupDir =
//         beforeDate.getFullYear() +
//         '-' +
//         (beforeDate.getMonth() + 1) +
//         '-' +
//         beforeDate.getDate();
//       // old backup(after keeping # of days)
//       oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir;
//     }

//     // Command for mongodb dump process
//     let cmd =
//       'mongodump --host ' +
//       dbOptions.host +
//       ' --port ' +
//       dbOptions.port +
//       ' --db ' +
//       dbOptions.database +
//       ' --username ' +
//       dbOptions.user +
//       ' --password ' +
//       dbOptions.pass +
//       ' --out ' +
//       newBackupPath;

//     exec(cmd, (error, stdout, stderr) => {
//       if (this.empty(error)) {
//         // check for remove old backup after keeping # of days given in configuration.
//         if (dbOptions.removeOldBackup == true) {
//           if (fs.existsSync(oldBackupPath)) {
//             exec('rm -rf ' + oldBackupPath, err => {});
//           }
//         }
//       }
//     });
//   }
// };