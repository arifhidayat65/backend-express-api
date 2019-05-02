'use strict';

var response = require('./res');
var connection = require('./conn');

exports.users = function (req, res) {
    connection.query('SELECT * FROM person', function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
};

exports.findUsers = function (req, res) {

    var user_id = req.params.user_id;

    connection.query('SELECT * FROM person where id = ?',
        [user_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createUsers = function(req, res) {
    var nik  = req.body.nik;
    var nama = req.body.nama;
    var jk = req.body.jk;
    var alamat = req.body.alamat;
    var grade = req.body.grade;

    connection.query('INSERT INTO person (nama, jk, alamat, grade) values (?,?)',
    [ nama, jk, alamat, grade ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};

exports.updateUsers = function(req, res) {
    
    var user_id = req.body.user_id;
    var nik = req.body.nik;
    var nama = req.body.nama;
    var jk = req.body.jk;
    var alamat = req.body.alamat;
    var grade = req.body.grade;


    connection.query('UPDATE person SET nik = ?, nama = ? WHERE id = ?',
    [ nik, nama,jk,alamat,grade , user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteUsers = function(req, res) {
    
    var user_id = req.body.user_id;

    connection.query('DELETE FROM person WHERE id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};


exports.index = function (req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};