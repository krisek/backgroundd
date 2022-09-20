


window.addEventListener('load', (event) => {
    
    try{
        chrome.storage.sync.get(function(items) {
            if(typeof items.backgroundd_url !== 'undefined'){
                document.getElementById('backgroundd_url').value = items.backgroundd_url;
            }
            else{
              document.getElementById('backgroundd_url').value = 'https://spotwall.azurewebsites.net/';
            }
            if(typeof items.backgroundd_cycle !== 'undefined'){
                document.getElementById('backgroundd_cycle').value = items.backgroundd_cycle;
            }
            else{
                document.getElementById('backgroundd_cycle').value = 60;
            }
            
        });

    }
    catch (error){
        document.getElementById('backgroundd_url').value = 'https://spotwall.azurewebsites.net/' //localStorage.getItem('backgroundd_url');
        document.getElementById('backgroundd_cycle').value = 60;

    }
  
    const urlElement = document.getElementById('backgroundd_url');
    console.log(urlElement);
    
    urlElement.addEventListener('input', (event) => {
        chrome.storage.sync.set({'backgroundd_url': document.getElementById('backgroundd_url').value});   
    });
    
    const cycleElement = document.getElementById('backgroundd_cycle');
    
    cycleElement.addEventListener('input', (event) => {
        if(parseInt(document.getElementById('backgroundd_cycle').value) > 4){
          chrome.storage.sync.set({'backgroundd_cycle': document.getElementById('backgroundd_cycle').value});
        }
    });

 });


