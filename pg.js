const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox");
const symbols='!@#$%&';
let password="";
let passwordLength=10;
let checkCount=0;
let savedPasswords = loadSavedPasswords();
// Function to save password
function savePassword(password) {
    savedPasswords.push(password);
    localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
  }
  
  // Function to retrieve saved passwords from local storage
  function loadSavedPasswords() {
    const storedPasswords = localStorage.getItem('savedPasswords');
    if (storedPasswords) {
      return JSON.parse(storedPasswords);
    }
    return [];
  }

  // Function to delete a password
function deletePassword(index) {
    savedPasswords.splice(index, 1);
    localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
    displaySavedPasswords();
}

// Function to toggle password visibility
function togglePasswordVisibility(password) {
    const passwordElement = document.createElement('input');
    passwordElement.type = 'text';
    passwordElement.value = password;
    passwordElement.readOnly = true;

    const savedPasswordList = document.getElementById('savedPasswordList');
    const listItem = savedPasswordList.children[index];
    const existingPasswordDisplay = listItem.querySelector('input[type="text"]');

    listItem.replaceChild(passwordElement, existingPasswordDisplay);
}

// function togglePasswordVisibility(_buttonElement) {
//     var passwordInput = icon.previousElementSibling; // Assuming the password input is just before the icon

//     // Toggle the type attribute of the password input
//     if (passwordInput.type === 'password') {
//         passwordInput.type = 'text';
//     } else {
//         passwordInput.type = 'password';
//     }
// }

function myFunction() {
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }



  function displaySavedPasswords() {
    // Assuming you have an element with the ID 'savedPasswordList' to display saved passwords
    const savedPasswordList = document.getElementById('savedPasswordList');

    // Clear the existing list
    savedPasswordList.innerHTML = '';

    // Add each saved password to the list
    savedPasswords.forEach((password, index) => {
        const listItem = document.createElement('li');

        // Eye icon to toggle password visibility
        const eyeIcon = document.createElement('i');
        eyeIcon.className = 'eye';
        eyeIcon.style.cursor = 'pointer';
        eyeIcon.addEventListener('click', () => togglePasswordVisibility(password, index));

        // Display the password with an eye icon
        const passwordWithEye = document.createElement('span');
        passwordWithEye.textContent = password;
        passwordWithEye.appendChild(eyeIcon);

        // Add a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deletePassword(index));

        listItem.appendChild(passwordWithEye);
        listItem.appendChild(deleteButton);

        savedPasswordList.appendChild(listItem)
    });
}
  
  // Load saved passwords when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    savedPasswords = loadSavedPasswords();
    displaySavedPasswords();
  });

handleSlider();
//set strength circle to grey
setIndicator("#ccc");
//set passwordLength Password length ko UI pa Reflect krata hai
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    //Color in slidebar
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%"
}
async function copyContent(){
    try{
     await navigator.clipboard.writeText(passwordDisplay.value);
     copyMsg.innerText="copied";
    }

    //  Save the copied password
    
    // savedPassword.push(passwordDisplay.value);

    catch(e){
     copyMsg.innerText="failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");
    setTimeout(()=>{
     copyMsg.classList.remove("active");
    },2000); 
    
 }



function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}
function getRndInteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode (getRndInteger(97,123))
}
function generateUpperCase(){
    return String.fromCharCode (getRndInteger(65,91))
}
function generateSymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}
function calcStrengh(){
    let hasUpper=false;
    let hasNum=false;
    let hasLower=false;
    let hasSym=false;
    if(uppercaseCheck.checked) hasUpper=true;
    if (lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;
    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator("#0f0");
    }
    else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength>=4
    ){
        setIndicator("#ff0");
    }else {
        setIndicator("#f00");
    }
}
function shufflePassword(array){
    //Fisher Yates Method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });
    //Special Condition
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    copyContent();
})

generateBtn.addEventListener('click',()=>{
    //none of the checkbox are selected
    if(checkCount==0) return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    console.log("Starting the journey");

    //New Password
    //Remove old password
    password="";
    const userInput = document.getElementById('userInput').value;

    // if(uppercaseCheck.checked){
    //     password+= generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password+= generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password+= generateRandomNumber();
    // }
    // if(symbolCheck.checked){
    //     password+= generateSymbol();
    // }
    let funcArr=[];
    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);
    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);
    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    const remainingLength = passwordLength - userInput.length;

    // Ensure that the total length is not exceeded
    if (remainingLength < 0) {
        console.error("Error: Total length is less than the length of the username.");
        return;
    }

    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }
    console.log("Compulsory Addition done");

    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex=getRndInteger(0,funcArr.length);
        console.log("randIndex"+ randIndex);
        password+=funcArr[randIndex]();
    }

    


    // console.log("Remaining Addition done");
    // //Shuffle the password
    // password=shufflePassword(Array.from(password));
    // console.log("Shuffling done");
    // //Show in UI
    // passwordDisplay.value=password;
   
    // console.log("UI addition done");
    // //Calculate strength
    // calcStrengh();
    console.log("Remaining Addition done");
    // Shuffle the password (excluding user input)
    const shuffledPasswordArray = Array.from(password.slice(userInput.length));
    const shuffledPassword = userInput + shufflePassword(shuffledPasswordArray);

    // Check if the total length is greater than specified length
    if (shuffledPassword.length > passwordLength) {
        // Adjust the password length
        passwordDisplay.value = shuffledPassword.slice(0, passwordLength);
    } else {
        // Show in UI
        passwordDisplay.value = shuffledPassword;
    }
    savePassword(passwordDisplay.value);
    displaySavedPasswords();

    // Optionally, display saved passwords in the console
    console.log('Saved Passwords:', savedPasswords);

    console.log("UI addition done");
    //Calculate strength
    calcStrengh();
    
});

