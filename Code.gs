function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Live Tracking')
  .addItem("Update Students", 'checkStudent')
  .addItem("New Sheet", 'newSheet')
  
  .addToUi();
}

function checkStudent() {//Make this update by itself
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getActiveSheet();
  var template = ss.getSheetByName("template");
  
  var students = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1H-DRyoZYEY9VhjfOSsHIaLrt2sMD3k2FcfS4gNy84Kc/edit#gid=0").getSheets()[0];
  var studentHolder = students.getRange("A:A").getDisplayValues();
  sheet.getRange(1,1,studentHolder.length,1).setValues(studentHolder);
  var atAR = [];
  for(var i = 0; i<studentHolder.length; i++){
    atAR.push(getStudentAT(studentHolder[i][0])); 
  }
  sheet.getRange(1,2,atAR.length,1).setValues(atAR);
  template.getRange(1,2,atAR.length,1).setValues(atAR);
  sheet.getRange("A1:B3").clear();
  template.getRange("A1:B3").clear();
}

//alternating date colours, fill % data equations (if blank stay empty )

function getStudentAT(name){
  var students = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1H-DRyoZYEY9VhjfOSsHIaLrt2sMD3k2FcfS4gNy84Kc/edit#gid=0").getSheets()[0];
  var studentHolder = students.getRange("A:A").getDisplayValues();
  var infoHolder = students.getRange("D:D").getDisplayValues();
  
  var index = -1;
  for(var i = 0; i<studentHolder.length; i++){
    
    //index = studentHolder[i].indexOf([name]);
    if(studentHolder[i] == name) index = i;
    if(index>=0) break;
  }
  if(index<0){
    at = [""]; 
  }
  else{
    var pIndex = infoHolder[index][0].indexOf("%");
    var at = 0;
    if(pIndex < 0){
      at = [""]; 
    }
    else{
      at = [infoHolder[index][0].substring(pIndex-2, pIndex)];
    }
  }
  return at;
}

function newSheet(){
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName("template");
  
  var newSheet = ss.duplicateActiveSheet();
  newSheet.setName("New Tracking Sheet");
  ss.setActiveSheet(newSheet);
  checkStudent();
}