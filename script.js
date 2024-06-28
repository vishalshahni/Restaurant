function handleFormSubmit(event){
    event.preventDefault();
    const details = {
       price : event.target.price.value,
       dish : event.target.dish.value,
       category : event.target.category.value
    };
    axios.post("https://crudcrud.com/api/8af647d06b944a29ae559516a46a5c16/orderList", details)
    .then((res)=>{
        displayUserOnScreen(res.data)
    })
    .catch((err)=>{
        console.log(err);
    });
   document.getElementById("price").value = "";
   document.getElementById("dish").value = "";
   document.getElementById("category").value = "";

}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/8af647d06b944a29ae559516a46a5c16/orderList")
    .then((res) => {
       console.log(res.data);
       for(var i = 0; i<res.data.length; i++){
        displayUserOnScreen(res.data[i]);
       }
    })
    .catch((err) => {
        console.log(err);
    });
});

function displayUserOnScreen(details){
  
    const userItems = document.createElement("li");
    userItems.appendChild(
        document.createTextNode(`${details.price} - ${details.dish} - ${details.category}`)
    );
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete Order"))
    userItems.appendChild(deleteBtn);

    let userList;
    if(details.category == "Table 1"){
        userList = document.querySelector("#orderListTable1");
    }
    else if(details.category == "Table 2"){
        userList = document.querySelector("#orderListTable2"); 
    }
    else if(details.category == "Table 3"){
        userList = document.querySelector("#orderListTable3"); 
    }


   if(userList){
    userList.appendChild(userItems);
    deleteBtn.addEventListener("click",function (event){
        axios.delete(`https://crudcrud.com/api/8af647d06b944a29ae559516a46a5c16/orderList/${details._id}`)
        .then(()=>{
            userList.removeChild(event.target.parentElement);

        })
        .catch((err)=>{
            console.log(err);
        })

    })
}
}

