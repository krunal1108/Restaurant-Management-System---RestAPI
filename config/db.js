import mongoose from 'mongoose';


mongoose.connect('mongodb+srv://krunalkotadiya2004:mongoISMYFAVmaroon%4025@cluster0.cprjc.mongodb.net/restaurantManagementAPI')
    .then(() => console.log('Database Connected!')).catch((error) => {
        console.log("Error", error);
    })

export default mongoose;