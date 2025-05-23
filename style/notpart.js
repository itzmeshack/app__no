


let num = [1, 3, 6, 4];
//[0-> 1, 1 -> 3, 2 -> 6, 3-> 4]
let target = 10

/*

for(let i = 0; i < num.length; i++){
    console.log( num[i])
    for(let j =0; j < num.length; j++){
        console.log(num[j])

      if(num[i]+ num[j] == target){
        //console.log({i, j})
      }

    }
      


}

*/

/*
for (let i= 0; i <  100 ; i++){
    for(let j =0 ; j<  100; j++){
       console.log(j+1 )
        
    }
}

*


----question 2: Given an integer x, return true if x is a palindrome, 
and false otherwise.---*/


    // Reverse the string
    let x = [767];
     str = x.toString();
    let reversedStr = str.split('').reverse().join('')

    if (str === reversedStr) {
        console.log("Palindrome");
    } else {
        console.log("Not a palindrome");
    }

   



