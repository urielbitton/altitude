/*Bugs & Challenges
Challenges:
1. Adding members feature in general is buggy
2. Duplicating projects - issues arise
*/
  
$(document).ready(function() {
     
var homebox = $('.homeapp .box');
var homeapp = $('.homeapp');     
var exit = $('.exit');    
var logo = $('.logo');    
var profdropdown = $('.profdropdown');    
var profilediv = $('.profilediv');    
home = $('.home');
var sidebar = $('.sidebar');    
var newproject = $('.newproject');    
var newprojectbox = $('.newprojectbox');    
var appbox = $('.appbox');    
var createprojbtn = $('.createprojbtn');    
var loader = $('.loader');    
var projects = $('.projects');    
var projnumreq = 1;    
var projid = 1;
var protoid;    
var delrow, deltable;    
var dashdate = $('.dashdate');
var dashbtn = $('.dashbtn');  
var createbtn = $('.createbtn');    
var projname, projcateg, projcolor, thisprojname,thisproj,thisproto,protoname;      
var prototypes = $('.prototypes');  
var myprojectscont = $('.myprojectscont');    
var protocont = $('.protocont');    
var comp = $('.compcenter .comp');    
var tempid = 0;    
var teamname = '';
var teamarr = []; 
var teamimgarr = [];     
var tablehelphide = $('.tablehelphide').html();     
var totaltasks = 1;
var innerrightcopy,thismemberid;     
var additeminp = '';         
        
     
    
$('.menu h4').on('click', function() {
    $('.menu h4').removeClass('activemenu');
    var that = $(this);
    setTimeout(function() { that.addClass('activemenu'); },10)
    $('.activemenu').css('color','');
    $('.activemenu hr').css('opacity','0');
    $('.menu h4').removeClass('activemenu');
    if($(this).hasClass('activemenu')) {
        $('.activemenu').css('color','var(--color)');
        $('.activemenu hr').css('opacity','1');
    }
});   
    
    
//convert month num to text
nmonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
      
//dashboar date func     
function dashDate() {
    var date = new Date();
    month = nmonth[date.getMonth()];
    var day = date.getUTCDate();
    var year = date.getFullYear();
    return month+' '+day+', '+year;
}     
//init date on dashboard    
dashdate.find('span').html(dashDate());        
     
//logo click    
logo.on('click', function() {
    $('.app').fadeOut(0);
    setTimeout(function() { $('.homeapp,.dashboard').fadeIn(10); },50)
});    
//exit btn click    
exit.on('click', function() {
    location.href = 'index.html';
});      
      
//dashbtn click    
$('.dashbtn').on('click', function() {
    $('.app').fadeOut(10);
    setTimeout(function() { $('.dashboard').fadeIn(0); },50);
});   
    
//profile pic uploader
document.getElementById('profilepic').addEventListener('change', uploadPic, true);
function uploadPic(){
   var file = document.getElementById("profilepic").files[0];
   var reader = new FileReader();
   reader.onloadend = function(){
       $('.profpicfill').attr('src',reader.result);    
       localStorage.profpic = reader.result;
   }
   if(file) {
      reader.readAsDataURL(file);
    } 
}     
//load prof pic 
if(typeof localStorage.profpic == 'undefined' || typeof localStorage.profpic == null) {
    $('.profpicfill').attr('src','images/prof.png'); 
}   
else {
     $('.profpicfill').attr('src',localStorage.profpic);
}    
    
//profilediv slide down on click 
var profclick = false;    
profilediv.on('click', function() {
    if(profclick == false) {
        profdropdown.css({'visibility':'visible','top':'60px','opacity':'1'});
        profclick = true;
    }
    else {
        profdropdown.css({'visibility':'','top':'','opacity':''});
        profclick = false; 
    }
});    
$('.home, .sidebar,.projectsnav').on('click', function() {
    profdropdown.css({'visibility':'','top':'','opacity':''});
    profclick = false;  
});  
    
    
//store and load project ids      
if(typeof localStorage.protoid == 'undefined' || typeof localStorage.protoid == null) {protoid = 1}    
else {protoid = localStorage.protoid;}        
    
//create project btn
createprojbtn.on('click', function() {
    //input validation
    if( !$('.addprojbox').find('input').val() ) {
        var msg = '<small>Required Field</small><p>You need to a project name.</p><button class="notifbtn okbtn">Ok</button>';
        dropNotif(msg);
    }  
    else {
        $('.newboxcont').fadeOut();
        $('.myprojbtn').trigger('click');
        projname = $('.projnameinp').val();
        projcateg = $('.projcateginp').val();
        projcolor = $('.projcolor').val();
        localStorage.projname = projname;
        showLoader(600);
        for(i=1;i<=20;i++) {
            if($('.projects [data-projid='+i+']').length) {
                //if project exists, do nothing

            }
            else {
                projid = i; //if it project doesnt exist, give it an  id that isn't taken up
                break;
            } 
        }       
        setTimeout(function() { 
        $('.projects,.myprojectscont').append('<div data-projid="'+projid+'" class="indivproj projid'+projid+'" style="border-left:5px solid '+projcolor+'"><span>'+projname+'</span> <i class="fas fa-ellipsis-h"></i><div class="innerproj"></div></div>');
        $('.projname').html(projname);    
        $('.indivproj').trigger('click'); //trigger open project                   
        $('.projtemplate').html(`<div data-projpageid="`+projid+`" id="projpage`+projid+`"><div class="projtitles"><h3 class="projname"><div class="projlogo" style="background:`+projcolor+`"></div><span>`+projname+`</span></h3> <h6 class="projtype"><a><i class="fas fa-pen"></i><span class="projdescript">Edit project description</span></a></h6><small class="viewteam"><i class="fas fa-users"></i>Team Members</small><div class="viewteamdiv"><input type="text" placeholder="Find Member"><span class="viewaddteam"><i class="fas fa-user-plus"></i>Add Member</span></div><small class="editprojinfo"><i class="fas fa-pen"></i>Edit Info</small><small class="reordertasks"><i class="fas fa-sort"></i>Reorder Tasks</small><small class="createautomat"><i class="fas fa-robot"></i>Create Automation</small><small class="tablehelp"><i class="fas fa-info"></i>Help & Info</small> </div><button class="addtemplatebtn"><i class="fas fa-puzzle-piece"></i>Template</button><hr class="titlesep">  
          
        <div class="scrollableinner"><table data-tableid="0" class="projtable" id="projtable"><div class="tablesearch"><input placeholder="Filter table"></div><tr><td><div><i class="fas fa-table tablemenu"></i><div class="tableoptions"><h6><i class="fas fa-edit"></i>Edit Headers</h6><h6><i class="fas fa-copy"></i>Duplicate</h6><h6><i class="fas fa-palette"></i>Table Color</h6><h6><i class="fas fa-trash"></i>Delete Table</h6></div><div></td></tr><tr> <th>Task</th> <th>Team Members</th> <th>Status</th> <th>Due On</th> <th>Progress</th> <th>Files</th><th></th> </tr><tr class="regrow"><td><i class="fas fa-pen"></i><span></span></td><td class="teamtd"><i class="fas fa-user-plus"></i></td><td class="statustd"><div class="activestatus" data-status="4"><em>Not Started</em><i class="fas fa-angle-down"></i></div></td><td class="datetd"><input type="date" value="`+tableDate()+`" min="`+tableDate()+`"></td><td class="progtd"><div class="progbar" data-percent="0"><div class="progpercent"><small><i class="fas fa-minus minprog"></i><i class="fas fa-plus plusprog"></i></small></div></div></td><td></td><td></td></tr><tr><td class="additemtd"><input placeholder="Item title"><i class="fas fa-plus additembtn"></i></td></tr></table> <button class="saveproject saveproj`+projid+`">Save Project</button><small class="smallsave"><i class="fas fa-save"></i>Save</small><small class="exporttable"><i class="fas fa-table"></i>Export to Excel</small></div></div> 
          
        <div class="newboxcont editproj"> <div class="newbox"> <i class="close closebox"></i> <h2>Edit Project</h2> <div class="clear"></div><input class="projnameinp" type="text" placeholder="Project Name"> <small class="info">Edit project details.</small> <label class="projcolorcont" for="projcolor"><input class="projcolor" id="projcolor" type="color" value="#5526ff"></label><br><label>Project Color</label> <small class="cancel closebox">Cancel</small><button class="editprojbtn">Edit Project</button> </div><div class="newboxclose"></div></div>
        
        <div class="projinfobox"><i class="close closebox"></i><h4><i class="fas fa-info"></i>Project Info</h4><div><h6>Project Name</h6><p class="projnamefill">`+projname+`</p></div><div><h6>Project Template</h6><p class="projtypefill">General Template</p></div><div><h6>Members</h6><p><span class="totalmembersfill">0</span> members on this project</p></div><div><h6>Total Tasks</h6><p><span class="totaltasksfill">`+totaltasks+`</span> tasks in project</p></div><div><h6>Tasks Completed</h6><p>0 tasks completed in total</p></div><div class="nspace"></div>`+tablehelphide+`
        </div>  
     
        <div class="availmemberscont"><div class="availmembers"> <h4>Add Members</h4><div class="availdescript"> <small>Add members to this project first to add them to this task.</small> <small style="border: 2px dotted #ccc;">Add Members</small> </div><div class="availinner"> </div><button style="left:30px">Done</button><button style="right:30px">Cancel</button></div></div>

        <div class="automatcont"><div class="automatbox"><i class="close"></i><h4>Automations Center</h4><div class="automatinner"><h5>Automations</h5> <hr> <div><img src="images/compcenter/ab1.jpg"/><h6>Add an item every <span>time</span> period</h6><small data-automat="1">Add Automation</small></div><div><img src="images/compcenter/ab2.jpg"/><h6>Automatically assign new task to a <span>member</span></h6><small data-automat="2">Add Automation</small></div><h5>My Automations</h5> <hr></div></div></div>
        `);           
        $('.projtable th:not(th:last-child)').append('<i class="fas fa-angle-down thdrop"></i>'); 
        $('.projtable tr td:nth-last-child(2)').append('<i class="fas fa-paperclip"></i>'); $('.projtable .regrow td:last-child').append('<i class="fas fa-trash"></i>')  
        },500);   
        setTimeout(function() { 
            $('.myprojectscont .projid'+projid+' .innerproj').html('<h6>App</h6><small><em class="totalmembersfill">0</em> team members</small><small><em class="totaltasksfill">0</em> tasks</small>'); 
            $('.projnameinp').val(projname);
            $('.projcateginp').val('');
            $('.projcolor').val(projcolor);
            $('.projnumfill').html($('.projects').find('.indivproj').length);
            saveProj(); 
            saveProjConts(); 
        },1000);
        setTimeout(function() { projid = -1; },1050);
        //add project to recents in dashboard
        $('<tr><td>'+projname+'</td><td><span>App</span></td><td><div class="progbar" data-percent="0"><div class="progpercent"></div></div></td><td>0%</td></tr>').insertAfter($('.recentproj table tr:first-child'));
        if($('.recentproj table tr').length > 6) {
            $('.recentproj table tr:last-child').remove();
        }
        setTimeout(function() { saveDash(); },30);
    }          
          
});      
    
//create prototype btn
$('.createprotobtn').on('click', function() {
    if( !$('.addprotobox').find('input').val() ) {
        var msg = '<small>Required Field</small><p>You need to add a prototype name.</p><button class="notifbtn okbtn">Ok</button>';
        dropNotif(msg);
    } 
    else {
    $('.newboxcont').fadeOut();
    $('.addprotobox').fadeOut(0);
    $('.protobtn').trigger('click');
    protoname = $('.protonameinp').val();
    protocompnum = $('.protobox').length;
    if(protoid != 1) {
            for(i=1;i<=20;i++) {
                if($('.prototypes [data-protoid='+i+']').length) {
                    //if prototype exists, do nothing
                     
                }
                else {
                    protoid = i; //if it project doesnt exist, give it an  id that isn't taken up
                    break;
                }  
            }
        }    
    localStorage.protoid = protoid;
    showLoader(600);
    setTimeout(function() {  
    $('.prototypes,.protocont').append('<div data-protoid="'+localStorage.protoid+'" class="indivproto protoid'+localStorage.protoid+'"><span>'+protoname+'</span> <i class="fas fa-ellipsis-h"></i></div>');  
    $('.protocont .protoid'+localStorage.protoid).append('<i class="fas fa-atom"></i><small>'+protocompnum+' Components</small>');      
    $('.protoname').html(protoname);    
    $('.indivproto').trigger('click');    
    $('.prototemplate').html(`<div id="protopage`+localStorage.protoid+`"><div class="prototitles"><h3 class="protoname"><img class="protologo" src="images/protoicon.png"/><span>`+protoname+`</span></h3> <h6 class="protoptype">App Prototype -<small> 0 Members </small> - <small class="editprotoinfo">Edit Info</small></h6></div><button class="addcomp"><i class="fas fa-plus"></i>Add Component</button><div class="spacers"></div><button class="saveproto"><i class="fas fa-save"></i>Save Prototype</button><button class="saveprototype saveproto`+localStorage.protoid+`">Save</button></div><div class="protoboard"></div>
    `);   
    protoid = -1;    
    },500);   
    setTimeout(function() { 
        localStorage.prototypes = $('.prototypes').html(); 
        localStorage.prototypescont = $('.protocont').html();
        $('.protonumfill').html($('.prototypes').find('div').length);
        saveProto(); 
    },1000);    
        
    }
});      
    
//create team btn
$('.createteambtn').on('click', function() {
    if( !$('.addteambox').find('input').val()) {
        var msg = '<small>Required Field</small><p>You need to add a team name.</p><button class="notifbtn okbtn">Ok</button>';
        dropNotif(msg);
    } 
    else { 
    teamname = $('.teamnameinp').val();
    localStorage.selectid = $('.addteambox').find('select').val();
    setTimeout(function() { 
        $('.newboxcont').fadeOut(30); 
        saveProj();
    },10); 
    setTimeout(function() { 
        $('.projid'+localStorage.selectid).trigger('click'); 
    },30);
    setTimeout(function() {
         for(i=0;i<teamarr.length;i++) {
             $('#projpage'+localStorage.selectid+' .viewteamdiv').append('<span><img src="'+teamimgarr[i]+'" />'+teamarr[i]+'</span>');
         }  
         saveProj();
        $('.addteambox').find('select option').remove();
    },100);  
    setTimeout(function() { teamarr = []; teamimgarr = [] },500);    
    var msg = '<i class="fas fa-check"></i> Team '+teamname+' has just been added to project '+$('.projid'+localStorage.selectid+' span').html()+'.';
    smallNotif(msg);    
    }
     
});     
    
function saveDash() {
    localStorage.dashsaves = $('.dashsave').html();
}    
if(typeof localStorage.dashsaves == 'undefined' || typeof localStorage.dashsaves == null) {}  else {
    $('.dashsave').html(localStorage.dashsaves); 
}  
     
//count num of projects   
setTimeout(function() {
    $('.projnumfill').html($('.projects > div').length); 
    $('.protonumfill').html($('.prototypes > div').length);
},200);
    
//load projects and prototypes from memory
projects.html(localStorage.projects); 
myprojectscont.html(localStorage.myprojcont);     
prototypes.html(localStorage.prototypes);  
protocont.html(localStorage.prototypescont);    
     
$(document).on('click','.tablehelp', function() {
    $('.projinfobox').fadeIn(50);
    setTimeout(function() { $('.projinfobox').css('transform','scale(1)'); },60);  
    $('.totalmembersfill').html($('.viewteamdiv').find('span').length-1);
});  
$(document).on('click', function() {
    $('.projinfobox').fadeOut(50);
    $(document).on('click','.projinfobox, .tablehelp', function(e) {
       $('.projinfobox').fadeIn(0);
        e.stopImmediatePropagation();
    }); 
});      
    
$(document).on('click','.projinfobox .close', function() {
    $('.projinfobox').css('transform','');
    setTimeout(function() { $('.projinfobox').fadeOut(50); },50)
});     
      
    
//loader function
function showLoader(delay) {
    loader.fadeIn(100);
    setTimeout(function() { loader.fadeOut(50) },delay)
}    
    
//selector deselect team members for project   
$(document).on('click','.teamdiv p', function() {
    if($(this).find('i').hasClass('fa-plus')) {
        $(this).find('i').removeClass('fa-plus').addClass('fa-check');
        $(this).find('i').css({'background':'var(--color)','color':'#fff'});
        if(teamarr.indexOf($(this).find('span').html()) > -1) {     
        } //if duplicate, do nothing
        else {
           teamarr.push($(this).find('span').html()); 
           teamimgarr.push($(this).find('img').attr('src'));     
        }
    }  
    else {
        $(this).find('i').removeClass('fa-check').addClass('fa-plus');
        $(this).find('i').css({'background':'#eee','color':'#000'});
        if(teamarr.indexOf($(this).find('span').html()) > -1){
        teamarr.splice(teamarr.indexOf($(this).find('span').html()),1); teamimgarr.splice(teamimgarr.indexOf($(this).find('img').attr('src')),1);    
        }
        else {
            teamarr.push($(this).find('span').html());
            teamimgarr.push($(this).find('img').attr('src'));
        }  
    }  
});     

    
//add team members to project of choice
$(document).on('click','.addmemberscont small', function() {
    $('.addmemberscont').fadeOut(30);
    setTimeout(function() {
        $('.addmemberscont').remove();
    },50);
});      
          
//drop notifs func     
function dropNotif(msg) {
    notif = '<div class="notifcont"><div class="notif">'+msg+'</div></div>';
    home.append(notif);
    setTimeout(function() { $('.notifcont').css({'top':'10px','opacity':'1'}) },50); 
}     
    
function smallNotif(msg) {
    smallnotif = '<div class="smallnotif">'+msg+'</div>';
    home.append(smallnotif);
    setTimeout(function() { $('.smallnotif').fadeOut(100); },4500);
    setTimeout(function() { $('.smallnotif').remove(); },4700);
}
     
$(document).on('click', '.smallsave', function() {
    var msg = '<i class="fas fa-save"></i> We successfully saved your project!';
    smallNotif(msg);
    saveProj();
});    
     
//close notif on click of any notif btn    
$(document).on('click','.notifbtn', function() {
    setTimeout(function() { $('.notifcont').css({'top':'','opacity':'','z-index':'-1'}) },10);
    setTimeout(function() { $('.notifcont').remove(); },1000);
});  
         
        
//open project template div from either indivproj btns
$(document).on('click','.indivproj', function() {
    $('.menu h4').removeClass('activemenu'); 
    $('.app').fadeOut(30);
    setTimeout(function() { 
        $('.projtemplate').fadeIn(10); 
    },300);
    $('.myprojbtn').addClass('activemenu');
    localStorage.selectid = $(this).attr('data-projid'); 
    localStorage.projname = $(this).find('span').html();
});       
//open prototype template div from either indivproto btns
$(document).on('click', '.indivproto', function() {
    $('.menu h4').removeClass('activemenu'); 
    $('.protobtn').addClass('activemenu');
    $('.app').fadeOut(30);
    //make protobox draggable and resizable
    $('.protobox').draggable({ handle: '.protoboxhead',containment: "parent" });
    $('.protobox').resizable({animate: true}); 
    setTimeout(function() {                 
        $('.prototemplate').fadeIn(10);
        $('.saveprototype').fadeIn(); 
    },300); 
});         
    
//save protoboard on mouseout of board    
$(document).on('mouseleave','.protoboard', function() { saveProto() }); 
//save project page on mouseout of project page
$(document).on('click','.projtable .fa-pen', function() { saveProj() });  
     
     
//3 dots (options) click of indivproj
$(document).on('click', '.projects .indivproj i', function(e) {
    $('.indivprojmenu').fadeOut(0);
    var that = $(this);
    that.parent().append('<div class="indivprojmenu"><h6><i class="fas fa-edit"></i>Edit Project</h6><hr><h6><i class="fas fa-bell"></i>Turn off notifications</h6><h6><i class="fas fa-atom"></i>Link to Prototype</h6><h6><i class="fas fa-copy"></i>Duplicate</h6><hr><h6><i class="fas fa-trash"></i>Delete</h6></div>'); 
    e.stopImmediatePropagation();
});     
//3 dots (options) click of indivproto
$(document).on('click', '.prototypes .indivproto i', function(e) {
    $('.indivprotomenu').fadeOut(0);
    var that = $(this);
    that.parent().append('<div class="indivprotomenu"><h6><i class="fas fa-edit"></i>Edit Prototype</h6><h6><i class="fas fa-font"></i>Rename</h6><hr><h6><i class="fas fa-bell"></i>Turn off notifications</h6><h6><i class="fas fa-atom"></i>Link to Project</h6><h6><i class="fas fa-copy"></i>Duplicate</h6><hr><h6><i class="fas fa-trash"></i>Delete</h6></div>'); 
    e.stopImmediatePropagation();
});      
  
/* code to close element by clicking outside of it    
$(document).on('click', 'body', function() {
    $(document).on('click', '.viewteam', function(e) {
        $('.viewteamdiv').fadeIn(10);  
        e.stopImmediatePropagation();
    });   
    $('.viewteamdiv').fadeOut(10);  
});      
*/
    
//all clicks that should dissapear on anywhere click incl that div itself    
$('body').on('click', function() {
    $('.indivprojmenu').fadeOut(10);
    $('.indivprotomenu').fadeOut(10);
});    
    
//progress bar js 
$('.progpercent').css('width', function() {
    return $(this).parent().attr('data-percent')+'%';
});
     
//edit row btn       
$(document).on('click','.editrow', function() {
    if($(this).hasClass('fa-edit')) {
        $(this).removeClass('fa-edit').addClass('fa-check-circle');
    } 
    else {
        $(this).addClass('fa-edit').removeClass('fa-check-circle');
        saveProj();
    }   
}); 
//trash row btn  
$(document).on('click','.projtable .fa-trash', function() {  
    var msg = '<small>Remove Task?</small><p>Are you sure you want to delete this row?</p><button class="notifbtn yesdelrow">Yes</button><button class="notifbtn nodel">No</button>';
    dropNotif(msg);
    delrow = $(this).parents('tr');
}); 
     
$(document).on('click','.yesdelrow', function() {
    setTimeout(function() { delrow.fadeOut(200); },100);
    setTimeout(function() { delrow.remove(); },300);
    setTimeout(function() { $('.notifcont').css({'top':'0','opacity':'0'}) },100);
    setTimeout(function() { saveProj(); },1000);
      
});    
      
$(document).on('click','.progpercent .fa-plus', function() {
    if($(this).parents('td').find('.progpercent').width() < 170) {
        $(this).parents('td').find('.progpercent').animate({width: '+=10'+'%'},100);
    }   
    setTimeout(function() { saveProj(); },150)
}); 
$(document).on('click','.progpercent .fa-minus', function() {
    if($(this).parents('td').find('.progpercent').width() > 0) {
        $(this).parents('td').find('.progpercent').animate({width: '-=10'+'%'},100);
    }
    if($(this).parents('td').find('.progpercent').width() < 5) {
        $(this).parents('td').find('.progpercent').animate({width: '0'+'%'},100);
    }
    setTimeout(function() { saveProj(); },150)
});        
           
     
$('.myprojbtn').on('click', function() {
    $('.app').fadeOut(30);
    setTimeout(function() { $('.myprojects').fadeIn(10); },50)
}); 
    
$('.protobtn').on('click', function() {
    $('.app').fadeOut(30);
    setTimeout(function() { $('.myprototypes').fadeIn(10); },50)
});  
    
$('.teambtn').on('click', function() {
    $('.app').fadeOut(30);
    setTimeout(function() { $('.team').fadeIn(10); },50)
});          

//createbtn create new proj, prototype or team
createbtn.on('click', function() {
    $('.app').fadeOut(0);
    setTimeout(function() { $('.createapp').fadeIn(0); },30);
});   
     
//add icon to lists in dashbox
$('.createapp .dashbox').find('li').prepend('<i class="fas fa-folder-plus"></i>'); 
    
//insert clear div after every apptitles
$('<div class="clear"></div>').insertAfter('.apptitles');    
      
//color form action
$('#projcolor').on('change', function() {
    $('.projcolorcont').css('background',$(this).val());
});   
      
     
//close newbox
$(document).on('click','.newboxclose, .closebox', function() {
    $('.newboxcont').fadeOut(30);
    $('.addmemberscont').remove(); 
    $('.addteambox').find('select option').remove(); 
});
$('.newbox input').on('keyup', function(e) {
    var enter = e.keyCode || e.which;
    if(enter == 13){
        $(this).siblings('button').trigger('click');
    }
});   
 
var newcolor;     
//edit project info btn     
$(document).on('click','.editprojinfo', function() {
    $('.editproj').fadeIn(30);
    thisprojname = $(this).parents('.projtitles').find('span').html();
    $(this).parents('.projtemplate').find('.projnameinp').val(thisprojname);
    $('.projcolorcont').on('change', function() {
        newcolor = $(this).find('input').val();  
    });
});      
$(document).on('click','.editprojbtn', function() {
    $('.editproj').fadeOut(30);
    var newprojname = $(this).siblings('.projnameinp').val();
    $(this).parents('.projtemplate').find('.projtitles .projname span').html(newprojname);
    var thisprojid = $(this).parents('.projtemplate').find('[data-projpageid]').attr('data-projpageid');
    $('[data-projid='+thisprojid+']').find('span').html(newprojname);
    $('[data-projid='+thisprojid+']').css('border-color',newcolor);
    $(this).parents('.projtemplate').find('.projlogo').css('background',newcolor);
    setTimeout(function() { 
        saveProj(); 
        saveProjConts();  
    },50);
    var msg = 'Project 00'+thisprojid+' has been successfully renamed to '+newprojname;
    smallNotif(msg);
});      
   
//indivprojmenu click action
$(document).on('click','.indivprojmenu, .indivprotomenu', function(e) {
    e.stopImmediatePropagation();
});
 
//delete project on dropdown    
var projidtoremove;    
$(document).on('click','.indivprojmenu h6:last-child', function() {
    thisproj = $(this).parents('.indivproj');
    var msg = '<small>Remove Project?</small><p>Are you sure you want to remove this project?</p><button class="notifbtn delproj">Yes</button><button class="notifbtn">Cancel</button>';
    dropNotif(msg);
    projidtoremove = $(this).parents('.indivproj').attr('data-projid');
});
    
$(document).on('click','.indivprojmenu h6:first-child', function() {    
    $(this).parents('.indivproj').trigger('click');
    setTimeout(function() { $('.projtemplate').find('.editprojinfo').trigger('click') },50)
});
    
$(document).on('click', '.delproj', function() {
    $('.myprojbtn').trigger('click');
    thisproj.parents('.indivproj').fadeOut(100);
    setTimeout(function() { 
        $('[data-projid='+projidtoremove+']').remove();
        saveProjConts() 
        $('.projnumfill').html($('.projects > div').length);
    },200); 
});    
    
function saveProjConts() {
    localStorage.projects = $('.projects').html(); 
    localStorage.myprojcont = $('.myprojectscont').html();
}    
     
//delete prototype on dropdown
var protoidtoremove;    
$(document).on('click','.indivprotomenu h6:last-child', function() {
    thisproto = $(this).parents('.indivproto');
    var msg = '<small>Remove Prototype?</small><p>Are you sure you want to remove this prototype?</p><button class="notifbtn delproto">Yes</button><button class="notifbtn">Cancel</button>';
    dropNotif(msg);
    protoidtoremove = $(this).parents('.indivproto').attr('data-protoid');
});     
$(document).on('click', '.delproto', function() {
    $('.protobtn').trigger('click');
    thisproto.parents('.indivproto').fadeOut(100);
    setTimeout(function() { 
        $('[data-protoid='+protoidtoremove+']').remove();
        localStorage.prototypes = $('.prototypes').html(); 
        localStorage.myprotcont = $('.myprototypes').html(); 
        $('.protonumfill').html($('.prototypes > div').length);
    },200); 
});       
     

//new project btn    
$('.newprojbtn').on('click', function() {
    $('.newbox').css('top','50%');
    $('.addprojbox').fadeIn(30); 
    $('.addprojbox').find('input').focus();
    $('.projnameinp,.protonameinp,.teamnameinp').val('');
}); 
    
//new prototype btn
$('.newprotobtn').on('click', function() {
    $('.addprotobox').fadeIn(30);
    $('.addprotobox').find('input').focus();
    $('.projnameinp,.protonameinp,.teamnameinp').val('');
});  
     
//new team btn
$('.newteambtn').on('click', function() {
    $('.newbox').css('top','50%');
    var indivprojnum = $('.projects .indivproj').length;
    for(i=0;i<indivprojnum;i++) {
        $('.addteambox').find('select').append('<option value="'+$('.projects .indivproj').eq(i).attr('data-projid')+'">'+$('.projects .indivproj span').eq(i).html()+'</option>');
    }
    setTimeout(function() { 
        $('.addteambox').fadeIn(30); 
        $('.addteambox').find('input').focus();
    },50);
});          
   
//add component button 
$(document).on('click','.addcomp', function() {
    var randtop = (Math.floor(Math.random() * 5) + 0);
    var randleft = (Math.floor(Math.random() * 80) + 0);
    $('<div id="protobox" class="protobox" style="top:'+randtop+'%;left:'+randtop+'%"><div class="protoboxhead"><h6>Add Title<h6></div><div class="protoboxbody" contenteditable="true">Add content here...</div>').appendTo('.protoboard');
    //make protobox draggable and resizable
    $('.protobox').draggable({ handle: '.protoboxhead',containment: "parent" });
    $('.protobox').resizable({animate: true}); 
    setTimeout(function() { saveProto(); },50)
});    
//add project templates button
$(document).on('click','.addtemplatebtn', function() {
    saveProj();
    $('.compcentercont').fadeIn(30);
    $('.compcenter').css('top','50%');
});     
 
    
$('.closecomp').on('click', function() {
    $('.compcentercont').fadeOut(30);
    $('.compcenter').css('top','45%');
});    
    
$('.compcenter .comp').find('small').append('<i class="fas fa-long-arrow-alt-right"></i>');       
    
$('.compcancel, .compfeat .close').on('click', function() {
    $('.compfeatcont').fadeOut(100);
    $('.compfeat').css('transform','scale(0.9)');
});  
       
$('.compleft').find('li').prepend('<i class="fas fa-bolt"></i>'); 
$('.compright').find('li').prepend('<i class="fas fa-project-diagram"></i>'); 
         
    
$(document).on('click','.saveproto',function() {
    saveProto();
    var msg = '<i class="fas fa-save"></i>We have successfully saved your prototype!';
    smallNotif(msg);
});
 
$('.vid1').on('click', function() {
    var video = $('<iframe width="70%" height="70%" src="https://www.youtube.com/embed/jtveAwcKRAY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'); 
    video.appendTo($('.videocont'));
    $('.videocont').fadeIn(100);
    $('.videocont iframe').css('transform','scale(1)');
});   
     
     
 $('.fa-mug-hot').on('click', function() {
    $('.myprojbtn').trigger('click'); 
 });
     
     
$('.projects').sortable({revert: true,helper: "clone"}); 
$('.prototypes').sortable({revert: true,helper: "clone"});   
    
$('.clearmem').on('click', function() {
    localStorage.clear();
    location.reload();
});     
 
$(document).on('click', '.reordertasks', function() {
    $('.projtable tbody').sortable({revert: true,helper: "clone",items: "tr:not(.projtable tr:first-child,.projtable tr:last-child,.projtable tr:nth-of-type(2))"});
    $(this).html('<i class="fas fa-save"></i>Save Order');
    $(this).removeClass('reordertasks').addClass('saveorder');
    $('.projtable tr:not(tr:last-child,tr:nth-of-type(2))').prepend('<td><i class="fas fa-sort"></i></td>');
    $('<th></th>').insertBefore('.projtable th:first-child');
    $('table td:first-child').css({'width':'50px','max-width':'50px'});
});   
$(document).on('click','.saveorder', function() {
    $('.projtable tbody').sortable("destroy");
    $(this).html('<i class="fas fa-sort"></i>Reorder Tasks');
    $(this).removeClass('saveorder').addClass('reordertasks');
    $('.projtable').find('td .fa-sort').parent('td').remove();
    $('.projtable th:first-child').remove();
    $('.projtable tr:not(tr:first-child,tr:nth-of-type(2),tr:last-child) td:first-child').css('width','');
    $('table td:first-child').css({'width':'','max-width':''});
    saveProj();
    var msg = '<i class="fas fa-save"></i> New order saved!';
    smallNotif(msg);
});     
      
     
//main saveproject func
function saveProj() {
    $('.saveproject').trigger('click');
    $('.memsize').html(memsize); //update memory used
}  
//main save prototype func
function saveProto() {
    $('.saveprototype').trigger('click');
}     
     
$('.vidclose').on('click', function() {
    $('.videocont iframe').css('transform','scale(0.9)');
    $('.videocont').fadeOut(100);
});     
    
     
comp.on('click',  function() {
    $('.compfeatcont').fadeIn(100);
    $('.compfeat').css('transform','scale(1)');
    var compimg = $(this).find('img').attr('src');
    var comptitle = $(this).find('h6').html();
    var addtoproj = $(this).find('small').clone();
    $('.compfeatimg').attr('src',compimg);
    $('.compfeattitle').html(comptitle);
    $('.addprojbtnhere').html(addtoproj);
    addtoproj.find('i').fadeOut(0);
    addtoproj.addClass('addtoproj');
    tempid = $(this).attr('data-tempid');
});    
     
$(document).on('click', '.viewteam', function() {
    $('.viewteamdiv').fadeIn(30);
});    
    
     
$(document).on('click', '.viewaddteam', function() {
    $('.addmembersbtn').trigger('click');
    $('.addmemberscont').fadeIn(30);
    $('.addmemberscont').find('.addmembtn').addClass('addextramembers');
});    
    
   
     
$(document).on('click','.addextramembers', function() {
    $('.availdescript').remove();
    var newadds = 0;
    for(i=0;i<teamarr.length;i++) {
        if(!$('#projpage'+localStorage.selectid+' .viewteamdiv [data-memberid='+(i+1000)+']').length) {
            $('#projpage'+localStorage.selectid+' .viewteamdiv').append('<span data-memberid="'+members[i][1]+'"><img src="'+teamimgarr[i]+'" />'+teamarr[i]+'</span>');
            $('.availinner').append('<span data-memberid="'+members[i][1]+'"><img src="'+teamimgarr[i]+'" /><em>'+teamarr[i]+'</em><small class="addtotask">Add to Task</small></span>');
            newadds++;
        }
    }   
    setTimeout(function() {
        var membnum = $('.availinner').find('span').length;
        var msg = newadds+' team  members were added to project '+localStorage.projname+'.';
        smallNotif(msg);
    },50)
    saveProj(); 
    //teamarr = [];
    //teamimgarr = []; 
});     
     
    
     
$(document).on('click', 'body', function() {
    $(document).on('click', '.viewteam,.viewteamdiv', function(e) {
        $('.viewteamdiv').fadeIn(10);
        e.stopImmediatePropagation();
    });     
    $('.viewteamdiv').fadeOut(30);   
});        

$(document).on('mouseover', '.viewteam', function() {  
    $(this).find('i').removeClass('fa-users').addClass('fa-angle-down');
});
$(document).on('mouseout', '.viewteam', function() {  
    $(this).find('i').removeClass('fa-angle-down').addClass('fa-users');
});    
    
$('.addmembersbtn').on('click', function() {
    $('<div class="addmemberscont"><div class="innerright"> <label>Add Team Members to Project</label> <div class="teamdiv"><div class="teamdivinner"></div></div><small class="addmembtn" style="float:left"><i class="fas fa-plus"></i>Add Members</small><small style="float:right">Cancel</small></div></div>').appendTo('body');
    $('.addmemberscont').fadeIn(0);
    //get size of members 2d array
    Object.size = function(members) {
    var size = 0, key;
    for (key in members) {
        if (members.hasOwnProperty(key)) size++;
    }
    return size;
    }
    membersize = Object.size(members); 
    setTimeout(function() {
        for(i=0;i<membersize;i++) {
            $('<p data-memberid="'+members[i][1]+'"><img src="'+members[i][2]+'"><span>'+members[i][0]+'</span><i class="fas fa-plus"></i></p>').appendTo('.teamdiv .teamdivinner');
        }
        $('.addmemberscont').css('transform','scale(1)');
        innerrightcopy = $('.innerright').clone();
    },10);
});     
     
  
//add templates to project
$(document).on('click', '.addtoproj',function() {
    $('.compfeatcont,.compcentercont').fadeOut(30);
    var comptitle = $(this).parents('.compfeat').find('.compfeattitle').html();
    $('.projtypefill').html(comptitle);
    if(tempid == 0) {
        $('<div class="tablesearch"><input placeholder="Filter table"></div><table data-tableid="0" id="projtable" class="projtable"><tr><td><div><i class="fas fa-table tablemenu"></i><div class="tableoptions"><h6><i class="fas fa-edit"></i>Edit Headers</h6><h6><i class="fas fa-copy"></i>Duplicate</h6><h6><i class="fas fa-palette"></i>Table Color</h6><h6><i class="fas fa-trash"></i>Delete Table</h6></div></div></td></tr><tr><th>Task Title</th> <th>Team Members</th> <th>Status</th> <th>Date Created</th> <th>Progress</th> <th>Files</th> </tr><tr class="regrow"><td><i class="fas fa-pen"></i><span></span></td><td class="teamtd"><i class="fas fa-user-plus"></i></td><td class="statustd"><div class="activestatus" data-status="4"><em>Not Started</em><i class="fas fa-angle-down"></i></div></td><td class="datetd"><input type="date" value="'+tableDate()+'" min="'+tableDate()+'"</td><td class="progtd"><div class="progbar" data-percent="0"><div class="progpercent"><small><i class="fas fa-minus minprog"></i><i class="fas fa-plus plusprog"></i></small></div></div></td><td><i class="fas fa-paperclip"></i></td><td><i class="fas fa-trash"></i></td></tr><tr><td class="additemtd"><input placeholder="Item title"><i class="fas fa-plus additembtn"></i></td></tr></table>').insertBefore('.smallsave');
    } 
    else if(tempid == 1) { 
        $('<div class="tablesearch"><input placeholder="Filter table"></div><table data-tableid="1" id="projtable" class="projtable"><tr><td><div><i class="fas fa-table tablemenu"></i><div class="tableoptions"><h6><i class="fas fa-edit"></i>Edit Headers</h6><h6><i class="fas fa-copy"></i>Duplicate</h6><h6><i class="fas fa-palette"></i>Table Color</h6><h6><i class="fas fa-trash"></i>Delete Table</h6></div></div></td></tr><tr><th>Task</th> <th>Team Members</th> <th>Status</th> <th>Date Created</th> <th>Progress</th> <th>Files</th> </tr><tr class="regrow"><td><i class="fas fa-pen"></i><span></span></td><td class="teamtd"><i class="fas fa-user-plus"></i></td><td class="statustd"><div class="activestatus" data-status="4"><em>Not Started</em><i class="fas fa-angle-down"></i></div></td><td class="datetd"><input type="date" value="'+tableDate()+'" min="'+tableDate()+'"</td><td class="progtd"><div class="progbar" data-percent="0"><div class="progpercent"><small><i class="fas fa-minus minprog"></i><i class="fas fa-plus plusprog"></i></small></div></div></td><td><i class="fas fa-paperclip"></i></td><td><i class="fas fa-trash"></i></td></tr><tr><td class="additemtd"><input placeholder="Item title"><i class="fas fa-plus additembtn"></i></td></tr></table>').insertBefore('.smallsave');
    } 
    else if(tempid == 2) {
        $('<div class="tablesearch"><input placeholder="Filter table"></div><table data-tableid="2" id="projtable" class="projtable"><tr><td><div><i class="fas fa-table tablemenu"></i><div class="tableoptions"><h6><i class="fas fa-edit"></i>Edit Headers</h6><h6><i class="fas fa-copy"></i>Duplicate</h6><h6><i class="fas fa-palette"></i>Table Color</h6><h6><i class="fas fa-trash"></i>Delete Table</h6></div></div></td></tr><tr><th>Task</th> <th>Team Members</th> <th>Action</th> <th>Date Created</th> <th>Progress</th> <th>Files</th> </tr><tr class="regrow"><td><i class="fas fa-pen"></i><span></span></td><td class="teamtd"><i class="fas fa-user-plus"></i></td><td class="statustd"><div class="activestatus" data-status="4"><em>Not Started</em><i class="fas fa-angle-down"></i></div></td><td class="datetd"><input type="date" value="'+tableDate()+'" min="'+tableDate()+'"</td><td class="progtd"><div class="progbar" data-percent="0"><div class="progpercent"><small><i class="fas fa-minus minprog"></i><i class="fas fa-plus plusprog"></i></small></div></div></td><td><i class="fas fa-paperclip"></i></td><td><i class="fas fa-trash"></i></td></tr><tr><td class="additemtd"><input placeholder="Item title"><i class="fas fa-plus additembtn"></i></td></tr></table>').insertBefore('.smallsave');
    } 
    else if(tempid == 3) {
        $('<div class="tablesearch"><input placeholder="Filter table"></div><table data-tableid="3" id="projtable" class="projtable"><tr><td><div><i class="fas fa-table tablemenu"></i><div class="tableoptions"><h6><i class="fas fa-edit"></i>Edit Headers</h6><h6><i class="fas fa-copy"></i>Duplicate</h6><h6><i class="fas fa-palette"></i>Table Color</h6><h6><i class="fas fa-trash"></i>Delete Table</h6></div></div></td></tr><tr><th>Task</th><th>Team Members</th> <th>Amount</th> <th>Date Created</th> <th>Progress</th> <th>Files</th> </tr><tr class="regrow"><td><i class="fas fa-pen"></i><span></span></td><td class="teamtd"><i class="fas fa-user-plus"></i></td><td class="statustd"><div class="activestatus" data-status="4"><em>Not Started</em><i class="fas fa-angle-down"></i></div></td><td class="datetd"><input type="date" value="'+tableDate()+'" min="'+tableDate()+'"</td><td class="progtd"><div class="progbar" data-percent="0"><div class="progpercent"><small><i class="fas fa-minus minprog"></i><i class="fas fa-plus plusprog"></i></small></div></div></td><td><i class="fas fa-paperclip"></i></td><td><i class="fas fa-trash"></i></td></tr><tr><td class="additemtd"><input placeholder="Item title"><i class="fas fa-plus additembtn"></i></td></tr></table>').insertBefore('.smallsave');
    } 
    else if(tempid == 27) {
        $('<div class="tablesearch"><input placeholder="Filter table"></div><table data-tableid="27" id="projtable" class="projtable"><tr><td><div><i class="fas fa-table tablemenu"></i><div class="tableoptions"><h6><i class="fas fa-edit"></i>Edit Headers</h6><h6><i class="fas fa-copy"></i>Duplicate</h6><h6><i class="fas fa-palette"></i>Table Color</h6><h6><i class="fas fa-trash"></i>Delete Table</h6></div></div></td></tr><tr><th>Company</th><th>Services</th><th>Paid</th> <th>Total</th> <th>Balance</th><th>Start Date</th><th>Status</th><th>Files</th><th></th></tr><tr class="regrow"><td><i class="fas fa-pen"></i><span></span></td><td><i class="fas fa-pen"></i><span></span></td><td><i class="fas fa-pen"></i><span></span></td><td><i class="fas fa-pen"></i><span></span></td><td><i class="fas fa-pen"></i><span></span></td><td class="statustd"><div class="activestatus" data-status="4"><em>Not Started</em><i class="fas fa-angle-down"></i></div></td><td class="datetd"><input type="date" value="'+tableDate()+'"></td><td><i class="fas fa-paperclip"></i></td><td><i class="fas fa-trash"></i></td></tr><tr><td class="additemtd"><input placeholder="Company"><i class="fas fa-plus additembtn"></i></td></tr></table>').insertBefore('.smallsave');
    }  
    setTimeout(function() {
        $('.projtable').last().find('th').append('<i class="fas fa-angle-down thdrop"></i>'); 
    },20); 
    saveProj();
});     
       
$(document).on('change', '.projtable input', function() {
    setTimeout(function() { saveProj(); },50);
}); 
     
$(document).on('change', '.datetd input', function() {
    $(this).attr('value',$(this).val());
});     
    
function tableDate() {
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    return output;
}     
        
//all types of additembtn (for all diff templates) 
$(document).on('click','.additembtn', function() { 
    $('.saveorder').trigger('click');
    additeminp = $(this).siblings('input').val();
    totaltasks = $('.projtable tr').length;
    var thistr = $(this).parents('tr');
    var tableid = $(this).parents('table').attr('data-tableid');
    if(tableid == 0) { 
        $('<tr class="regrow"><td><i class="fas fa-pen"></i><span>'+additeminp+'</span></td><td class="teamtd"><i class="fas fa-user-plus"></i></td><td class="statustd"><div class="activestatus" data-status="4"><em>Not Started</em><i class="fas fa-angle-down"></i></div></td><td class="datetd"><input type="date" value="'+tableDate()+'" min="'+tableDate()+'"</td><td class="progtd"><div class="progbar" data-percent="0"><div class="progpercent"><small><i class="fas fa-minus minprog"></i><i class="fas fa-plus plusprog"></i></small></div></div></td><td><i class="fas fa-paperclip"></i></td><td><i class="fas fa-trash"></i></td></tr>').insertBefore(thistr);
    } 
    else if(tableid == 1) {
        $('<tr class="regrow"><td><i class="fas fa-pen"></i><span>'+additeminp+'</span></td><td class="teamtd"><i class="fas fa-user-plus"></i></td><td class="statustd"><div class="activestatus" data-status="4"><em>Not Started</em><i class="fas fa-angle-down"></i></div></td><td class="datetd"><input type="date" value="'+tableDate()+'" min="'+tableDate()+'"</td><td class="progtd"><div class="progbar" data-percent="0"><div class="progpercent"><small><i class="fas fa-minus minprog"></i><i class="fas fa-plus plusprog"></i></small></div></div></td><td><i class="fas fa-paperclip"></i></td><td><i class="fas fa-trash"></i></td></tr>').insertBefore(thistr);
    }
    else if(tableid == 2) {
        $('<tr class="regrow"><td><i class="fas fa-pen"></i><span>'+additeminp+'</span></td><td class="teamtd"><i class="fas fa-user-plus"></i></td><td class="statustd"><div class="activestatus" data-status="4"><em>Not Started</em><i class="fas fa-angle-down"></i></div></td><td class="datetd"><input type="date" value="'+tableDate()+'" min="'+tableDate()+'"</td><td class="progtd"><div class="progbar" data-percent="0"><div class="progpercent"><small><i class="fas fa-minus minprog"></i><i class="fas fa-plus plusprog"></i></small></div></div></td><td><i class="fas fa-paperclip"></i></td><td><i class="fas fa-trash"></i></td></tr>').insertBefore(thistr);
    } 
    else if(tableid == 3) {
        $('<tr class="regrow"><td><i class="fas fa-pen"></i><span>'+additeminp+'</span></td><td class="teamtd"><i class="fas fa-user-plus"></i></td><td class="statustd"><div class="activestatus" data-status="4"><em>Not Started</em><i class="fas fa-angle-down"></i></div></td><td class="datetd"><input type="date" value="'+tableDate()+'" min="'+tableDate()+'"</td><td class="progtd"><div class="progbar" data-percent="0"><div class="progpercent"><small><i class="fas fa-minus minprog"></i><i class="fas fa-plus plusprog"></i></small></div></div></td><td><i class="fas fa-paperclip"></i></td><td><i class="fas fa-trash"></i></td></tr>').insertBefore(thistr);
    } 
    else if(tableid == 27) {
        $('<tr class="regrow"><td><i class="fas fa-pen"></i><span>'+additeminp+'</span></td><td><i class="fas fa-pen"></i><span></span></td><td><i class="fas fa-pen"></i><span></span></td><td><i class="fas fa-pen"></i><span></span></td><td><i class="fas fa-pen"></i><span></span></td><td class="statustd"><div class="activestatus" data-status="4"><em>Not Started</em><i class="fas fa-angle-down"></i></div></td><td class="datetd"><input type="date" value="'+tableDate()+'"></td><td><i class="fas fa-paperclip"></i></td><td><i class="fas fa-trash"></i></td></tr>').insertBefore(thistr);
    } 
    setTimeout(function() { saveProj(); },100); 
    var thisinp = $(this).siblings('input');
    setTimeout(function() { thisinp.val(''); },50)
});                            
        
$(document).on('click','table td .fa-pen', function() {
    $(this).siblings('span').attr('contenteditable','true');
    $(this).siblings('span').focus();
    $(this).parent().css('outline','1px dotted var(--color)');
    $(this).removeClass('fa-pen').addClass('fa-check');
    $('td').on('keypress', function(e) {
        var enter = e.keyCode || e.which;
        if(enter == 13){
            $(this).find('.fa-check').trigger('click');
        } 
    });
    $('.fa-check,.fa-pen').attr('contenteditable','false');
});
$(document).on('click','table td .fa-check', function() {
    $(this).siblings('span').attr('contenteditable','false');
    $(this).parent().css('outline','');
    $(this).removeClass('fa-check').addClass('fa-pen');
    $('.fa-check,.fa-pen').attr('contenteditable','false'); 
    setTimeout(function() { saveProj(); },100)
});     
    
//on double click of a td cell, make editable
$(document).on('dblclick','table td', function() {
    $(this).children('span').attr('contenteditable','true');
    $(this).children('span').focus();
    if($(this).find('span').length > 0) {
        $(this).css('outline','1.5px dotted var(--color)');
    }
    $(this).find('.fa-pen').removeClass('fa-pen').addClass('fa-check');
    $('td').on('keypress', function(e) {
        var enter = e.keyCode || e.which;
        if(enter == 13){
            $(this).find('.fa-check').trigger('click');
        } 
    });
    $('.fa-check,.fa-pen').attr('contenteditable','false');
});    
    
$(document).on('click','.projtype .fa-pen', function() {
    $(this).siblings('span').attr('contenteditable','true');
    $(this).siblings('span').focus();
    $(this).siblings('span').css('outline','1.5px dotted #ccc');
    $('.projtype a').on('keypress', function(e) {
        var enter = e.keyCode || e.which;
        if(enter == 13){
            $('.projtype .fa-check').trigger('click');
        }   
    });
    $(this).removeClass('fa-pen').addClass('fa-check');
}); 
$(document).on('click','.projtype .fa-check', function() {
    $(this).removeClass('fa-check').addClass('fa-pen');
    $(this).siblings('span').attr('contenteditable','false');
    $(this).siblings('span').css('outline','none');
    saveProj();
});     
    
       
//display memory size of localStorage in profile div     
memsize = function displayMemSize() {
    var _lsTotal=0,_xLen,_x;
    for(_x in localStorage){ 
        if(!localStorage.hasOwnProperty(_x)) {
            continue;
        } 
        _xLen = ((localStorage[_x].length + _x.length)* 2);
        _lsTotal+=_xLen;
    }
    return (_lsTotal / 1024).toFixed(2) + " KB";
}
$('.memsize').html(memsize);  
    
  
//download project data to excel file
$(document).on('click', '.exporttable',function () {
    exportTableToExcel('projtable'); 
});    
    
function exportTableToExcel(e,a=""){var l,n=document.getElementById(e).outerHTML.replace(/ /g,"%20");if(a=a?a+".xls":"excel_data.xls",l=document.createElement("a"),document.body.appendChild(l),navigator.msSaveOrOpenBlob){var o=new Blob(["\ufeff",n],{type:"application/vnd.ms-excel"});navigator.msSaveOrOpenBlob(o,a)}else l.href="data:application/vnd.ms-excel, "+n,l.download=a,l.click()}    
     
  
//add members to indiv taks      
$(document).on('click', '.teamtd .fa-user-plus', function() {
    $('.teamtd').removeClass('activeteamtd');
    var thistemp = $(this);
    $('.availmemberscont').fadeIn(30);
    $('.availmembers').css('top','0');
     setTimeout(function() {
        thistemp.parent().addClass('activeteamtd');   
    },10);
    //correcting add/remove button labels
    
});        
//close available members box   
$(document).on('click','.availmembers button', function()  {
    $('.availmembers').css('top','');
    $('.availmemberscont').fadeOut(30);
    setTimeout(function() { saveProj(); },100)
});           
     
$(document).on('click','.availdescript small:nth-of-type(2)', function() {
    $('.viewaddteam').trigger('click');
});     
   
$(document).on('click', '.addtotask', function() {
    thismemberid = $(this).parent().attr('data-memberid');
    if($('.activeteamtd').find('[data-memberid='+thismemberid+']').length) {
        $(this).html('Remove');
    }  
    else {
        $(this).html('Remove');
        $(this).removeClass('addtotask').addClass('removefromtask');
        var membercopy = $(this).parents('span').clone();
        membercopy.appendTo('.activeteamtd');
    }
    var msg = $(this).parent().find('em').html()+' was added to task.';
    smallNotif(msg);
    //add member to dashbox
    var membername = $(this).parent().find('em').html();
    var memberimg = $(this).parent().find('img').attr('src');
    var theproj = $(this).parents('.projtemplate').find('.projname span').html();
    var tasksnum = 1;
    setTimeout(function() {
    if($('.teamdash table tr').length < 6) {    
        if($('.teamdash table span:contains("'+membername+'")').length) {
            tasksnum = tasksnum + 1;
            var target = $('.teamdash table span:contains("'+membername+'")');
            target.parents('tr').find('.taskson').html(tasksnum);
            localStorage.teamdash = $('.teamdash').html();
        }  
        else {
            $('<tr> <td><img src="'+memberimg+'"/><span>'+membername+'</span></td><td class="currproj">'+theproj+'</td><td class="taskson">'+tasksnum+'</td><td data-active="1"><div></div></td></tr>').insertAfter($('.teamdash table tr:first-child'));
            localStorage.teamdash = $('.teamdash').html();
        }
    } 
    else {
        if($('.teamdash table span:contains("'+membername+'")').length) {
            tasksnum = tasksnum + 1;
            var target = $('.teamdash table span:contains("'+membername+'")');
            target.parents('tr').find('.taskson').html(tasksnum);
            target.parents('tr').find('.currproj').html(theproj);
            localStorage.teamdash = $('.teamdash').html();
        }  
        else {
            $('.teamdash table tr:last-child').remove(); 
            $('<tr> <td><img src="'+memberimg+'"/><span>'+membername+'</span></td><td>'+theproj+'</td><td class="taskson">'+tasksnum+'</td><td data-active="1"><div></div></td></tr>').insertAfter($('.teamdash table tr:first-child'));
            localStorage.teamdash = $('.teamdash').html();
        }
    }
    },50)    
});      
if(typeof localStorage.teamdash == 'undefined' || typeof localStorage.teamdash == null) {}
else {
    $('.teamdash').html(localStorage.teamdash);
}     
    
     
$(document).on('click','.removefromtask', function() {
    $(this).html('Add to Task');
    $(this).removeClass('removefromtask').addClass('addtotask');
    thismemberid = $(this).parent().attr('data-memberid');
    $('.activeteamtd').find('[data-memberid='+thismemberid+']').remove();
    saveProj(); 
});    
    
       
$('.slideproj').on('click', function() {
    $('.projectsnav').css('margin-left','-145px');
    $('.home').css('width','calc(100% - 90px)');
    $('.toolbar').css('width','calc(100% - 105px)');
    $(this).css('opacity','1');
    setTimeout(function() {
        $('.slideproj').removeClass('fa-angle-left').addClass('fa-angle-right unslideproj');
    },50);
    $('.sidebar,.projectsnavcont').on('mouseout',function() {
        $('.slideproj').css('opacity','1');
    }); 
});    
    
$(document).on('click','.unslideproj', function() {
    $('.projectsnav').css('margin-left','');
    $('.home').css('width','');
    $('.toolbar').css('width','');
    $(this).css('opacity','');
    setTimeout(function() {
        $('.slideproj').removeClass('fa-angle-right unslideproj').addClass('fa-angle-left');
    },50);
    $('.sidebar,.projectsnavcont').on('mouseout',function() {
        $('.slideproj').css('opacity','0');
    });
});    
    
$('.sidebar,.projectsnavcont').on('mouseover',function() {
    $('.slideproj').css('opacity','1')
});
$('.sidebar,.projectsnavcont').on('mouseout',function() {
    $('.slideproj').css('opacity','0');
});       
   
$(document).on('click', '.tablemenu', function() {
    $(this).siblings('.tableoptions').fadeIn(30);
    $(this).css('opacity','1');
}); 
$(document).on('click', function() {
    $(document).on('click', '.tablemenu', function(e) {
        e.stopImmediatePropagation();
    }); 
    $('.tableoptions').fadeOut(30);
});     
       
//delete table    
$(document).on('click', '.tableoptions h6:last-child', function() {
    var msg = '<small>Remove Table?</small><p>Are you sure you want to remove this table?</p><button class="notifbtn yesdeltable">Yes</button><button class="notifbtn nodel">No</button>';
    dropNotif(msg);
    deltable = $(this).parents('table');
});     
$(document).on('click', '.yesdeltable', function() {
    deltable.fadeOut(30);
    deltable.prev('.tablesearch').remove();
    setTimeout(function() { 
        deltable.remove();
        saveProj(); 
    },100);
    
});       
       
$(document).on('click', '.tableoptions h6:nth-of-type(2)', function() {    
    var duptable = $(this).parents('table').clone();
    duptable.insertAfter($(this).parents('table'));
    saveProj();
});
       
$(document).on('click','.statustd i', function(e) {
    $('.statusdropdown').remove();
    $('<div class="statusdropdown"><div data-status="1"><em>In Progress</em></div><div data-status="2">Done</div><div data-status="3">Waiting Review</div><div data-status="4"><em>Not Started</em></div><small>Add a Status</small></div>').insertAfter(this);
    e.stopImmediatePropagation();
    $(document).on('click', function() {
        $('.statusdropdown').fadeOut(30);
    });
});    
$(document).on('click','.statusdropdown', function(e) {
    e.stopImmediatePropagation();
});
$(document).on('click','.statusdropdown div', function(e) {
    var statusdiv = $(this).html();
    var statusid = $(this).attr('data-status');
    $(this).parents('.statustd').find('.activestatus em').html(statusdiv);
    $(this).parents('.statustd').find('.activestatus').attr('data-status',statusid);
    e.stopImmediatePropagation();
    setTimeout(function() { $('.statusdropdown').fadeOut(0); },30);
    setTimeout(function() {  saveProj(); },40);
    setTimeout(function() { var msg = 'New status on task was saved.<br>Assigned team members will be notified'; smallNotif(msg); },50);
});     
       
   
///Automations btn click
$(document).on('click','.createautomat', function() {
    $('.automatcont').fadeIn(30);
    $('.automatbox').css('transform','scale(1)');
    if(!$('.automatinner > div h6 i').length)
        $('.automatinner > div h6').prepend('<i class="fas fa-robot"></i>');
});    
$(document).on('click','.automatbox > .close', function() {     
    $('.automatbox').css('transform','');
    setTimeout(function() { $('.automatcont').fadeOut(30) },50)
}); 
    
    
  
//Automations functions      
$(document).on('click','.automatinner small', function() {
    var automatid = $(this).attr('data-automat');
    var title = $(this).parent().find('h6').html();
    if(automatid == 1) {
        addItemEveryXTime(title);
    }
    if(automatid == 2) {
        assignMember(title);
    }
});     
    
$(document).on('click','.automatwindow .close', function(e) {    
    $('.automatwindow').fadeOut(50); 
    e.stopImmediatePropagation();
});
     
     
//add new item (row) input actions   
$(document).on('keyup','.additemtd input', function(e) {
    var enter = e.keyCode || e.which;
    if(enter == 13){
        additeminp = $(this).val();
        $(this).siblings('.additembtn').trigger('click');
    }
});          
    
$(document).on('click','.activestatus',function(e) {
    $(this).children('i').trigger('click');
    e.stopImmediatePropagation();
});    
                 
$(document).on('click','.tableoptions h6:nth-of-type(3)',function() {
    $('<div class="tablecolor"><i class="close"></i><h4>Choose a Table Color</h4> <div class="spacer"></div><div data-color=""></div><div data-color="rgba(255, 222, 8,0.3)"></div><div data-color="rgba(255, 97, 77,0.3)"></div><div data-color="rgba(157, 255, 77,0.3)"></div><div data-color="rgba(48, 234, 255,0.3)"></div><div data-color="rgba(119, 112, 255,0.3)"></div><div data-color="rgba(167, 99, 255,0.3)"></div><div data-color="rgba(255, 69, 184,0.3)"></div>').appendTo($(this).parents('table'));
    $('[data-color]').css('background', function() {
        return $(this).attr('data-color'); 
    });  
    $('.tablecolor').fadeIn(30);
    $('.tablecolor').css('transform','scale(1)');
    
});         
     
$(document).on('click','.tablecolor [data-color]', function() {
    var thiscolor = $(this).attr('data-color');
    var that = $(this);
    $('.tablecolor').fadeOut(0);
    $('.tablecolor').css('transform','scale(0.9)');
    setTimeout(function() { that.parents('table').find('th').css('background',thiscolor); },30);
    setTimeout(function() { $('.tablecolor').remove(); },100);
});      
$(document).on('click','.tablecolor .close', function() {
    $('.tablecolor').fadeOut(0);
    $('.tablecolor').css('transform','scale(0.9)');
    setTimeout(function() { $('.tablecolor').remove(); },100);
});    
       
//Table search/filter
$(document).on('keyup','.tablesearch input', function() {
    var value = $(this).val().toLowerCase();
    $(this).parent().next('table').find('tr').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});     
    
    
       
    
    
    
    
    
});