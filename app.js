const puppeteer = require('puppeteer');
 
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.pinterest.com/pin/783626403895642032/');
 // await page.waitForSelector('#desktopWrapper > div > div > div > div:nth-child(2) > div:nth-child(1) > article > div.Jea.hs0.sLG.zI7.iyn.Hsu > div.Jea.jzS.mQ8.zI7.iyn.Hsu > div > div > div > img');
  
  //await page.screenshot({path: 'example.png'});

  const imgs = await page.evaluate(() => {
     let result = [];
     let links = document.querySelectorAll(".GrowthUnauthPinImage > a");

     for (let i = 0; i < links.length; i++){
       result.push(links[i].getAttribute("href"));
     }
      return result;
  })
  
  console.log(imgs);

  for (let i = 0; i < imgs.length; i++) {
    const img = await page.evaluate(() => {
     let image = document.querySelector("img").getAttribute("src");
 
     return image;
    })

   await page.goto('https://www.pinterest.com' + imgs[i]);


   console.log(img);
    
  }
  
  await browser.close();

})();