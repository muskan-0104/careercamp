const students=require('../models/students');
const interviews=require('../models/interviews');

//get request to student page wih a form to create new student
module.exports.student=async function(req,res){
  try{
    return res.render('student',{title:'Create Student'});
  }catch(err){
    console.log("Error",err);
    return;
  };
}

//post request to student page to create new student
module.exports.create=async function(req,res){
    try{
        console.log("Student data", req.body)
        let newStu=await students.create(
            {
               batch:req.body.batch,
               name:req.body.name,
               college:req.body.college,
               status:req.body.status,
               dsa_marks:req.body.dsa_marks,
               frontend_marks:req.body.frontend_marks,
               backend_marks:req.body.backend_marks,
               react_marks:req.body.react_marks,
            });
            res.redirect("/#student");
        }catch(err){
            console.log("Error",err);
            return;
        };
     
}

//post req to update student, all filds pre-filled with existing data
module.exports.updateView=async function(req,res){
    try{
        let student=await students.findById(req.params.id)
    return res.render('student_update',{title:'Create Interview',student:student});
}catch(err){
    console.log("Error",err);
    return;
};
}

module.exports.update=async function(req,res){
    try{
         students.findOneAndUpdate(
            { "_id": req.params.id },
            {
              $set: {
                batch:req.body.batch,
                name:req.body.name,
                college:req.body.college,
                status:req.body.status,
                dsa_marks:req.body.dsa_marks,
                frontend_marks:req.body.frontend_marks,
                backend_marks:req.body.backend_marks,
                react_marks:req.body.react_marks,
             }
            },
            { new: true } // This option returns the updated document
          )
          .then(updatedStudent=> {
            res.redirect('/#student')
          })
          .catch(error => {
            console.log("Error in updating student", error)
            return;
          });
          
        res.redirect('/#student')
                
        }catch(err){
        console.log("Error",err);
        req.flash('Error','Error occured');
        return;
    }
}

//delete student
module.exports.delete=async function(req,res){
    try {
        let studentId=req.params.id;

        await students.findByIdAndDelete(studentId);
        await interviews.deleteMany({student:studentId});
    
        return res.redirect("/#student");
      } catch (error) {
        // Handle any errors that may occur during the deletion
        console.error(error);
      }
}