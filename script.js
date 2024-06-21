function Player(name, marker)
{
    this.name=name;
    this.marker=marker;
    this.turn=false;
}
var s1=0,s2=0,gameOnGoing=false,count=0;
const player1=new Player("","");
const player2=new Player("","");
const gameBoard=(function(){
    const aa=ab=ac=ba=bb=bc=ca=cb=cc="e";
    return {aa,ab,ac,ba,bb,bc,ca,cb,cc};
})();
    var p1NameInput=document.querySelector("#namePlayer1");
    var p2NameInput=document.querySelector("#namePlayer2");
    var p1NameScore=document.querySelector("#name1");
    var p2NameScore=document.querySelector("#name2");
    var p1Marker=document.querySelector("#markerPlayer1");
    var p2Marker=document.querySelector("#markerPlayer2");
    var p1Score=document.querySelector("#score1");
    var p2Score=document.querySelector("#score2");
    var p1Choice=document.querySelector("#choicePlayer1");
    var p2Choice=document.querySelector("#choicePlayer2");
    var display=document.querySelector(".display");
    var info=document.querySelector(".info_name");
const b=document.querySelectorAll(".game_b");
for(var i=0;i<b.length;i++)
    {
        b[i].addEventListener("click",function(e){
            if(gameOnGoing)
                {
            var a=e.target.id;
            if(player1.turn&&gameBoard[a]=="e")
                {
                    e.target.style.color="rgb(0,0,139)";
                    e.target.textContent=player1.marker;
                    gameBoard[a]=player1.marker;
                }
            else if(player2.turn&&gameBoard[a]=="e")
                {
                    e.target.style.color="rgb(139,23,0)";
                    e.target.textContent=player2.marker;
                    gameBoard[a]=player2.marker;
                }
                count++;
            var flag=gameEnd(count);
            if(flag==1)
                {
                    display.textContent=`${(player1.turn)?player1.name:player2.name} wins!`;
                    if(player1.turn)
                        {
                            s1++;
                            p1Score.textContent=s1.toString();
                        }
                    else if(player2.turn)
                            {
                                s2++;
                                p2Score.textContent=s2.toString();
                            }
                    count=0;
                    gameOnGoing=false;
                    enable();
                }
            else if(flag==2)
                {
                    display.textContent=`It's a tie!`;
                    count=0;
                    gameOnGoing=false;
                    enable();
                }
            else if(flag==3)
                {
                    if(player1.turn)
                        {
                            player1.turn=false;
                            player2.turn=true;
                            p1Choice.checked=false;
                            p2Choice.checked=true;
                        }
                    else if(player2.turn)
                            {
                                player2.turn=false;
                                player1.turn=true;
                                p2Choice.checked=false;
                                p1Choice.checked=true;
                            }
                }
            }
        });
    }
function Game()
{
    reset();
    checkValidity();
    gameOnGoing=true;
    player1.name=p1NameInput.value;
    player2.name=p2NameInput.value;
    player1.marker=p1Marker.value;
    player2.marker=p2Marker.value;
    p1NameInput.disabled=true;
    p2NameInput.disabled=true;
    p1Marker.disabled=true;
    p2Marker.disabled=true;
    p1Choice.disabled=true;
    p2Choice.disabled=true;
    info.style.backgroundColor="gray";
    p1NameScore.textContent=player1.name;
    p2NameScore.textContent=player2.name;
    p1Score.textContent=s1.toString();
    p2Score.textContent=s2.toString();
    player1.turn=p1Choice.checked;
    player2.turn=p2Choice.checked;
}
function checkValidity()
{
    var flag=false;
    if(p1Marker.value==p2Marker.value)
        flag=true;
    if(p1Marker.value.length>1||p2Marker.value.length>1)
        flag=true;
    if(p1Marker.value!="X"&&p1Marker.value!="O")
        flag=true;
    if(p2Marker.value!="X"&&p2Marker.value!="O")
        flag=true;
    if(flag)
        {
            p1Marker.value="X";
            p2Marker.value="O";
        }
    if(p1NameInput.value==null||p1NameInput.value==""||p1NameInput.value.trim()=="")
        p1NameInput.value="Player 1";
    if(p2NameInput.value==null||p2NameInput.value==""||p2NameInput.value.trim()=="")
        p2NameInput.value="Player 2";
    if(p1Choice.checked==p2Choice.checked)
        {
            p1Choice.checked=true;
            p2Choice.checked=false;
        }
}
function gameEnd(count)
{
    if((gameBoard.aa==gameBoard.ab&&gameBoard.ab==gameBoard.ac&&gameBoard.ac!="e")||(gameBoard.ba==gameBoard.bb&&gameBoard.bb==gameBoard.bc&&gameBoard.bc!="e")||(gameBoard.ca==gameBoard.cb&&gameBoard.cb==gameBoard.cc&&gameBoard.cc!="e")||(gameBoard.aa==gameBoard.ba&&gameBoard.ba==gameBoard.ca&&gameBoard.ca!="e")||(gameBoard.ab==gameBoard.bb&&gameBoard.bb==gameBoard.cb&&gameBoard.cb!="e")||(gameBoard.ac==gameBoard.bc&&gameBoard.bc==gameBoard.cc&&gameBoard.cc!="e")||(gameBoard.aa==gameBoard.bb&&gameBoard.bb==gameBoard.cc&&gameBoard.cc!="e")||(gameBoard.ac==gameBoard.bb&&gameBoard.bb==gameBoard.ca&&gameBoard.ca!="e"))
        return 1;
    else if(count==9)
        return 2;
    else
    return 3;
}
function clearBoard()
{
    display.textContent="";
    gameBoard.aa=gameBoard.ab=gameBoard.ac=gameBoard.ba=gameBoard.bb=gameBoard.bc=gameBoard.ca=gameBoard.cb=gameBoard.cc="e";
    for(var i=0;i<b.length;i++)
        b[i].textContent=null;
}
function reset()
{
    enable();
    clearBoard();
    count=0;
    gameOnGoing=false;
}
function enable()
{
    info.style.backgroundColor="white";
    p1NameInput.disabled=false;
    p2NameInput.disabled=false;
    p1Marker.disabled=false;
    p2Marker.disabled=false;
    p1Choice.disabled=false;
    p2Choice.disabled=false;
}
function resetScore()
{
    p1Score.textContent="0";
    p2Score.textContent="0";
    s1=0;
    s2=0;
    reset();
}