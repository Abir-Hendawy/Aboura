var websiteName = document.getElementById("websiteName");
var websiteUrl = document.getElementById("websiteUrl");
var inputs = document.getElementsByClassName("form-control");
var currentIndex
var BookmarkList=[];
/*Validation Input1*/
websiteName.onkeyup=function(){
    var nameRejex=/^[A-Z][a-z]{2,7}$/;
    if (!nameRejex.test(websiteName.value))
    {
        submit.disabled="true";
        websiteName.classList.add("is-invalid");
        websiteName.classList.remove("is-valid");
        nameAlert.classList.remove("d-none");
        
    }
    else{
        submit.removeAttribute("disabled");
        websiteName.classList.add("is-valid");
        websiteName.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");
        
    }
}
/*Validation Input2*/
websiteUrl.onkeyup=function(){
    var nameRejex=/(www|http:|https:)+[^\s]+[\w]/;
    if (!nameRejex.test(websiteUrl.value))
    {
        submit.disabled="true";
        websiteUrl.classList.add("is-invalid");
        websiteUrl.classList.remove("is-valid");
        urlAlert.classList.remove("d-none");
    }
    else{
        submit.removeAttribute("disabled");
        websiteUrl.classList.add("is-valid");
        websiteUrl.classList.remove("is-invalid");
        urlAlert.classList.add("d-none");
    }
}

/*Localstorage*/



if(JSON.parse(localStorage.getItem("BookmarkData")!=null))
{
    BookmarkList=JSON.parse(localStorage.getItem("BookmarkData"));
    displayData();
}
submit.onclick=function(){
    if(submit.innerHTML=="Submit"){
        addData();
    }
    else{
        updateData();
        document.getElementById("submit").innerHTML="Submit";

        
    }
 
 displayData();
 clearForm();
}
function addData(){
    var Bookmark = 
    {
        name:websiteName.value,
        url:websiteUrl.value
    }
    if (websiteName.value!=="" && websiteUrl.value!==""){
        BookmarkList.push(Bookmark);
        localStorage.setItem("BookmarkData",JSON.stringify(BookmarkList));
       
    }
    else{
        alert("Input shoud not be empty");
        
    }
}
function displayData(){
    var trs='';
    for (i=0;i<BookmarkList.length;i++)
    {
        trs+=
          
        `
          <tr>
          <td>${i+1}</td>
          <td>${BookmarkList[i].name}</td>
          <td>${BookmarkList[i].url}</td>
          
          <td><a class="btn btn-primary" href="${BookmarkList[i].url}" class="btn btn-danger">Visit</button></td>
          <td><button onclick="deleteData(${i})" class="btn btn-danger">Delete</button></td>
          <td><button onclick="getBookmarkInfo(${i})" class="btn btn-danger">Update</button></td>
          

          </tr>
          
          `
          
          
    }
    document.getElementById("tableBody").innerHTML=trs;
}
function clearForm(){
    for(i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
}
function deleteData(index){
    BookmarkList.splice(index,1);
    displayData();
    localStorage.setItem("BookmarkData",JSON.stringify(BookmarkList));

}
searchInput.onkeyup=function(){
    var search =document.getElementById("searchInput");
    var val=search.value;
var trs=``;
for(i=0;i<BookmarkList.length;i++){
    if(BookmarkList[i].name.toLowerCase().includes(val.toLowerCase()))
    {
        trs+=
        `
          <tr>
          <td>${i+1}</td>
          <td>${BookmarkList[i].name}</td>
          <td>${BookmarkList[i].url}</td>
          
          <td><a class="btn btn-primary" href="${BookmarkList[i].url}" class="btn btn-danger">Visit</button></td>
          <td><button onclick="deleteData(${i})" class="btn btn-danger">Delete</button></td>
          <td><button onclick="getBookmarkInfo(${i})" class="btn btn-danger">Update</button></td>
          

          </tr>
          
          `
          
          
    }
    document.getElementById("tableBody").innerHTML=trs;
}
}
function getBookmarkInfo(index){
    websiteName.value=BookmarkList[index].name;
    websiteUrl.value=BookmarkList[index].url;
    submit.innerHTML="Update";
    currentIndex=index;

}
function updateData(){
    var Bookmark=
    {
        name:websiteName.value,
        url:websiteUrl.value
    }
    if (websiteName.value!=="" && websiteUrl.value!==""){
        BookmarkList[currentIndex]=Bookmark;
        localStorage.setItem("BookmarkData",JSON.stringify(BookmarkList));
    }
    else{
        alert("Input shoud not be empty");
        
    }

}