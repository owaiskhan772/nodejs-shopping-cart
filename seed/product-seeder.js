var mongoose = require('mongoose');

var Product = require('../models/product');

mongoose.connect('localhost:27017/shopping');

var products = [
  new Product({
    imagePath: 'http://4.bp.blogspot.com/-J7ojDNE5b3k/UwSlZQR2kdI/AAAAAAAAAAc/OABdF6I06YM/s1600/Project+IGI+1+-+Im+Going+In+full+version+pc+games+at+manojentertainment.png',
    title: 'Project I.G.I',
    description: 'Project I.G.I.: I\'m Going In (released in Europe as simply Project I.G.I.) is a tactical first-person shooter video game developed by Innerloop Studios and released on December 15, 2000 by Eidos Interactive. Upon release the game received mixed reviews due to a number of shortcomings, including poorly programmed A.I., lack of a mid-game save option, and the lack of multiplayer features. However it was praised for its superb sound design and graphics, thanks in part to its use of a proprietary game engine that was previously used in Innerloop\'s Joint Strike Fighter.',
    price: 189
  }),
  new Product({
    imagePath: 'http://vignette4.wikia.nocookie.net/marvel_dc/images/6/6c/Batman_Arkham_Knight_Cover_Art.jpg/revision/latest?cb=20140511102614',
    title: 'Batman: Arkham Knight',
    description: 'Batman: Arkham Knight is a 2015 action-adventure video game developed by Rocksteady Studios and published by Warner Bros. Interactive Entertainment for PlayStation 4, Xbox One, and Microsoft Windows. Based on the DC Comics superhero Batman, it is the successor to the 2013 video game Batman: Arkham Origins, and the fourth main installment in the Batman: Arkham series. Arkham Knight was released worldwide on June 23, 2015.',
    price: 430
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Battlefield_Bad_Company_2_cover.jpg',
    title: 'Battlefield: Bad Company 2',
    description: 'Battlefield: Bad Company 2 is a 2010 first-person shooter video game developed by the Swedish firm EA DICE and published by Electronic Arts for Microsoft Windows, PlayStation 3, Xbox 360, iOS and Kindle Fire systems. It is a direct sequel to Battlefield: Bad Company and is part of the Battlefield game series. It was released worldwide in March 2010. The iOS port was released on the App Store on December 16, 2010. A Kindle Fire version was released in June 2012.',
    price: 789
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/0/04/Kill.switch_Coverart.jpg',
    title: 'Kill Switch',
    description: 'Kill Switch is a third-person shooter video game developed by Namco USA in 2003 for PlayStation 2, Xbox and Microsoft Windows. A Game Boy Advance adaptation was released in 2004.',
    price: 120
  }),
  new Product({
    imagePath: 'http://mario.nintendo.com/img/luigi-mario-peach-toad.jpg',
    title: 'Mario',
    description: 'Mario is a fictional character in the Mario video game franchise, owned by Nintendo and created by video game designer Shigeru Miyamoto.',
    price: 109
  }),
  new Product({
    imagePath: 'http://cdn.akamai.steamstatic.com/steam/apps/366250/header.jpg?t=1483595362',
    title: 'Metal Slug',
    description: 'Metal Slug is a series primarily of run and gun video games created by SNK. Spin-off games include a third-person shooter and a tower defense game.',
    price: 57
  })
];

var kill = 0
for(var i=0; i < products.length; i++){
  products[i].save(function(error, result){
    kill++;
    if(kill === products.length){
        exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
