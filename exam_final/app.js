// ket noi db
const database = require("./config/db");
let path = require('path');

const express = require('express');
const { REFUSED } = require("dns");
const app = express();
const port = 3001;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
const { log } = require("console");
app.use(bodyParser.urlencoded({ extended: false }));

// define 

 // list 
app.get('/', function (req, res) {
    database.query('SELECT * FROM products',
        function (err, result) {
            if (err)
                console.log(err);
            res.render('products/list', {
                title: 'Employee List',
                data: result
            })
        });
});
// add 

app.get('/add', function (req, res) {
    res.render('products/add', {
        title: 'Add Employee',
        ProductCode: '',
        ProductName: '',
        ProductData: '',
        ProductOriginPrice: '',
        Quantity: '',
        ProductStoreCode: ''


    });
});

app.post('/add', function (req, res) {
    let product = {
        ProductCode: req.body.ProductCode,
        ProductName: req.body.ProductName,
        ProductData: req.body.ProductData,
        ProductOriginPrice: req.body.ProductOriginPrice,
        Quantity: req.body.Quantity,
        ProductStoreCode: req.body.ProductStoreCode,


    }

    database.query('INSERT INTO products SET  ? ', product, function (err, result) {
        if (err) {
            console.log('Lỗi:', err);
        } else {
            console.log('Thêm thành công');
            res.redirect('/');
        }
    });
});

// delete 
app.post('/delete/:id', function(req, res){
    let  productId = req.params.id;

    database.query('DELETE FROM products WHERE id = ?',productId, function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log('xoa thanh cong');
            res.redirect('/');
        }
    })

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})