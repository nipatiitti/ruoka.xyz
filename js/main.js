(function() {
    'use strict';
    
    var selectedDate = moment(new Date());
        
    var contentElem = document.getElementById('main-content'),
    
        source = document.getElementById('main-template').innerHTML,
        template = Handlebars.compile(source),
        
        apiUrl = 'http://api.ruoka.xyz/';
        
    updateMenus(selectedDate);
    
    document.getElementById('next-day').addEventListener('click', function(event) {
        event.preventDefault();
        
        selectedDate.add(1, 'day');
        
        updateMenus(selectedDate);
    });
    
    document.getElementById('prev-day').addEventListener('click', function(event) {
        event.preventDefault();
        
        selectedDate.subtract(1, 'day');
        
        updateMenus(selectedDate);
    });
        
    
    function updateMenus(date) {
        var dateString = date.format('YYYY-MM-DD'),
            requestUrl = apiUrl + dateString;
            
        var req = new XMLHttpRequest();
        
        req.addEventListener('load', function() {
            var context = JSON.parse(this.responseText);
            context.date = date.format('D.M.');
            
            contentElem.innerHTML = template(context);
        });
        
        req.open('get', requestUrl, true);
        req.send();
    }
})();