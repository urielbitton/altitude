//Automations JS

function addItemEveryXTime(title) {
    $(`<div class="automatwindow"><i class="close"></i><h6>`+title+`</h6>
    <div><label>Table</label><select class="choosetable" multiple></select></div>
    <div><label>Item</label><input class="itemtitle" placeholder="Item name"></div>
    <div><label>Time Period</label><select class="timeselect"><option value="10000">Every 10 seconds</option><option value="600000">Every 10 minutes</option><option value="600000">Every 1 hour</option><option value="600000">Every day</option><option value="600000">Every week</option><option value="600000">Every month</option></select></div>
    <button class="applyautomat">Create Automation</button></div>`).appendTo('.automatbox'); 
    var numoftables = $('.projtemplate table').length;
    for(i=1;i<=numoftables;i++) {
        $('<option value="'+i+'">Table '+(i)+'</option>').appendTo('.choosetable');
    } 
    var timeperiod = 600000; var tablenum = 1; var itemtitle = '';
    $(document).on('change','select,input', function() {
        timeperiod = $('.timeselect option:selected').val();
        tablenum = $('.choosetable option:selected').val();
        itemtitle = $('.itemtitle').val();
    });     
    $(document).on('click', '.applyautomat', function() {        
        setInterval(function() {
            $('<tr><td><i class="fas fa-pen"></i><span>Item title</span></td><td class="teamtd"><i class="fas fa-user-plus"></i></td><td class="statustd"><div class="activestatus" data-status="0"><em>Not Started</em><i class="fas fa-angle-down"></i></div></td><td class="datetd"><input type="date" value="'+tableDate()+'" min="'+tableDate()+'"</td><td class="progtd"><div class="progbar" data-percent="0"><div class="progpercent"><small><i class="fas fa-minus minprog"></i><i class="fas fa-plus plusprog"></i></small></div></div></td><td><i class="fas fa-trash trashrow"></i><i class="fas fa-ellipsis-v"></i></td></tr>').insertBefore('.projtemplate table:nth-of-type('+tablenum+') tr:last-child');
            saveProj();
        },timeperiod); 
        var projname = $(this).parents('.projtemplate').find('.projname span').html();
        var msg = 'A new automation has been added to project '+projname;
        smallNotif(msg);
        $('.automatwindow').fadeOut();
        setTimeout(function() { $('.automatbox > .close').trigger('click'); },20)
    });  
}    
     
 
function assignMember(title) {
    $('<div class="automatwindow"><i class="close"></i><h6'+title+'</h6></div>').appendTo('.automatbox');
}

 

 

//small notifs
function smallNotif(msg) {
    smallnotif = '<div class="smallnotif">'+msg+'</div>';
    home.append(smallnotif);
    setTimeout(function() { $('.smallnotif').fadeOut(100); },4500);
    setTimeout(function() { $('.smallnotif').remove(); },4700);
}
//table dat for this js file
function tableDate() {
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    return output;
}
//save proj func for this js file
function saveProj() {
    $('.saveproject').trigger('click');
    $('.memsize').html(memsize); //update memory used
} 
































