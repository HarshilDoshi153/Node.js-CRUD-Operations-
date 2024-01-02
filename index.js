let express = require("express");
let app = express()
app.use(express.json())
let products = []

app.post("/", (req, res) => {
  let product = req.body;
  if (!product.name || !product.cost) {
    res.status(404).send("Name or Cost not entered ")
  }
  else {
    product.id = products.length + 1
    product.isDeleted = false
    products.push(product)
    console.log(products)
    res.send({ products })
    res.send({ msg: "product is created", product: product })
  }
})
app.get("/fetchProductByName", (req, res) => {
  let name = req.query.name
  let fetchProductName = products.filter((obj) => (obj.name == name))
  if (fetchProductName) {
    console.log(fetchProductName)
    res.send({ fetchProductName: fetchProductName })
  }
  else {
    res.send({ msg: "Product not found" })
  }
})
app.get("/fetchProduct", (req, res) => {
  let product = products.filter(obj => (!obj.isDeleted));
  if (product) {
    res.send({ msg: "Products fetched", product: product })
  }
  else {
    res.send({ msg: "Product not found" })
  }
})
app.put("/updateProduct", (req, res) => {
  let name = req.query.name
  if (name) {
    let ind = products.findIndex((obj) => (obj.name == name))
    let obj = products[ind]
    obj.name = req.body.name
    obj.cost = req.body.cost
    obj.description = req.body.description
    products[ind] = obj
    res.send({ msg: "Product updated", products: obj })
  }
  else {
    res.send({ msg: "Product not found" })
  }
})
app.put("/deleteProduct", (req, res) => {
  let name = req.query.name
  let ind = products.findIndex((obj) => (obj.name == name))
  if (ind >= 0) {
    let obj = products[ind]
    obj.isDeleted = true
    console.log(products)
    res.send({ msg: "product deleted", product: obj })
  }
  else {
    res.send({ msg: "Product not found" })
  }
})
app.delete("/hardDeleteProduct", (req, res) => {
  let name = req.query.name
  let ind = products.findIndex((obj) => (obj.name == name))
  if (ind >= 0) {
    products.splice(ind, 1)
    res.send({ msg: "product deleted" })
  }
  else {
    res.send({ msg: "Product not found" })
  }
})
app.listen(3000, () => {
  console.log("start")
})