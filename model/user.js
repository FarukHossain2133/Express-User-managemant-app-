const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Faruk:Faruk01936@cluster0-fqsei.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
const conn = mongoose.connection;

const employSchema = new mongoose.Schema({
    name: String,
    email: String,
    eType: String,
    hourlyRate: Number,
    totalHour: Number, 
    total: Number
});

employSchema.methods.totalSalary = function(){
    return  this.hourlyRate*this.totalHour;
    }

const employeModel = mongoose.model('Employes', employSchema);

 const employes = new employeModel({
    name: 'Nazmul Hossain',
    email: 'nazmul@@gmail.com',
    eType: 'hourly',
    hourlyRate: 5,
    totalHour: 10,
});

employes.total = employes.totalSalary();

conn.on('connected', () => {
    console.log('connection successfully')
})
conn.once('disconnected', () => {
    console.log('database disconnected')
})

conn.on('error', console.error.bind(console, 'connection error'));
conn.once('open', () => {
   employes.save((err, res) => {
        if(err) throw errors;
        console.log(res)
        conn.close()
   })
//  employeModel.find({}, function(err, data){
//     if(err) throw new Error(); 
//     console.log(data)
//     conn.close();
//  });

})

// db.inventory.insertMany([
//     {'item': 'computer', 'qty': 5, 'price': 200, 'stock': 'Instock' },
//     {'item': 'mobile', 'qty': 5, 'price': 200, 'stock': 'Instock' },
//     {'item': 'laptop', 'qty': 5, 'price': 300, 'stock': 'Instock' },
//     {'item': 'tv', 'qty': 5, 'price': 500, 'stock': 'Instock' }
// ])

// db.orders.insertMany([
//     {'item': 'computer', 'qty': 2, 'price': 200 },
//     {'item': 'mobile', 'qty': 2, 'price': 200 },
//     {'item': 'laptop', 'qty': 3, 'price': 300 },
//     {'item': 'tv', 'qty': 1, 'price': 500 }
// ])