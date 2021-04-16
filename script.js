
function benderGame(choosenHero) {
    var yourChar, comChar, yourname;
    console.log('Your Character is', choosenHero);
    yourChar = choosenHero.id;
    comChar = computerChar(randomChar());
    console.log('Computer Character is:', comChar);
    res = bendWinner(yourChar, comChar);
    console.log(res);
    messageresult = bendWinnerRltMsg(res);
    console.log(messageresult)
    resultDiv(choosenHero.id, comChar, messageresult);
    yourname = setUserName();
    document.getElementById('choose').remove();

}


function setUserName() {
    const myName = prompt('Please enter your name.');
    const createh1 = document.createElement("h1");
    const div = document.getElementById('name-container');

    if(!myName) {
      setUserName();
    } else {
      localStorage.setItem('name', myName);
      createh1.innerHTML = 'Welcome ' + myName + ', Please Click fight to proceed this match up';
      div.appendChild(createh1);
    }
  }
  
  if(!localStorage.getItem('name')) {
    setUserName();
  } else {
    let storedName = localStorage.getItem('name');
    createh1.innerHTML = 'Welcome' + storedName + ', Please Click fight to proceed this match up';
    div.appendChild(createh1);

  }


function computerChar(character) {
    return ['air','earth','fire','water'][character];
}

function randomChar() {
    return Math.floor(Math.random() * 4);
}

function bendWinner(yourChar, comChar) {
    const libCharElements = {
        'air': {'fire': 2, 'water': 1.5, 'air': 1.5, 'earth': 0},
        'earth': 
        {'fire': 2, 'earth': 1.5, 'water': 0, 'air': 0 },
        'fire': {
            'water': 0, 'earth': 0, 'fire' : 1.5, 'air': 0
        },
        'water': {
            'fire': 2, 'water': 1.5, 'earth':2,
            'air': 1.5
        }
    };

    const charScore = libCharElements[yourChar][comChar];
    const comScore = libCharElements[comChar][yourChar];

    return [charScore,comScore];
}

function bendWinnerRltMsg([charScore,comScore]) {
    if (charScore === 0 && charScore === 1 && comScore === 2 && comScore === 3) {
        return{'messageresult' : 'You Lost', 'color': 'red'}
    
    }else if(charScore === 0 && comScore > 1.5) {
        return {'messageresult' : 'You Lost', 'color': 'red'}
    }else if (charScore === 1.5 && comScore === 1.5) {
        return {'messageresult' : 'This Match is DRAW!', 'color': 'yellow'}
    }else if (charScore === 0 && comScore ===0){
        return {'messageresult' : 'This Match is DRAW!', 'color': 'yellow'}
    }else {
        return {'messageresult': 'You Win Congrats', 'color': 'blue'}
    }
}

function resultDiv(yourElement, comElement, msg) {



    const elementDb = {
        'air': document.getElementById('air').src,
        'earth': document.getElementById('earth').src,
        'fire': document.getElementById('fire').src,
        'water': document.getElementById('water').src
    }

    document.getElementById('air').remove();
    document.getElementById('earth').remove();
    document.getElementById('fire').remove();
    document.getElementById('water').remove();
    document.getElementById('removeh2').remove();
   
   

    const btn = document.createElement('button');
    const playerDiv = document.createElement('div');
    const msgDiv = document.createElement('div');
    const comDiv = document.createElement('div');
    
    const benderGameDiv = document.getElementById('bender-game-div')
    const forBtn = document.getElementById('forbutton');
    const img = document.createElement('img');
    img.src = "img/test.jpg";

    btn.innerHTML = "<button>FIGHT</button>"
    playerDiv.innerHTML = "<img src='" + elementDb[yourElement] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(158, 151, 71, 1);'>"
    msgDiv.innerHTML = "<h1 style = 'color:" + msg['color'] + "; font-size: 50px padding:15px; '>" + msg['messageresult'] + "</h1>"
    comDiv.innerHTML = "<img src='" + elementDb[comElement] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"



    //this is for fething the username




    forBtn.appendChild(btn);

      btn.addEventListener('click', () => {
        document.querySelector('button').remove();
        forBtn.appendChild(msgDiv);
        document.getElementById("name-container").remove();
    })

  
    benderGameDiv.appendChild(playerDiv);
    benderGameDiv.appendChild(comDiv);
        
   
} 

