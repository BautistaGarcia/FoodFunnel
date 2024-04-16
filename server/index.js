

app.get('/products/productDetail/:id', (req, res) => {
    res.sendFile(process.cwd() + '/views/productDetail.ejs');
});


