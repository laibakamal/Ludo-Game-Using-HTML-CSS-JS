//menu screen
var menuScreen=document.getElementsByClassName('menu-screen');

//players
var playerArray=[];

//number of players
var numOfPlayers=4;

//play button
var playBtn=document.getElementsByClassName('play-btn')[0];

//players names input boxes
var rpName=document.getElementsByClassName('rpn')[0];
var gpName=document.getElementsByClassName('gpn')[0];
var bpName=document.getElementsByClassName('bpn')[0];
var ypName=document.getElementsByClassName('ypn')[0];

//player name
var pName=document.getElementsByClassName('pname');

//players dice
var rpDice=document.getElementsByClassName('rp-dice');
var gpDice=document.getElementsByClassName('gp-dice');
var bpDice=document.getElementsByClassName('bp-dice');
var ypDice=document.getElementsByClassName('yp-dice');

//tokens home
var tokensHome=document.getElementsByClassName('tokens-home');

//tokens div
var tokensDiv=document.getElementsByClassName('token-div');

//tokens
var redTokens=document.getElementsByClassName('red-token');
var greenTokens=document.getElementsByClassName('green-token');
var blueTokens=document.getElementsByClassName('blue-token');
var yellowTokens=document.getElementsByClassName('yellow-token');

// const rt = document.createElement('red-token material-icons');
// const gt = document.createElement('green-token material-icons');
// const bt = document.createElement('blue-token material-icons');
// const yt = document.createElement('yellow-token material-icons');

//a simple step/box of game board
var simpleBox=document.getElementsByClassName('jump');

//record the paths of red, green, blue, yellow tokens in arrays
var redTokenPath=[19,20,21,22,23,15,12,9,6,3,0,1,2,5,8,11,14,17,24,25,26,27,28,29,41,53,52,51,50,49,48,56,59,62,65,68,71,70,69,66,63,60,57,54,47,46,45,44,43,42,30,31,32,33,34,35];
var greenTokenPath=[5,8,11,14,17,24,25,26,27,28,29,41,53,52,51,50,49,48,56,59,62,65,68,71,70,69,66,63,60,57,54,47,46,45,44,43,42,30,18,19,20,21,22,23,15,12,9,6,3,0,1,4,7,10,13,16];
var blueTokenPath=[66,63,60,57,54,47,46,45,44,43,42,30,18,19,20,21,22,23,15,12,9,6,3,0,1,2,5,8,11,14,17,24,25,26,27,28,29,41,53,52,51,50,49,48,56,59,62,65,68,71,70,67,64,61,58,55];
var yellowTokenPath=[52,51,50,49,48,56,59,62,65,68,71,70,69,66,63,60,57,54,47,46,45,44,43,42,30,18,19,20,21,22,23,15,12,9,6,3,0,1,2,5,8,11,14,17,24,25,26,27,28,29,41,40,39,38,37,36];

//safe boxes
var safeBoxes=[19,6,5,27,52,65,66,44];

//locations of all 4 tokens of each player
var redPlayerTokenLoc=[-1,-1,-1,-1];
var greenPlayerTokenLoc=[-1,-1,-1,-1];
var bluePlayerTokenLoc=[-1,-1,-1,-1];
var yellowPlayerTokenLoc=[-1,-1,-1,-1];

//states of tokens (either out on the gameboard or inside the home)
//0 shows that token is inside home, 1 shows that token is on the gameboard
var redTokensState=[0,0,0,0];
var greenTokensState=[0,0,0,0];
var blueTokensState=[0,0,0,0];
var yellowTokensState=[0,0,0,0];

var stepss;//stores the random num generated on dice
var playerMoves=[0,0,0,0];//stores the (steps to take)/ (random number generated) for a particular player
var winningPositionPlayersArray=[];


var totalRedTokensOut=4;//total red tokens left outside of winning box
var totalGreenTokensOut=4;
var totalBlueTokensOut=4;
var totalYellowTokensOut=4;


//in the beginning of game, no die is visible
rpDice[0].style.display="none";
gpDice[0].style.display="none";
bpDice[0].style.display="none";
ypDice[0].style.display="none";


/*###################
###################
###################
###################
###################
###################
###################
###################
*/


//when the play button is pressed, this function is called.
function Play()
{
    //if user enters less than 4 players, to handle this situation, we are applying conditions on each playername input boxes

    //red player check
    if(rpName.value==="")
    {
        for(let i=0;i<4;i++)
        {
            redTokens[i].style.display="none";
        }
        numOfPlayers-=1;
        pName[0].innerHTML="";
    }
    else
    {
        pName[0].innerHTML=rpName.value;
        playerArray.push('r');
    }


    //blue player check
    if(bpName.value==="")
    {
        for(let i=0;i<4;i++)
        {
            blueTokens[i].style.display="none";
        }
        numOfPlayers-=1;
        pName[1].innerHTML="";
    }
    else
    {
        pName[1].innerHTML=bpName.value;
        playerArray.push('b');
    }


    //green player check
     if(gpName.value==="")//if green player is not playing
     {
        for(let i=0;i<4;i++)
        {
            greenTokens[i].style.display="none";//setting the tokens style to none
        }
        numOfPlayers-=1;
        pName[2].innerHTML="";//no green player name ((disappears))
     }
    else
    {
       pName[2].innerHTML=gpName.value;//set the green player name at location
       playerArray.push('g');//g is pushed to array of players
    }


    //yellow player check   
    if(ypName.value==="")
    {
        for(let i=0;i<4;i++)
        {
            yellowTokens[i].style.display="none";
        }
        numOfPlayers-=1;
        pName[3].innerHTML="";
    }
    else
    {
        pName[3].innerHTML=ypName.value;
        playerArray.push('y');
    }


    //display dice with the first player in the beginning of game
    if(playerArray[0]==='r')
    {
        rpDice[0].style.display="";
    }
    if(playerArray[0]==='g')
    {
        gpDice[0].style.display="";
    }
    if(playerArray[0]==='b')
    {
        bpDice[0].style.display="";
    }
    if(playerArray[0]==='y')
    {
        ypDice[0].style.display="";
    }


    //alert if number of players is less than 2
    if(playerArray.length<2)
    {
        alert('To Play Ludo, Please Enter Atleast 2 Players!');
    }
    //else remove welcome screen and further the game begins
    else
    {
        menuScreen[0].remove();    
    }
}




/*###################
###################
###################
###################
###################
###################
###################
###################
*/


function highlightPlayersTokens(pno)
{
    if(pno===0)//red player
    {
        //add animations to red tokens
        for(let i=0;i<4;i++)
        {
            redTokens[i].classList.add("animate__animated","animate__tada");
            greenTokens[i].classList.remove("animate__animated","animate__tada");
            blueTokens[i].classList.remove("animate__animated","animate__tada");
            yellowTokens[i].classList.remove("animate__animated","animate__tada");

            redTokens[i].style.zIndex="+99";
            greenTokens[i].style.zIndex="0";
            blueTokens[i].style.zIndex="0";
            yellowTokens[i].style.zIndex="0";
        }
    }


    else if(pno===1)//green player
    {
        //add animations to green tokens
        for(let i=0;i<4;i++)
        {
            redTokens[i].classList.remove("animate__animated","animate__tada");
            greenTokens[i].classList.add("animate__animated","animate__tada");
            blueTokens[i].classList.remove("animate__animated","animate__tada");
            yellowTokens[i].classList.remove("animate__animated","animate__tada");

            redTokens[i].style.zIndex="0";
            greenTokens[i].style.zIndex="+99";
            blueTokens[i].style.zIndex="0";
            yellowTokens[i].style.zIndex="0";
        }
    }
   

    else if(pno===2)//yellow player
    {
        //add animations to yellow tokens
        for(let i=0;i<4;i++)
        {
            redTokens[i].classList.remove("animate__animated","animate__tada");
            greenTokens[i].classList.remove("animate__animated","animate__tada");
            blueTokens[i].classList.remove("animate__animated","animate__tada");
            yellowTokens[i].classList.add("animate__animated","animate__tada");

            redTokens[i].style.zIndex="0";
            greenTokens[i].style.zIndex="0";
            blueTokens[i].style.zIndex="0";
            yellowTokens[i].style.zIndex="+99";
        }
    }
   

    else if(pno===3)//blue player
    {
        //add animations to blue tokens
        for(let i=0;i<4;i++)
        {
            redTokens[i].classList.remove("animate__animated","animate__tada");
            greenTokens[i].classList.remove("animate__animated","animate__tada");
            blueTokens[i].classList.add("animate__animated","animate__tada");
            yellowTokens[i].classList.remove("animate__animated","animate__tada");

            redTokens[i].style.zIndex="0";
            greenTokens[i].style.zIndex="0";
            blueTokens[i].style.zIndex="+99";
            yellowTokens[i].style.zIndex="0";
        }
    }
   

    else
    {
        for(let i=0;i<4;i++)
        {
            redTokens[i].classList.remove("animate__animated","animate__tada");
            greenTokens[i].classList.remove("animate__animated","animate__tada");
            blueTokens[i].classList.remove("animate__animated","animate__tada");
            yellowTokens[i].classList.remove("animate__animated","animate__tada");
        }
    }
}


/*###################
###################
###################
###################
###################
###################
###################
###################
*/

function manageDiceRotation(pno)
{
    if(pno===0)//if red player
    {
        if(playerArray.includes('r'))//if the player array includes red player, means if red player is playing
        {
            if(winningPositionPlayersArray.includes('r'))//if r is already in winning positon (has no token left to play with)
            {
                manageDiceRotation(1);
                return 0;
            }

            setTimeout(function()
            {
                if(stepss===6 || stepss===7)//if token is not outside home -->7
                {
                    return 0;
                }
    
                if(redTokensState.includes(1) && playerMoves[0]>0)//if some red token is outside home and eligible to move around game-board andddd dice has rolled to a number greater than 0
                {                }
                else
                {
                   rpDice[0].style.display="none";
                   if(playerArray.includes('g'))
                   {
                       gpDice[0].style.display="";
                   }
                   else if(playerArray.includes('b'))
                   {
                       bpDice[0].style.display="";
                   }
                   else if(playerArray.includes('y'))
                   {
                       ypDice[0].style.display="";
                   }
                }
            }, 800);
        }
        else
        {
            stepss=7;
            manageDiceRotation(1);
        }
    }

    

    else if(pno===1)//if green player
    {
        if(playerArray.includes('g'))
        {
            if(winningPositionPlayersArray.includes('g'))
            {
                manageDiceRotation(2);
                return 0;
            }

            setTimeout(function()
            {
                if(stepss===6 || stepss===7)//if token is not outside home -->7
                {
                    return 0;
                }
    
                if(greenTokensState.includes(1) && playerMoves[1]>0)
                {                }
                else
                {
                   gpDice[0].style.display="none";
                   if(playerArray.includes('y'))
                   {
                       ypDice[0].style.display="";
                   }
                   else if(playerArray.includes('b'))
                   {
                       bpDice[0].style.display="";
                   }
                   else if(playerArray.includes('r'))
                   {
                       rpDice[0].style.display="";
                   }
                }
            }, 800);
        }
        else
        {
            stepss=7;
            manageDiceRotation(1);
        }
    }


    else if(pno===2)//if yellow player
    {
        if(playerArray.includes('y'))
        {
            if(winningPositionPlayersArray.includes('y'))
            {
                manageDiceRotation(3);
                return 0;
            }

            setTimeout(function()
            {
                if(stepss===6 || stepss===7)//if token is not outside home -->7
                {
                    return 0;
                }
    
                if(yellowTokensState.includes(1) && playerMoves[2]>0)
                {                }
                else
                {
                   ypDice[0].style.display="none";
                   if(playerArray.includes('b'))
                   {
                       bpDice[0].style.display="";
                   }
                   else if(playerArray.includes('r'))
                   {
                       rpDice[0].style.display="";
                   }
                   else if(playerArray.includes('g'))
                   {
                       gpDice[0].style.display="";
                   }
                }
            }, 800);
        }
        else
        {
            stepss=7;
            manageDiceRotation(3);
        }
    }


    else if(pno===3)//if blue player
    {
        if(playerArray.includes('b'))
        {
            if(winningPositionPlayersArray.includes('b'))
            {
                manageDiceRotation(0);
                return 0;
            }

            setTimeout(function()
            {
                if(stepss===6 || stepss===7)//if token is not outside home -->7
                {
                    return 0;
                }
    
                if(blueTokensState.includes(1) && playerMoves[3]>0)
                {                }
                else
                {
                   bpDice[0].style.display="none";
                   if(playerArray.includes('r'))
                   {
                       rpDice[0].style.display="";
                   }
                   else if(playerArray.includes('g'))
                   {
                       gpDice[0].style.display="";
                   }
                   else if(playerArray.includes('y'))
                   {
                       ypDice[0].style.display="";
                   }
                }
            }, 800);
        }
        else
        {
            stepss=7;
            manageDiceRotation(0);
        }
    }
}



/*###################
###################
###################
###################
###################
###################
###################
###################
*/


function rollDice(diceObj,pno)
{
    var diceSide =Math.floor((Math.random()*6)+1);//generate random number on the dice
    stepss=diceSide;//steps to take on the board
    diceObj.innerHTML=diceSide;//sets the random number generated on the corresponding dice
    playerMoves[pno]=diceSide;//corresponding player's current steps to take are stored against his index in the array
    highlightPlayersTokens(pno);//highlight/animate the tokens of current player
    manageDiceRotation(pno);//rotates and passes dice to next player
}



var prevPlayer;

/*###################
###################
###################
###################
###################
###################
###################
###################
*/


function moveRedToken(tokenObj,pno)
{
    if (playerMoves[0]===0)//if token has no steps to move 
    {
        return 0;
    }
    if(redTokensState[pno]===1)//if a red token is on the gameboard
    {
        redPlayerTokenLoc[pno]+=playerMoves[0];//if we move it steps equal to number generated on dice

        if(redPlayerTokenLoc[pno]===56)//if new location becomes 56, means that central box
        {
            totalRedTokensOut-=1;//decrement the number of tokens currently in the game
            checkForWin('r');//check if red is in winning position or not
            redTokensState[pno]=0;//that red token is now not in the game
            tokenObj.style.display="none";//make that token disappear
            return 0;
        }
        if(redPlayerTokenLoc[pno]>56)//if new location is greater than 56
        {
            redPlayerTokenLoc[pno]-=playerMoves[0];//do nothing with the token 
            return 0;
        }

        highlightPlayersTokens(5);
        killToken(pno,0);
        playerMoves[0]=0;

        if(redPlayerTokenLoc[pno]>-1)//if red token is out of home
        {
             prevPlayer=simpleBox[redTokenPath[redPlayerTokenLoc[pno]]].innerHTML;
        }

        for(let i=0;i<simpleBox.length;i++)
        {
            if(redPlayerTokenLoc[pno]===i)
            {
                simpleBox[redTokenPath[redPlayerTokenLoc[pno]]].innerHTML="<span onclick='moveRedToken(this,"+pno+")' class='red-token material-icons r'>hourglass_full</span>"+prevPlayer;
            }
            else
            {
                tokenObj.remove();
            }
        }

    }

    else
    {
        if(playerMoves[0]===6)
        {
            redTokensState[pno]=1;
            redPlayerTokenLoc[pno]+=1;
            tokenObj.remove();
            prevPlayer=simpleBox[redTokenPath[redPlayerTokenLoc[pno]]].innerHTML;
            simpleBox[redTokenPath[redPlayerTokenLoc[pno]]].innerHTML="<span onclick='moveRedToken(this,"+pno+")' class='red-token material-icons r'>hourglass_full</span>"+prevPlayer;
            playerMoves[0]=0;
        }
    }

    manageDiceRotation(0);
}



/*###################
###################
###################
###################
###################
###################
###################
###################
*/



function moveGreenToken(tokenObj,pno)
{
    if (playerMoves[1]===0)
    {
        return 0;
    }
    if(greenTokensState[pno]===1)
    {
        greenPlayerTokenLoc[pno]+=playerMoves[1];

        if(greenPlayerTokenLoc[pno]===56)
        {
            totalGreenTokensOut-=1;
            checkForWin('g');
            greenTokensState[pno]=0;
            tokenObj.style.display="none";
            return 0;
        }
        if(greenPlayerTokenLoc[pno]>56)
        {
            greenPlayerTokenLoc[pno]-=playerMoves[1];
            return 0;
        }

        highlightPlayersTokens(5);
        killToken(pno,1);
        playerMoves[1]=0;

        if(greenPlayerTokenLoc[pno]>-1)
        {
             prevPlayer=simpleBox[greenTokenPath[greenPlayerTokenLoc[pno]]].innerHTML;
        }

        for(let i=0;i<simpleBox.length;i++)
        {
            if(greenPlayerTokenLoc[pno]===i)
            {
                simpleBox[greenTokenPath[greenPlayerTokenLoc[pno]]].innerHTML="<span onclick='moveGreenToken(this,"+pno+")' class='green-token material-icons g'>hourglass_full</span>"+prevPlayer;
            }
            else
            {
                tokenObj.remove();
            }
        }

    }

    else
    {
        if(playerMoves[1]===6)
        {
            greenTokensState[pno]=1;
            greenPlayerTokenLoc[pno]+=1;
            tokenObj.remove();
            prevPlayer=simpleBox[greenTokenPath[greenPlayerTokenLoc[pno]]].innerHTML;
            simpleBox[greenTokenPath[greenPlayerTokenLoc[pno]]].innerHTML="<span onclick='moveGreenToken(this,"+pno+")' class='green-token material-icons g'>hourglass_full</span>"+prevPlayer;
            playerMoves[1]=0;
        }
    }

    manageDiceRotation(1);
}


/*###################
###################
###################
###################
###################
###################
###################
###################
*/

function moveBlueToken(tokenObj,pno)
{
    if (playerMoves[3]===0)
    {
        return 0;
    }
    if(blueTokensState[pno]===1)
    {
        bluePlayerTokenLoc[pno]+=playerMoves[3];

        if(bluePlayerTokenLoc[pno]===56)
        {
            totalBlueTokensOut-=1;
            checkForWin('b');
            blueTokensState[pno]=0;
            tokenObj.style.display="none";
            return 0;
        }
        if(bluePlayerTokenLoc[pno]>56)
        {
            bluePlayerTokenLoc[pno]-=playerMoves[3];
            return 0;
        }

        highlightPlayersTokens(5);
        killToken(pno,2);
        playerMoves[3]=0;

        if(bluePlayerTokenLoc[pno]>-1)
        {
             prevPlayer=simpleBox[blueTokenPath[bluePlayerTokenLoc[pno]]].innerHTML;
        }

        for(let i=0;i<simpleBox.length;i++)
        {
            if(bluePlayerTokenLoc[pno]===i)
            {
                simpleBox[blueTokenPath[bluePlayerTokenLoc[pno]]].innerHTML="<span onclick='moveBlueToken(this,"+pno+")' class='blue-token material-icons b'>hourglass_full</span>"+prevPlayer;
            }
            else
            {
                tokenObj.remove();
            }
        }

    }

    else
    {
        if(playerMoves[3]===6)
        {
            blueTokensState[pno]=1;
            bluePlayerTokenLoc[pno]+=1;
            tokenObj.remove();
            prevPlayer=simpleBox[blueTokenPath[bluePlayerTokenLoc[pno]]].innerHTML;
            simpleBox[blueTokenPath[bluePlayerTokenLoc[pno]]].innerHTML="<span onclick='moveBlueToken(this,"+pno+")' class='blue-token material-icons b'>hourglass_full</span>"+prevPlayer;
            playerMoves[3]=0;
        }
    }

    manageDiceRotation(3);
}


/*###################
###################
###################
###################
###################
###################
###################
###################
*/
function moveYellowToken(tokenObj,pno)
{
    if (playerMoves[2]===0)
    {
        return 0;
    }
    if(yellowTokensState[pno]===1)
    {
        yellowPlayerTokenLoc[pno]+=playerMoves[2];

        if(yellowPlayerTokenLoc[pno]===56)
        {
            totalYellowTokensOut-=1;
            checkForWin('y');
            yellowTokensState[pno]=0;
            tokenObj.style.display="none";
            return 0;
        }
        if(yellowPlayerTokenLoc[pno]>56)
        {
            yellowPlayerTokenLoc[pno]-=playerMoves[2];
            return 0;
        }

        highlightPlayersTokens(5);
        killToken(pno,3);
        playerMoves[2]=0;

        if(yellowPlayerTokenLoc[pno]>-1)
        {
             prevPlayer=simpleBox[yellowTokenPath[yellowPlayerTokenLoc[pno]]].innerHTML;
        }

        for(let i=0;i<simpleBox.length;i++)
        {
            if(yellowPlayerTokenLoc[pno]===i)
            {
                simpleBox[yellowTokenPath[yellowPlayerTokenLoc[pno]]].innerHTML="<span onclick='moveYellowToken(this,"+pno+")' class='yellow-token material-icons y'>hourglass_full</span>"+prevPlayer;
            }
            else
            {
                tokenObj.remove();
            }
        }

    }

    else
    {
        if(playerMoves[2]===6)
        {
            yellowTokensState[pno]=1;
            yellowPlayerTokenLoc[pno]+=1;
            tokenObj.remove();
            prevPlayer=simpleBox[yellowTokenPath[yellowPlayerTokenLoc[pno]]].innerHTML;
            simpleBox[yellowTokenPath[yellowPlayerTokenLoc[pno]]].innerHTML="<span onclick='moveYellowToken(this,"+pno+")' class='yellow-token material-icons y'>hourglass_full</span>"+prevPlayer;
            playerMoves[2]=0;
        }
    }

    manageDiceRotation(2);
}


/*###################
###################
###################
###################
###################
###################
###################
###################
*/


function killToken(pno,ID)
{
    if(ID===0)//if red player
    {
        if(safeBoxes.includes(redTokenPath[redPlayerTokenLoc[pno]]))//if token is at safe box
        {
            return 0;//dont kill the token
        }

        for(let i=0;i<4;i++)//for all four tokens of blue, green and yellow players
        {
            //read about which players token of these three is at same location where red has just reached
            var b ='<span onclick="moveBlueToken(this,'+i+')" class="blue-token material-icons b" style="z-index: 0;">hourglass_full</span>';
            var g ='<span onclick="moveGreenToken(this,'+i+')" class="green-token material-icons g" style="z-index: 0;">hourglass_full</span>';
            var y ='<span onclick="moveYellowToken(this,'+i+')" class="yellow-token material-icons y" style="z-index: 0;">hourglass_full</span>';       

            var ch=simpleBox[redTokenPath[redPlayerTokenLoc[pno]]].innerHTML;

            if(ch===g)//if one green token was already there
            {
                simpleBox[redTokenPath[redPlayerTokenLoc[pno]]].innerHTML="";
                greenPlayerTokenLoc[i]=-1;//kill that green token, send it back home
                greenTokensState[i]=0;//token is dead and back home
                tokensDiv[4+i].innerHTML=g;//to show token in home
                stepss=7;//this token cannot move around the board because its inside the home
                manageDiceRotation(0);
                return 1427;
            }
            else if(ch===b)
            {
                simpleBox[redTokenPath[redPlayerTokenLoc[pno]]].innerHTML="";
                bluePlayerTokenLoc[i]=-1;
                blueTokensState[i]=0;
                tokensDiv[8+i].innerHTML=b;
                stepss=7;
                manageDiceRotation(0);
                return 1427;
            }
            else if(ch===y)
            {
                simpleBox[redTokenPath[redPlayerTokenLoc[pno]]].innerHTML="";
                yellowPlayerTokenLoc[i]=-1;
                yellowTokensState[i]=0;
                tokensDiv[12+i].innerHTML=y;
                stepss=7;
                manageDiceRotation(0);
                return 1427;
            }
        }
    }


    else if(ID===1)//if green player
    {
        if(safeBoxes.includes(greenTokenPath[greenPlayerTokenLoc[pno]]))//if token is at safe box
        {
            return 0;//dont kill the token
        }

        for(let i=0;i<4;i++)
        {
            var b ='<span onclick="moveBlueToken(this,'+i+')" class="blue-token material-icons b" style="z-index: 0;">hourglass_full</span>';
            var r ='<span onclick="moveRedToken(this,'+i+')" class="red-token material-icons r" style="z-index: 0;">hourglass_full</span>';
            var y ='<span onclick="moveYellowToken(this,'+i+')" class="yellow-token material-icons y" style="z-index: 0;">hourglass_full</span>';           

            var ch=simpleBox[greenTokenPath[greenPlayerTokenLoc[pno]]].innerHTML;

            if(ch===r)
            {
                simpleBox[greenTokenPath[greenPlayerTokenLoc[pno]]].innerHTML="";
                redPlayerTokenLoc[i]=-1;
                redTokensState[i]=0;
                tokensDiv[0+i].innerHTML=r;
                stepss=7;
                manageDiceRotation(1);
                return 1427;
            }
            else if(ch===b)
            {
                simpleBox[greenTokenPath[greenPlayerTokenLoc[pno]]].innerHTML="";
                bluePlayerTokenLoc[i]=-1;
                blueTokensState[i]=0;
                tokensDiv[8+i].innerHTML=b;
                stepss=7;
                manageDiceRotation(1);
                return 1427;
            }
            else if(ch===y)
            {
                simpleBox[greenTokenPath[greenPlayerTokenLoc[pno]]].innerHTML="";
                yellowPlayerTokenLoc[i]=-1;
                yellowTokensState[i]=0;
                tokensDiv[12+i].innerHTML=y;
                stepss=7;
                manageDiceRotation(1);
                return 1427;
            }
        }
    }

    else if(ID===2)//if blue player
    {
        if(safeBoxes.includes(blueTokenPath[bluePlayerTokenLoc[pno]]))//if token is at safe box
        {
            return 0;//dont kill the token
        }

        for(let i=0;i<4;i++)
        {
            var g ='<span onclick="moveGreenToken(this,'+i+')" class="green-token material-icons g" style="z-index: 0;">hourglass_full</span>';
            var r ='<span onclick="moveRedToken(this,'+i+')" class="red-token material-icons r" style="z-index: 0;">hourglass_full</span>';
            var y ='<span onclick="moveYellowToken(this,'+i+')" class="yellow-token material-icons y" style="z-index: 0;">hourglass_full</span>';           

            var ch=simpleBox[blueTokenPath[bluePlayerTokenLoc[pno]]].innerHTML;

            if(ch===r)
            {
                simpleBox[blueTokenPath[bluePlayerTokenLoc[pno]]].innerHTML="";
                redPlayerTokenLoc[i]=-1;
                redTokensState[i]=0;
                tokensDiv[0+i].innerHTML=r;
                stepss=7;
                manageDiceRotation(3);
                return 1427;
            }
            else if(ch===g)
            {
                simpleBox[blueTokenPath[bluePlayerTokenLoc[pno]]].innerHTML="";
                greenPlayerTokenLoc[i]=-1;
                greenTokensState[i]=0;
                tokensDiv[4+i].innerHTML=g;
                stepss=7;
                manageDiceRotation(3);
                return 1427;
            }
            else if(ch===y)
            {
                simpleBox[blueTokenPath[bluePlayerTokenLoc[pno]]].innerHTML="";
                yellowPlayerTokenLoc[i]=-1;
                yellowTokensState[i]=0;
                tokensDiv[12+i].innerHTML=y;
                stepss=7;
                manageDiceRotation(3);
                return 1427;
            }
        }
    }


     else if(ID===3)//if yellow player
    {
        if(safeBoxes.includes(yellowTokenPath[yellowPlayerTokenLoc[pno]]))//if token is at safe box
        {
            return 0;//dont kill the token
        }

        for(let i=0;i<4;i++)
        {
            var g ='<span onclick="moveGreenToken(this,'+i+')" class="green-token material-icons g" style="z-index: 0;">hourglass_full</span>';
            var r ='<span onclick="moveRedToken(this,'+i+')" class="red-token material-icons r" style="z-index: 0;">hourglass_full</span>';
            var b ='<span onclick="moveBlueToken(this,'+i+')" class="blue-token material-icons b" style="z-index: 0;">hourglass_full</span>';

            var ch=simpleBox[yellowTokenPath[yellowPlayerTokenLoc[pno]]].innerHTML;

            if(ch===r)
            {
                simpleBox[yellowTokenPath[yellowPlayerTokenLoc[pno]]].innerHTML="";
                redPlayerTokenLoc[i]=-1;
                redTokensState[i]=0;
                tokensDiv[0+i].innerHTML=r;
                stepss=7;
                manageDiceRotation(2);
                return 1427;
            }
            else if(ch===g)
            {
                simpleBox[yellowTokenPath[yellowPlayerTokenLoc[pno]]].innerHTML="";
                greenPlayerTokenLoc[i]=-1;
                greenTokensState[i]=0;
                tokensDiv[4+i].innerHTML=g;
                stepss=7;
                manageDiceRotation(2);
                return 1427;
            }
            else if(ch===b)
            {
                simpleBox[yellowTokenPath[yellowPlayerTokenLoc[pno]]].innerHTML="";
                bluePlayerTokenLoc[i]=-1;
                blueTokensState[i]=0;
                tokensDiv[8+i].innerHTML=b;
                stepss=7;
                manageDiceRotation(2);
                return 1427;
            }
        }
    }
}


/*###################
###################
###################
###################
###################
###################
###################
###################
*/



var winSeq;

function checkForWin(playerr)
{
    if(playerr==='r')
    {
        if(totalRedTokensOut===0)
        {
            winningPositionPlayersArray.push(playerr);
            rpDice[0].style.display="none";
            winSeq=winningPositionPlayersArray.indexOf('r')+1;
            tokensHome[0].innerHTML="<img src='winImg"+winSeq+".png' class='winImg'>";
            stepss=7;
            playerMoves[0]=0;
            manageDiceRotation(0);
        }
    }

    if(playerr==='g')
    {
        if(totalGreenTokensOut===0)
        {
            winningPositionPlayersArray.push(playerr);
            gpDice[0].style.display="none";
            winSeq = winningPositionPlayersArray.indexOf('g')+1;
            tokensHome[1].innerHTML="<img src='winImg"+winSeq+".png' class='winImg'>";
            stepss=7;
            playerMoves[1]=0;
            manageDiceRotation(1);
        }
    }
    if(playerr==='y')
    {
        if(totalYellowTokensOut===0)
        {
            winningPositionPlayersArray.push(playerr);
            ypDice[0].style.display="none";
            winSeq = winningPositionPlayersArray.indexOf('y')+1;
            tokensHome[3].innerHTML="<img src='winImg"+winSeq+".png' class='winImg'>";
            stepss=7;
            playerMoves[2]=0;
            manageDiceRotation(2);
        }
    }
    if(playerr==='b')
    {
        if(totalBlueTokensOut===0)
        {
            winningPositionPlayersArray.push(playerr);
            bpDice[0].style.display="none";
            winSeq = winningPositionPlayersArray.indexOf('b')+1;
            tokensHome[2].innerHTML="<img src='winImg"+winSeq+".png' class='winImg'>";
            stepss=7;
            playerMoves[3]=0;
            manageDiceRotation(3);
        }
    }
}

