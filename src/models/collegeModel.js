<<<<<<< HEAD
//project2 
const mongoose=require('mongoose')
const collegeschema=mongoose.Schema(
    { name: { 
        type:String,
        required:true,
        unique:true
    },          
    fullName:
{
    type:String,
    required:true,

},
    logoLink:
     {
        type:String,
        required:true,
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true }
    )
    module.exports = mongoose.model("college", collegeschema);
=======
//project2 
>>>>>>> fb76c8d84103b5419b8de4016177f4827f61c5f6
