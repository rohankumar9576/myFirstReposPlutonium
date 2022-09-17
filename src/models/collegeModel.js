//project2 
const mongoose=require('mongoose')
const collegeSchema=mongoose.Schema(
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
    module.exports = mongoose.model("college", collegeSchema);
