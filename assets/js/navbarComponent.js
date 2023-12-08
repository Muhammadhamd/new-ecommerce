

async function NavComponent(){
  const ShipImg = `${window.location.origin}/assets/images/home/ship.png`
  const ShipLogoImg = `${window.location.origin}/assets/images/shiplogo.png`
  let Token = null
  try {
    const res = await axios.get("/Token")
    console.log(res.data)
    Token = res.data.Token
  } catch (error) {
    console.log(error)
    Token = error.response.data.Token
  }
   document.querySelector("nav").innerHTML = `
   <div class="main_menu">
   <ul>
       <li class="font-semibold" style="--i: 1"><span>
               <div></div>
           </span> <a href="/home">Home</a>

       </li>
       <li><span>
               <div></div>
           </span> <a href="/about">Dealer info</a>
               <div class="slide-show">
                   <span class="w-full p-[2%] max-w-[50%] flex flex-col justify-center items-baseline"
                       style="width: 100%; align-items: baseline;">
                       <a class="text-base pt-[3%]" href="/about">About US</a>
                       <a class="text-base pt-[3%]" href="/broker">Why Use A Broker</a>
                       <a class="text-base pt-[3%]" href="/help">How We Help</a>
                       <a class="text-base pt-[3%]" href="/contact">Contact US</a>


                   </span>
                   <span class="w-full max-w-[50%]" style="width: 100%;">
                       <img class="w-full h-full " style="width: 100%;"
                           src="${ShipImg}" alt=""/>
                   </span>
               </div>
       </li>
       <li style="--i: 2"><span>
               <div></div>
           </span> <a href="/shop">Boat for Sale</a></li>
       <li style="--i: 3"><span>
               <div></div>
           </span> <a href="/sell-boat">Sell a Boat</a></li>
   </ul>
   <div class="border border-[rgb(191_168_138)] w-[35%]" style="--i: 5">
      
       <img src="${ShipLogoImg}" class="w-[100%]"/>
   </div>
</div>
  
<ul id="menu">
   <li class="--i:6"><span>
           <div></div>
       </span> <a href="/services" style="">Service</a>
       <div class="slide-show">
           <span class="w-full p-[2%] max-w-[50%] flex flex-col justify-center items-baseline"
               style="width: 100%; align-items: baseline;">
               <a href="/services">Transporting
                   And Shipping</a>
               <a href="/help">How We
                   Help</a>
           </span>
           <span class="w-full max-w-[50%]" style="width: 100%;">
               <img class="w-full" src="${ShipImg}" alt=""/>
           </span>
       </div>
   </li>

   <li class="--i:7"><span>
           <div></div>
       </span> <a href="/did-you-know" style="">Did you know?</a>

   </li>
   ${
    Token ?`<li style="--:8" class="text-[120%] px-4"><span>
    <div></div>
</span>
<a href="/wishlist"><i class="bi bi-heart"></i></a>
</li>
<li style="--i:9" class="text-[130%] mr-4"><span>
    <div></div>
</span>
<a href=""><i class="bi bi-basket2"></i></a>
</li> `
: `
<button href="/login" class="btn" id="loginbtn" style="--i:10">Login</button>

`
   }
   
</ul>

<div class="menu">
   <div class="toggle_btn">
       <i class="bi bi-list"></i>
   </div>
   <div class="drop_down">
       <li><a href="/home">Home</a></li>
       <li><a href="/about">Dealer info</a></li>
       <li><a href="/shop">Boat for Sale</a></li>
       <li><a href="/sell-boat">Sell a Boat</a></li>

       <li><a href="/services">Service</a></li>
       <li><a href="/did-you-know">Did you know?</a></li>
       <li>
           <a href=""><i class="bi bi-heart"></i></a>
       </li>
       <li>
           <a href="#"><i class="bi bi-trash"></i></a>
       </li>
       <li>
           <button href="/login" class="btn" id="loginbtn">Login</button>
       </li>
   </div>
   <button href="/login" class="btn">Login</button>
</div>
    `

    

}

document.addEventListener("DOMContentLoaded",()=>{
    NavComponent()

    
})
