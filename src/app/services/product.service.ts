import { Injectable } from '@angular/core';
import {Product} from "../shared/models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getDrinkById(id: number): Product {
    return this.getAll().find(drink => drink.id == id);
  }

  getAll(): Product[] {
    return [{
      id: 1,
      name: 'strawbery drinka',
      price: 5,
      favorite: true,
      star: 5,
      imageUrl: '/assets/drink-1.jpg',
      tags: ['nonsweet', 'healthy'],
      description: 'stwawbery boba tea make with love',
      addOn: {
        title: 'Signature Product Add-On',
        description: 'Optional',
        option: [{
          name: 'Coconut Jelly',
          isAdd: false,
          price: 0.75
        }, {
          name: 'Rainbow Jelly',
          isAdd: false,
          price: 0.75
        }, {
          name: 'Crystal Boba',
          isAdd: false,
          price: 0.75
        }
        ]
      }
    },
      {
        id: 2,
        name: 'strawbery drink B',
        price: 5,
        favorite: true,
        star: 5,
        imageUrl: '/assets/drink-2.jpg',
        tags: ['nonsweet', 'healthy'],
        description: 'stwawbery boba tea make with love',
        addOn: {
          title: 'Signature Product Add-On',
          description: 'Optional',
          option: [{
            name: 'Coconut Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Rainbow Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Crystal Boba',
            isAdd: false,
            price: 0.75
          }
          ]
        }

      },
      {
        id: 3,
        name: 'strawbery drink C',
        price: 5,
        favorite: true,
        star: 5,
        imageUrl: '/assets/drink-3.jpg',
        tags: ['nonsweet', 'healthy'],
        description: 'stwawbery boba tea make with love',
        addOn: {
          title: 'Signature Product Add-On',
          description: 'Optional',
          option: [{
            name: 'Coconut Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Rainbow Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Crystal Boba',
            isAdd: false,
            price: 0.75
          }
          ]
        }
      },
      {
        id: 4,
        name: 'strawbery drink D',
        price: 5,
        favorite: true,
        star: 5,
        imageUrl: '/assets/drink-4.jpg',
        tags: ['nonsweet', 'healthy'],
        description: 'stwawbery boba tea make with love',
        addOn: {
          title: 'Signature Product Add-On',
          description: 'Optional',
          option: [{
            name: 'Coconut Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Rainbow Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Crystal Boba',
            isAdd: false,
            price: 0.75
          }
          ]
        }
      },
      {
        id: 5,
        name: 'strawbery drink E',
        price: 5,
        favorite: true,
        star: 5,
        imageUrl: '/assets/drink-5.jpg',
        tags: ['nonsweet', 'healthy'],
        description: 'stwawbery boba tea make with love',
        addOn: {
          title: 'Signature Product Add-On',
          description: 'Optional',
          option: [{
            name: 'Coconut Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Rainbow Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Crystal Boba',
            isAdd: false,
            price: 0.75
          }
          ]
        }
      },
      {
        id: 6,
        name: 'strawbery drink F',
        price: 5,
        favorite: true,
        star: 5,
        imageUrl: '/assets/drink-6.jpg',
        tags: ['nonsweet', 'healthy'],
        description: 'stwawbery boba tea make with love',
        addOn: {
          title: 'Signature Product Add-On',
          description: 'Optional',
          option: [{
            name: 'Coconut Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Rainbow Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Crystal Boba',
            isAdd: false,
            price: 0.75
          }
          ]
        }
      },
      {
        id: 7,
        name: 'strawbery drink G',
        price: 5,
        favorite: true,
        star: 5,
        imageUrl: '/assets/drink-7.jpg',
        tags: ['nonsweet', 'healthy'],
        description: 'stwawbery boba tea make with love',
        addOn: {
          title: 'Signature Product Add-On',
          description: 'Optional',
          option: [{
            name: 'Coconut Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Rainbow Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Crystal Boba',
            isAdd: false,
            price: 0.75
          }
          ]
        }
      },
      {
        id: 8,
        name: 'strawbery drink H',
        price: 5,
        favorite: true,
        star: 5,
        imageUrl: '/assets/drink-8.jpg',
        tags: ['nonsweet', 'healthy'],
        description: 'stwawbery boba tea make with love',
        addOn: {
          title: 'Signature Product Add-On',
          description: 'Optional',
          option: [{
            name: 'Coconut Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Rainbow Jelly',
            isAdd: false,
            price: 0.75
          }, {
            name: 'Crystal Boba',
            isAdd: false,
            price: 0.75
          }
          ]
        }
      }
    ];
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  // getAllTags(): Tag[] {
  //   return sample_tags;
  // }
  getAlFoodsByTag(tag: string): Product[] {
    return tag === "All" ?
      this.getAll() :
      this.getAll().filter(food => food.tags?.includes(tag))
  }
}
