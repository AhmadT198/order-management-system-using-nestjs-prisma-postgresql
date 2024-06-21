// prisma/seed.ts
import { PrismaClient } from '@prisma/client';


// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    const pword = "some hash"
  // create two dummy recipes
  const user1 = await prisma.user.upsert({
    where: {email: 'dummy1@test.com'},
    update: {},
    create: {
        name: 'Dummy User 1',
        email: 'dummy1@test.com',
        password: pword,
        address: "dummy address",
    }
  })

  const user2 = await prisma.user.upsert({
    where: {email: 'dummy2@test.com'},
    update: {},
    create: {
        name: 'Dummy User 2',
        email: 'dummy2@test.com',
        password: pword,
        address: "dummy address",
    }
  })

  const product1 = await prisma.product.create({
    data: {
        name:"product 1",
        description: "desc of product 1",
        price: 19.99,
        stock: 10
    }
  })
  const product5 = await prisma.product.create({
    data: {
        name:"product 5",
        description: "desc of product 5",
        price: 19.99,
        stock: 10
    }
  })
  const product2 = await prisma.product.create({
    data: {
        name:"product 2",
        description: "desc of product 2",
        price: 19.99,
        stock: 10
    }
  })
  const product3 = await prisma.product.create({
    data: {
        name:"product 3",
        description: "desc of product 3",
        price: 19.99,
        stock: 10
    }
  })
  const product4 = await prisma.product.create({
    data: {
        name:"product 4",
        description: "desc of product 4",
        price: 19.99,
        stock: 10
    }
  })

  const cart1 = await prisma.cart.upsert({
    where: {userId : user1.userId},
    update: {},
    create : {
        userId: user1.userId,
    }
    })

  const cart2 = await prisma.cart.upsert({
    where: {userId : user2.userId},
    update: {},
    create : {
        userId: user2.userId,
    }
    })

    await prisma.cartProducts.upsert({
        where: {
            cartId_productId: {
                cartId: cart1.cartId,
                productId: product1.productId
        }},
        update: {},
        create: {
            cartId: cart1.cartId,
            productId: product1.productId,
            quantity:3
        }
    })

    await prisma.cartProducts.upsert({
        where: {
            cartId_productId: {
                cartId: cart1.cartId,
                productId: product3.productId
        }},
        update: {},
        create: {
            cartId: cart1.cartId,
            productId: product3.productId,
            quantity:3
        }
    })

    await prisma.cartProducts.upsert({
        where: {
            cartId_productId: {
                cartId: cart1.cartId,
                productId: product5.productId
        }},
        update: {},
        create: {
            cartId: cart1.cartId,
            productId: product5.productId,
            quantity:10
        }
    })

    await prisma.cartProducts.upsert({
        where: {
            cartId_productId: {
                cartId: cart2.cartId,
                productId: product2.productId
        }},
        update: {},
        create: {
            cartId: cart2.cartId,
            productId: product2.productId,
            quantity:3
        }
    })

    await prisma.cartProducts.upsert({
        where: {
            cartId_productId: {
                cartId: cart2.cartId,
                productId: product4.productId
        }},
        update: {},
        create: {
            cartId: cart2.cartId,
            productId: product4.productId,
            quantity:3
        }
    })

    const order1 = await prisma.order.create({
        data: {
            status: "pending",
            userId: user1.userId,
        }
    })
    const order2 = await prisma.order.create({
        data: {
            status: "pending",
            userId: user2.userId,
        }
    })
    const order3 = await prisma.order.create({
        data: {
            status: "pending",
            userId: user1.userId,
        }
    })


    await prisma.orderProducts.create({
        data: {
            orderId:order1.orderId,
            productId: product1.productId,
            quantity:3
        }
    })
    await prisma.orderProducts.create({
        data: {
            orderId:order1.orderId,
            productId: product3.productId,
            quantity:3
        }
    })
    await prisma.orderProducts.create({
        data: {
            orderId:order2.orderId,
            productId: product2.productId,
            quantity:3
        }
    })
    await prisma.orderProducts.create({
        data: {
            orderId:order2.orderId,
            productId: product4.productId,
            quantity:3
        }
    })
    await prisma.orderProducts.create({
        data: {
            orderId:order3.orderId,
            productId: product5.productId,
            quantity:3
        }
    })
    await prisma.orderProducts.create({
        data: {
            orderId:order3.orderId,
            productId: product1.productId,
            quantity:3
        }
    })
  console.log({ user1, user2 });
  console.log({ product1, product2, product3, product4, product5 });
  console.log({cart1, cart2});
  console.log({order1, order2, order3})
}

// execute the main function
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
