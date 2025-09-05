(function(){
    const para = new URLSearchParams(window.location.search);
    if(para.get('success')=='1')
    {
        const el = document.getElementById('msg-message');
        if(el)
        {
            el.style.display = 'block';

        }
        const url = new URL(window.location);
        url.searchParams.delete('success');
        window.history.replaceState({},document.title,url.toString());
    }
})();