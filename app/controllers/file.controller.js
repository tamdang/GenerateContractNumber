var formidable = require('formidable');
var fs = require('fs')
const sharp = require('sharp')
 
const map = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword'
};

const UPLOAD_FOLDER = 'uploadedfiles/';

exports.create = function(req, res) {
  var form = new formidable.IncomingForm()
  form.parse(req,(err,fields,files)=>{
    var oldpath = files.filetoupload.path
    var newpath = UPLOAD_FOLDER + files.filetoupload.name

    sharp(oldpath)
    .rotate()
    .toFile(newpath)
    .then(d => res.send({message: `files/${files.filetoupload.name}`}))
    .catch(err=> {
      console.log(err)
      res.status(500).send({message: "Some error occurred while uploading the file"});
    })
  })
};

exports.uploadForm = function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
    res.write('<form action="files" method="post" enctype="multipart/form-data">')
    res.write('<input type="file" name="filetoupload"><br>')
    res.write('<input type="submit">')
    res.write('</form>')
    return res.end();
};

exports.delete = function(req, res) {
  const {filePath} = req.params;
  let serverFilePath = UPLOAD_FOLDER.concat(filePath);
  fs.unlink(serverFilePath, function (err) {
    if(err) {
      res.status(500).send({message: "Could not delete the file " + filePath});
    } else {
      res.send({message: "File is deleted successfully!"})
    }
  });
};

exports.getFile = function(req, res){
  const {filePath} = req.params;
  const path = require('path');
  const ext = path.parse(filePath).ext;
  const serverFilePath = UPLOAD_FOLDER.concat(filePath);
  
  fs.exists(serverFilePath, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.status(404).send({message: `File ${filePath} not found!`});
      return
    }

    // if is a directory search for index file matching the extention
    if (fs.statSync(serverFilePath).isDirectory()) serverPathName += '/index' + ext;

    // read file from file system
    fs.readFile(serverFilePath, function(err, data){
      if(err){
        res.status(500).send({message: `Error getting the file: ${err}.`});
      } else {
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', map[ext] || 'text/plain' );
        res.end(data);
      }
    });
  })
};