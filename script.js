const bottom=document.querySelector(".bottom"),
sortByMktCap=document.querySelector(".sort_cap"),
sortByPer=document.querySelector(".sort_per");

let fData=[];

function showData(arr)
{
    bottom.innerHTML="";
    arr.forEach((i)=>
    {
        bottom.innerHTML+=
        `
        <div class="item">
                    <div>
                        <img src="${i.image}">
                        <p>${i.name}</p>
                    </div>
                    <div class="symbol">
                        ${i.symbol.toUpperCase()}
                    </div> 
                    <div class="current_price">
                      $ ${i.current_price}
                    </div>
                    <div class="total_volume">
                       $ ${i.total_volume}
                    </div>
                    <div class="price_change_percentage_24h ${i.price_change_24h<0 ? 'dec' : 'inc'}">
                        ${i.price_change_percentage_24h}%
                    </div>
                    <div class="market_cap">
                       Mkt Cap: $ ${i.market_cap}
                    </div>
                </div>
        `
    });
};

fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
.then(e=>e.json())
.then(data=>{
    console.log(typeof data);
    const arr=Object.keys(data).map(key=>data[key]);
   fData=arr;
  showData(fData);
})


sortByMktCap.addEventListener('click',(e)=>{
    fData.sort((a,b)=>{
        return b.market_cap-a.market_cap;
    });
    showData(fData);    
});

sortByPer.addEventListener('click',(e)=>{
    fData.sort((a,b)=>{
        return a.price_change_percentage_24h-b.price_change_percentage_24h;
    });
    showData(fData);   
});



//I'll use Debouncing..

const input=document.querySelector("input");

let timeout;
input.addEventListener('input',(e)=>{
   debouncing(input.value.toLowerCase());
});

function debouncing(tar)
{
    clearTimeout(timeout);
   timeout = setTimeout(()=>{
       let dataToShow= fData.filter(ele=>{
        let eleName=ele.name.toLowerCase();
        let symbol=ele.symbol.toLowerCase();
        if(eleName.indexOf(tar)!=-1 || symbol.indexOf(tar)!=-1)return true;
        return false;
       });

       showData(dataToShow);
    },500);
}






