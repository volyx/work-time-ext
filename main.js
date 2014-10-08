function buildPopupDom(divName, data) {
  var ul = document.getElementById(divName);

   for (var i = 0, ie = data.time.length; i < ie; ++i) {
    var p = document.createElement('p');
    p.appendChild(document.createTextNode(data.time[i]));

    var li = document.createElement('li');
    li.appendChild(p);

    ul.appendChild(li);
  }
}


document.addEventListener('DOMContentLoaded', function () {
  
   chrome.storage.local.get('time', function(items) {
          // Notify that we saved.
        	console.log('Get items');
        	console.log(items);
        	buildPopupDom("ul_id", items)

   });	

});