# Checklist for candidate

## Requirements for path “/admin”:
&#9745; 1. User can add, edit and remove employees;  
&#9745; 2. All fields (ID, username, phone, role, name) are required;  
&#9745; 3. ID and Phone are unique;  
&#9745; 4. ID cannot be changed but all the other values can;

## Requirements for path “/” for posts at “/”:
&#9745; 1. Users can add posts on a timeline;  
&#9745; 2. By typing ‘@’ inside a post an autocomplete should pop up to help user select an employee;  
&#9745; 3. When changing the username of an employee, it should reflect in already created posts. A possible solution is saving the text of the post as ​<employee id=”1” field=”username”></employee>​ instead of @mathilde, or #​992312312;


&#9745; All data is saved and retrieved by services;  
&#9745; Although you can use external libraries, you managed to get it to work by yourself.
