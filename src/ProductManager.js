import fs from "fs";

class ProductManager {
  #path=''
  constructor(path) {
    this.path = path;
  }
  #accumulatorId = 0;

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.#path,'utf-8');
      return JSON.parse(products);
    } catch (e) {
      return [];
    }
  }
  async addProducts(title, description, price, thumbnail, code, stock) {
    const newProduct = {
      id: this.#accumulatorId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    const prod = await this.getProducts();
    let cd = prod.find((p) => p.code === code);
    if (!cd) {
      fs.promises.writeFile(path, JSON.stringify([...prod, newProduct]));
      this.#accumulatorId += 1;
    } else {
      throw new Error(`El código ${code} ya esta registrado.`);
    }
  }
 async  getProductById(id) {
    const prod =  await this.getProducts()
    let element = prod.find((e) => e.id === id);
    if (element) {
      return element;
    } else {
      // return `<h2>Product with ID: ${id} Not Found</h2>`;
      console.log( `<h2>ID product: ${id} Not Found</h2>`);
    }
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    let actual = [];
    const prod = await this.getProducts();
    actual = prod.find((x) => x.id === id);

    if (title === undefined) {
      title = prod[id - 1].title;
    } else {
      actual.title = title;
    }
    if (description === undefined) {
      title = prod[id - 1].description;
    } else {
      actual.description = description;
    }
    if (price === undefined || price !== Number) {
      price = prod[id - 1].price;
    } else {
      actual.price = price;
    }
    if (thumbnail === undefined) {
      thumbnail = prod[id - 1].thumbnail;
    } else {
      actual.thumbnail = thumbnail;
    }
    if (code === undefined) {
      code = prod[id - 1].code;
    } else {
      actual.code = code;
    }
    if (stock === undefined || stock !== Number) {
      stock = prod[id - 1].stock;
    } else {
      actual.stock = stock;
    }
    fs.promises.appendFile(
      this.path,
     console.log( `Lista de productos : ${JSON.stringify(prod)}`)
    );
  }

  async deleteProduct(id) {
    // Elimina producto por ID
    const prod = await this.getProducts();
    let checkId = prod.find((p) => p.id === id);
    if (checkId) {
      let rest = prod.filter((p) => p.id !== id);
      fs.promises.appendFile(
        "./products.json",
      //  console.log( `Productos actuales:  ${JSON.stringify(rest)}`)
        `Productos actuales:  ${JSON.stringify(rest)}`
      );
    } else {
      throw new Error(` No se encuentra el atributo id del producto: ${id}`);
    }
  }
}


export default ProductManager;