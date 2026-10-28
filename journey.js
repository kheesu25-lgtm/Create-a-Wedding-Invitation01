const screens={start:$('#start-screen'),game:$('#game-screen'),ending:$('#ending-screen')};
function showScreen(view){Object.entries(screens).forEach(([key,el])=>{el.hidden=key!==view});history.replaceState(null,'',location.pathname+location.search+'#'+(view==='game'?'invitation':view));window.scrollTo({top:0,behavior:'instant'});const target=screens[view].querySelector('button,h2');if(target)target.focus({preventScroll:true})}
function updateJourney(){const count=Number(filled.every(Boolean))+Number(memories.every(Boolean))+Number(path===4);$('#enter-ceremony').disabled=count<3;$('#journey-status').textContent=count===3?'모든 퍼즐을 완성했습니다.':'세 가지 퍼즐을 완성하면 마무리할 수 있습니다. ('+count+'/3)'}
$('#start-game').onclick=()=>showScreen('game');
$('#enter-ceremony').onclick=()=>{if(filled.every(Boolean)&&memories.every(Boolean)&&path===4)showScreen('ending')};
$('#return-start').onclick=()=>{$('#restart').click();showScreen('start')};
const existingComplete=complete;complete=function(i){existingComplete(i);updateJourney()};
const originalResetRoute=$('#reset-route').onclick;$('#reset-route').onclick=()=>{originalResetRoute();updateJourney()};
const originalUpload=$('#upload').onchange;$('#upload').onchange=e=>{originalUpload(e);updateJourney()};
const originalRestart=$('#restart').onclick;$('#restart').onclick=()=>{originalRestart();updateJourney()};
updateJourney();showScreen('start');

$('[data-rsvp="yes"]').onclick=()=>showScreen('ending');
