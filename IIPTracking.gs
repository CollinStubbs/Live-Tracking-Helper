function checkIIP() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getActiveSheet();
  var cell = sheet.getActiveCell();
  var name = cell.getDisplayValue();
  
  if(name.length >1){
    checkName(name);
   //has name 
  }
  else{
   //no name
    
  }
  
}

function checkName(name){
  var folders = DriveApp.getFolders();
  var folder = 0;
  var holder;
  while(folders.hasNext()){
    holder = folders.next();
    
    if(holder.getName().indexOf(name) > -1){
     SpreadsheetApp.open(holder) 
    }
  }
  
}