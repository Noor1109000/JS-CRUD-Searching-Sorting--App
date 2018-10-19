
    var bookName = document.querySelector('#bookName');
    var authorName = document.querySelector('#authorName');
    var dateName = document.querySelector('#dateName');
    var isbnNum = document.querySelector('#isbnNum');
    
    let sb = document.querySelector("#submit");
    var ub = document.querySelector("#update");


        // sb.addEventListener('click', function(e){

    function submitForm(e){
  
        var arr={
            name:bookName.value,
            author:authorName.value,
            date:dateName.value,
            isbn:isbnNum.value
        };


        //Validation Checking

        //Book Title
        if(arr.name == ""){
            document.getElementById('bMessage').innerHTML="Please fill up Book Title";
            return false;
        }
        if((arr.name.length<3) || (arr.name.length>13)){
            document.getElementById('bMessage').innerHTML="*Please fill the book title between 3 and 15*";
            return false;
        }
        if(!isNaN(arr.name)){
            document.getElementById('bMessage').innerHTML="*Please fill up character*";
            return false;
        }





        // Book Author
        if(arr.author == ""){
            document.getElementById('aMessage').innerHTML="please fill up Author Name";
            return false;
        }
        if((arr.author.length<3) || (arr.author.length>13)){
            document.getElementById('aMessage').innerHTML="*Please fill the Author Name between 3 and 15*";
            return false;
        }
        if(!isNaN(arr.author)){
            document.getElementById('aMessage').innerHTML="*Please fill up character*";
            return false;
        }
    


        //Date
        if(arr.date == ""){
            document.getElementById('dMessage').innerHTML="please fill up Correct Date";
            return false;
        }
    

        
        //isbn
        if(arr.isbn == ""){
            document.getElementById('isbnMessage').innerHTML="please fill up Isbn Number";
            return false;
        }
    
        if((arr.isbn.length<1) || (arr.isbn.length>13)){
            document.getElementById('isbnMessage').innerHTML="*Please fill the isbn Number between 1 and 13*";
            return false;
        }
    
        if(isNaN(arr.isbn)){
            document.getElementById('isbnNum').innerHTML="Enter Only Number";
            return false;
        }




        // if((!arr.name)||(!arr.author)||(!arr.date)||(!arr.isbn)){
        
        //     return false;
        // }

       
            if(localStorage.getItem('array1')===null){
                var array1=[];
                array1.push(arr);
                localStorage.setItem('array1',JSON.stringify(array1));
            }else{
                var array1=JSON.parse(localStorage.getItem('array1'));
                array1.push(arr);
                localStorage.setItem('array1',JSON.stringify(array1));
            }
    
            arrayFetch();
            e.preventDefault();

  
            
    }




// Array fetch from the localstorage
    function arrayFetch(){
        var collectionItem =  JSON.parse(localStorage.getItem('array1'));
        //Get output id
        var myOutput = document.getElementById("display");
    
        //Build Output
        myOutput.innerHTML = '';
    
        for(var i=0;i<collectionItem.length; i++){            
           var  name = collectionItem[i].name;
           var  author = collectionItem[i].author;
           var  date = collectionItem[i].date;
           var  isbn = collectionItem[i].isbn;
             
          myOutput.innerHTML += '<tr><td>'
                                     +name+
                                    '</td><td>'
                                     +author+
                                    '</td><td>'
                                    +date+'</td><td>'+
                                    isbn+'</td><td>'+
                                    '<i class="fa fa-times-circle mr-2" onclick="deleteIcon(\''+i+'\')"></i>'+
                                 '<i class="fa fa-edit" onclick="formShow(\''+isbn+'\')"></i></td></tr>'  
        
                    }

     }


// Delete an row from the table

    function deleteIcon(isbn){
        var array1 =  JSON.parse(localStorage.getItem('array1'));
        
        for(var i=0;i<array1.length;i++){
            if(i === parseInt(isbn)){
                array1.splice(i, 1);
            }
        }
        localStorage.setItem('array1', JSON.stringify(array1));
        arrayFetch()
     }

//Searching from the  list
    let search = document.querySelector("#searchItem");
    search.addEventListener('keyup', function(e){
    let inputValue = e.target.value.toLowerCase();
    //console.log(inputValue);
    let tbody = document.querySelector('tbody');
    let myRow = tbody.getElementsByTagName('tr');
    

    for(var i=0; i<myRow.length;i++){
        let td = myRow[i].getElementsByTagName('td')[0]
        if(td.innerHTML.toLowerCase().indexOf(inputValue)>-1){
            myRow[i].style.display = ''
        }else{
            myRow[i].style.display = 'none'
        }
    }
        
    });



//Sorting list

document.querySelector('select[name="selectValue"]').onchange =changeEventHandler;

function changeEventHandler(event) {
    var collectionItem =  JSON.parse(localStorage.getItem('array1'));

    var inputValue = event.target.value.toLowerCase();
    var th = document.querySelectorAll('th.sort');
   
        if(inputValue === th[0].innerHTML.toLowerCase()){
            for(var i=0;i<collectionItem.length; i++){  
                
            collectionItem.sort(function(a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercas 
                
            if (nameA < nameB) {
                    return -1;
                }
            else if (nameA > nameB) {
                    return 1;
                }
            else{
                return 0
            }
  
                 });
                 
                 localStorage.setItem('array1', JSON.stringify(collectionItem)); 
           }
   
        }


        else if(inputValue === th[1].innerHTML.toLowerCase()){
            for(var i=0;i<collectionItem.length; i++){  
                
            collectionItem.sort(function(a, b) {
            var authorA = a.author.toUpperCase(); // ignore upper and lowercase
            var authorB = b.author.toUpperCase(); // ignore upper and lowercas 
                
            if (authorA < authorB) {
                    return -1;
                }
            else if (authorA > authorB) {
                    return 1;
                }
            else{
                return 0
            }
  
                 });
                 console.log(collectionItem);
                 
                 localStorage.setItem('array1', JSON.stringify(collectionItem)); 
           }
   
        }

        else if(inputValue === th[2].innerHTML.toLowerCase()){
            for(var i=0;i<collectionItem.length; i++){  
                
            collectionItem.sort(function(a, b) {
            var dateA =new Date(a.date); // ignore upper and lowercase
            var dateB =new Date(b.date); // ignore upper and lowercas 
                
            if (dateA.getDate() < dateB.getDate()) {
                    return -1;
                }
            else if (dateA.getDate() > dateB.getDate()) {
                    return 1;
                }
            else{
                return 0
            }

  
         });
                 
                 localStorage.setItem('array1', JSON.stringify(collectionItem)); 
           }
   
        }


        else if(inputValue === th[3].innerHTML.toLowerCase()){
            for(var i=0;i<collectionItem.length; i++){  
                
            collectionItem.sort(function(a, b) {
            var nameA =parseInt(a.isbn); // ignore upper and lowercase
            var nameB = parseInt(b.isbn); // ignore upper and lowercas 
                
            if (nameA < nameB) {
                    return -1;
                }
            else if (nameA > nameB) {
                    return 1;
                }
            else{
                return 0
            }

  
    });
                 
     localStorage.setItem('array1', JSON.stringify(collectionItem)); 
           }
   
        }   
 
    
    
    arrayFetch();
    }


//Formshow  data   
function formShow(isbn){
    var array1 = JSON.parse(localStorage.getItem('array1'));
    

    for(var i=0;i<array1.length;i++){
        if(array1[i].isbn === isbn){
            let name = array1[i].name;
            let author = array1[i].author;
            let date = array1[i].date;
            let isbn = array1[i].isbn;
            let inputNameCheck = document.getElementsByTagName("input")[0].setAttribute("value", name);
            let inputAuthorCheck = document.getElementsByTagName("input")[1].setAttribute("value", author);
            let inputDateCheck = document.getElementsByTagName("input")[2].setAttribute("value", date);
            let inputIsbnCheck = document.getElementsByTagName("input")[3].setAttribute("value", isbn);
          
        }  

               
    }

    
 
}



//Update Data
ub.addEventListener('click', function(event){
    var arr={
        name:bookName.value,
        author:authorName.value,
        date:dateName.value,
        isbn:isbnNum.value
    };
    
    update(arr);

    arrayFetch();
    // event.preventDefault();
})

//update function
function update(oldData){
    var array1 = JSON.parse(localStorage.getItem('array1'));
    var newArr = [];
    
    for(var i=0;i<array1.length;i++){
        if(array1[i].isbn === oldData.isbn){
            array1[i].name=oldData.name;
            array1[i].author=oldData.author;
            array1[i].date=oldData.date;
            array1[i].isbn=oldData.isbn;
        }  
        
    }

    newArr =  array1;
    localStorage.setItem('array1',JSON.stringify(newArr))
}


 

    




 

    
    


    

    


