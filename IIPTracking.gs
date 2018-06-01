function checkName() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getActiveSheet();
  var cell = sheet.getActiveCell();
  var name = cell.getDisplayValue();
  
  
  
  if(name.length >1 && cell.getColumn() == 5){
    var url = checkIIP(name)
    if(url != null){
      cell.setValue("=hyperlink(\""+url+"\",\""+name+"\")"); 
    }
   //has name 
  }
  else{
   //no name
    return "";
  }
  
}

function checkIIP(name){
  var folders = DriveApp.getFoldersByName("Accommodations Tracking");
  var holder;
  
  while(folders.hasNext()){
    var files = folders.next().getFiles();
    
    while(files.hasNext()){
      holder = files.next();
      
      if(holder.getName().indexOf(name) > -1){
        return holder.getUrl();
        break;
      }
    }
  }  
  return null;
}

