var courseName = document.getElementById('courseName');
var courseCategory = document.getElementById('courseCategory');
var coursePrice = document.getElementById('coursePrice');
var courseDescription = document.getElementById('courseDescription');
var courseCapacity = document.getElementById('courseCapacity');
var addButton = document.getElementById('click');
var deleteAll=document.getElementById('deleteBtn');
var search = document.getElementById('search');
var clear = document.getElementById("resetbtn");
if(localStorage.getItem('courses') == null){
    var courses =[];
}else{
    var courses=JSON.parse(localStorage.getItem('courses'));
    displaydata();
}
addButton.addEventListener('click',function(e){
    e.preventDefault();
    addCourse();
    clearInputs();
    displaydata();
    addButton.setAttribute("disabled", "disabled");
})
deleteAll.addEventListener('click',function(e){
    e.preventDefault();
    deleteAllCourses();
})
search.addEventListener("keyup",function(e){
    e.preventDefault();
    var result="";
    for(var i=0;i<courses.length;i++) {
        if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase()))
        result+=`
        <tr>
          <td>${i+1}</td>
          <td>${courses[i].courseName}</td>
          <td>${courses[i].courseCategory}</td>
          <td>${courses[i].coursePrice}</td>
          <td>${courses[i].courseDescription}</td>
          <td>${courses[i].courseCapacity}</td>
          <td><Button class="btn btn-outline-info">Update</Button></td>
          <td><Button class="btn btn-outline-danger" onclick="deleteCourse(${i})" >Delete</Button></td>
        </tr>
        `
    }
    document.getElementById("data").innerHTML=result;
})
clear.addEventListener("click", function(e){
    e.preventDefault();
    courseName.classList.remove("is-invalid");
    document.querySelector(".warning-text").classList.add("d-none");
    clearInputs();
})
courseName.addEventListener("keyup", function(){
    var pattern = /^[A-Z][a-z]{2,10}$/;
    if (pattern.test(courseName.value)){
        courseName.classList.remove("is-invalid");
        courseName.classList.add("is-valid");
        document.querySelector(".warning-text").classList.add("d-none");
        addButton.removeAttribute("disabled");
    }else{
        courseName.classList.add("is-invalid");
        document.querySelector(".warning-text").classList.remove("d-none");
        addButton.setAttribute("disabled", "disabled");
    } 
   
})
function addCourse(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Add it!'
      }).then((result) => {
        if (result.isConfirmed) {
            var course={
                courseName: courseName.value,
                courseCategory: courseCategory.value,
                coursePrice : coursePrice.value,
                courseDescription   : courseDescription.value,
                courseCapacity  : courseCapacity.value,
            }
            courses.push(course);
            localStorage.setItem('courses', JSON.stringify(courses));
            displaydata();
          Swal.fire(
            'Course added successfully !',
            'Your course has been added.',
            'success'
          )
        }
      })
}
function clearInputs(){
    var inputs=document.querySelectorAll('.inputs');
    for(var i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
    courseName.classList.remove("is-valid"); 
}
function displaydata(){
    var result="";
    for(var i=0;i<courses.length;i++) {
        result+=`
        <tr>
          <td>${i+1}</td>
          <td>${courses[i].courseName}</td>
          <td>${courses[i].courseCategory}</td>
          <td>${courses[i].coursePrice}</td>
          <td>${courses[i].courseDescription}</td>
          <td>${courses[i].courseCapacity}</td>
          <td><Button class="btn btn-outline-info">Update</Button></td>
          <td><Button class="btn btn-outline-danger" onclick="deleteCourse(${i})" >Delete</Button></td>
        </tr>
        `
    }
    document.getElementById("data").innerHTML=result;
}
function deleteCourse(i){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(i, 1);
            localStorage.setItem('courses', JSON.stringify(courses));
            displaydata();
          Swal.fire(
            'Deleted!',
            'Your Course has been deleted.',
            'success'
          )
        }
      })
}
function deleteAllCourses(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete All!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(0,courses.length)
            localStorage.setItem('courses', JSON.stringify(courses));
            displaydata();
          Swal.fire(
            'All deleted!',
            'Your All Courses has been deleted.',
            'success'
          )
        }
      })
}