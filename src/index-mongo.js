const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Milagros:020328@clustersegundaentrega.uvkpt.mongodb.net/ecommerce?retryWrites=true&w=majority",{
useNewUrlParser:true,
useUnifiedTopology:true
},error=>{
    if(error) throw new Error('Cannot connect to MongoDB')
    console.log("Base Conectada");
})
