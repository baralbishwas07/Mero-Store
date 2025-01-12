import { Product, Clothing, Appliance } from "../../data/product-lists.js";

describe('testsuite: product', () => {
    let product;
    beforeEach(() => {
        product = new Product({
            id: '6f37d921-1a8b-45c6-9e2d-8e9f6e427cd4',
            image: 'images/products/puma-men-shoes-bmw.jpg',
            name: "PUMA men's Bmw Motorsport Drift Cat Sneaker",
            rating: {
                stars: 4.5,
                count: 129
            },
            price: 5400,
            keywords: [
                "shoes",
                "men shoes",
                "puma"
            ]
        });
    });

    it('has the correct properties', () => {
        expect(product.id).toEqual('6f37d921-1a8b-45c6-9e2d-8e9f6e427cd4');
        expect(product.image).toEqual('images/products/puma-men-shoes-bmw.jpg');
        expect(product.name).toEqual("PUMA men's Bmw Motorsport Drift Cat Sneaker");
        expect(product.rating).toEqual(
            {
            stars: 4.5,
            count: 129
            });
        expect(product.price).toEqual(5400);
        
    });

    it('gets the correct stars url', ()=> {
        expect(product.getStarsUrl()).toEqual('images/ratings/rating-45.png');
    });

    it('gets the correct price', ()=> {
        expect(product.getPrice()).toEqual('Rs. 5,400');
    })
});

describe('test suite: Clothing', () => {
    let clothing;
  
    beforeEach(() => {
      clothing = new Clothing({
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: "Adults Plain Cotton T-Shirt - 2 Pack",
        rating: {
          stars: 4.5,
          count: 56
        },
        price: 799,
        keywords: [
          "tshirts",
          "apparel",
          "mens"
        ],
        type: "clothing",
        sizeChartLink: "images/clothing-size-chart.png"
      },);
    });
  
    it('has the correct properties', () => {
      
      expect(clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e'),
      expect(clothing.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
  
      expect(clothing.sizeChartLink).toEqual('images/clothing-size-chart.png');
    });
  
    it('gets the stars url', () => {
      expect(clothing.getStarsUrl()).toEqual('images/ratings/rating-45.png');
    });
  
    it('gets the price', () => {
      expect(clothing.getPrice()).toEqual('Rs. 799');
    });
  
    it('displays a size chart link in extraInfoHTML', () => {
      
      expect(clothing.extraInfoHtml()).toContain(
        `<a href="images/clothing-size-chart.png" target="_blank">`
      );
  
      
      expect(clothing.extraInfoHtml()).toContain('Size chart');
    });
  });
  
  describe('test suite: Appliance', () => {
    let appliance;
  
    beforeEach(() => {
      appliance = new Appliance({
        id: "54e0eccd-8f36-462b-b68a-8182611d9add",
        image: "images/products/black-2-slot-toaster.jpg",
        name: "2 Slot Toaster - Black",
        rating: {
          stars: 5,
          count: 2197
        },
        price: 1899,
        keywords: [
          "toaster",
          "kitchen",
          "appliances"
        ],
        type: "appliance",
        instructionLink: "images/appliance-instructions.png",
        warrantyLink: "images/appliance-warranty.png"
      });
    });
  
    it('has the correct properties', () => {
      expect(appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add'),
      expect(appliance.image).toEqual('images/products/black-2-slot-toaster.jpg');
  
      expect(appliance.instructionLink).toEqual('images/appliance-instructions.png');
      expect(appliance.warrantyLink).toEqual('images/appliance-warranty.png');
    });
  
    it('gets the stars url', () => {
      expect(appliance.getStarsUrl()).toEqual('images/ratings/rating-50.png');
    });
  
    it('gets the price', () => {
      expect(appliance.getPrice()).toEqual('Rs. 1,899');
    });
  
    it('displays instructions and warranty in extraInfoHtml', () => {
      expect(appliance.extraInfoHtml()).toContain(
        `<a href="images/appliance-instructions.png" target="_blank">`
      );
      expect(appliance.extraInfoHtml()).toContain('Instructions');
  
      expect(appliance.extraInfoHtml()).toContain(
        `<a href="images/appliance-warranty.png" target="_blank">`
      );
      expect(appliance.extraInfoHtml()).toContain('Warranty');
    });
  });