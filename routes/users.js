const express = require("express");

// JSON data import 
const { users } = require("../data/users.json");
const router = express.Router();

router.use(express.json());

/*
1. route :/user
    method : get : get all user 
    access : public  
    parameters : none 
*/
// /users already been specified in index.js
router.get("/" , (req,res) => {
    res.status(200).json({
        success : true,
        data : users,
    });
});

/*
1. route :/user/id
    method : get : get single user via id 
    access : public  
    parameters : yes id 
*/
                 //parameter "id" this can vary 
router.get("/:id" , (req,res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(404).json({
            success : false,
            message : "user not found",
        });
    }
    return res.status(200).json({
        success : true,
        data : user,
    });
});

/*
1. route :/user/id
    method : post : create new user
    access : public  
    parameters : no
*/

router.post("/" ,(req,res) => {
    const {id,name,surname,email,subscriptiontype,subscriptiondate} = req.body;
    const user = users.find((each) => each.id === id);
    if(user){
        return res.status(404).json({
            success : false,
            message : "user already exist",
        });
    }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptiontype,
    subscriptiondate,
  });
  return res.status(201).json({
    success : true,
    data : users,
  })
});

/*
1. route :/user/id
    method : put : updating user
    access : public  
    parameters : id
*/

router.put("/:id",(req,res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(404).json({
            success : false,
            message : "user not found",
        });
    }
    const updateduser = users.map((each) => {
        if(each.id ===id){
            return {
                ...each,
                ...data,
            }
        }
        return each;
    })
    return res.status(200).json({
        success : true,
        data : updateduser,
    });
});

/*
1. route :/user/id
    method : delete : deleting user
    access : public  
    parameters : id
*/

router.delete("/:id",(req,res) => {
    const { id } = req.params;
    
    const user = users.find((each) => each.id === id);

    if(!user){
        return res.status(404).json({
            success : false,
            message : "user to be deleted not find",
        });
    }
    
    const index = users.indexOf(user);
    users.splice(index,1);
    return res.status(202).json({
        success : true,
        message : "user deleted",
        data : users,
    });
});

/*
1. route :/user/subscription-details/id
    method : get : getting all users subscription details  
    access : public  
    parameters : id
*/

router.get("/subscription-details/:id" , (req,res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(404).json({
            success : false,
            message : "user does not exist",
        });
    }
    const dateindays = (data = "") => {
        let date;
        if(data === ""){
            // current date 
            date = new Date();
        } else{
            //date on the basis on data variable 
            date = new Date(data);
        }

        let days = Math.floor(date/(1000*60*60*24));
        return days;
    };

    const getsubstype = (date) => {
        if(user.subscriptionType === "Basic"){
            date = date + 90;
        }else if(user.subscriptionType === "Standard"){
            date = date + 180;
        }else if(user.subscriptionType === "Premium"){
            date = date +  365;
        }
        return date;
    };

    // subscription calculation 
    // date we get start from jan 1 ,1970, utc (its in miliseconds thats why 1000 in denominator).

    let returndate = dateindays(user.returnDate);
    let currentdate = dateindays();
    let subscriptiondate = dateindays(user.subscriptionDate);
    let subscriptionexp = getsubstype(subscriptiondate);

    const data = {
        ...user,
        subscriptionexpired : subscriptionexp < currentdate,
        daysleftforexpiration : subscriptionexp <= currentdate 
        ?  0 
        :subscriptionexp - currentdate,
        fine : returndate < currentdate
        ? subscriptionexp <= currentdate
            ? 200
            :100
        : 0,
    }

    return res.status(200).json({
        success : true,
        data,
    });
});


module.exports = router; 