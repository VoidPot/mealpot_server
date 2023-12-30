import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    "info",
    "warn",
    "error",
  ],
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Duration: " + e.duration + "ms");
});

async function main() {
  const alice = await prisma.account.create({
    data: {
      firstName: "Alice",
      email: "alice@prisma.io",
      type: "BUSINESS",
      password:
        "8f049c5bb0af54595ff497f48136845bbd70a552cf20555964594483c457e8e5540c5aaed5315d4829389afc327570d1e4e1770eb1575b15d417b1b30e659022",
      salt: "e5b63b6d20e469a655258effcf869aac52a701df76510a77120a458327beeaa0b0afe6be70470f98181f557be3bd0847f1e9e013d3d81a7ad45df3889264e579",
    },
  });

  const bob = await prisma.account.create({
    data: {
      firstName: "Bob",
      email: "bob@prisma.io",
      type: "BUSINESS",
      password:
        "8f049c5bb0af54595ff497f48136845bbd70a552cf20555964594483c457e8e5540c5aaed5315d4829389afc327570d1e4e1770eb1575b15d417b1b30e659022",
      salt: "e5b63b6d20e469a655258effcf869aac52a701df76510a77120a458327beeaa0b0afe6be70470f98181f557be3bd0847f1e9e013d3d81a7ad45df3889264e579",
    },
  });

  const charlie = await prisma.account.create({
    data: {
      firstName: "Charlie",
      email: "charlie@prisma.io",
      type: "BUSINESS",
      password:
        "8f049c5bb0af54595ff497f48136845bbd70a552cf20555964594483c457e8e5540c5aaed5315d4829389afc327570d1e4e1770eb1575b15d417b1b30e659022",
      salt: "e5b63b6d20e469a655258effcf869aac52a701df76510a77120a458327beeaa0b0afe6be70470f98181f557be3bd0847f1e9e013d3d81a7ad45df3889264e579",
    },
  });

  const danny = await prisma.account.create({
    data: {
      firstName: "Danny",
      email: "danny@prisma.io",
      type: "BUSINESS",
      password:
        "8f049c5bb0af54595ff497f48136845bbd70a552cf20555964594483c457e8e5540c5aaed5315d4829389afc327570d1e4e1770eb1575b15d417b1b30e659022",
      salt: "e5b63b6d20e469a655258effcf869aac52a701df76510a77120a458327beeaa0b0afe6be70470f98181f557be3bd0847f1e9e013d3d81a7ad45df3889264e579",
    },
  });

  const elena = await prisma.account.create({
    data: {
      firstName: "Elena",
      email: "elena@prisma.io",
      type: "BUSINESS",
      password:
        "8f049c5bb0af54595ff497f48136845bbd70a552cf20555964594483c457e8e5540c5aaed5315d4829389afc327570d1e4e1770eb1575b15d417b1b30e659022",
      salt: "e5b63b6d20e469a655258effcf869aac52a701df76510a77120a458327beeaa0b0afe6be70470f98181f557be3bd0847f1e9e013d3d81a7ad45df3889264e579",
    },
  });

  const store = await prisma.store.create({
    data: {
      name: "A Canteen",
      slug: "a-canteen",
      tables: 5,
      addresses: {
        create: {
          line1: "New street",
          state: "Tamil Nadu",
          county: "India",
          pincode: "606601",
          position: 1,
        },
      },
      connections: {
        createMany: {
          data: [
            {
              role: "ADMIN",
              accountId: alice.id,
            },
            {
              role: "BILLER",
              accountId: bob.id,
            },
            {
              role: "KITCHEN",
              accountId: charlie.id,
            },
            {
              role: "MANAGER",
              accountId: danny.id,
            },
            {
              role: "OTHER",
              accountId: elena.id,
            },
          ],
        },
      },
    },
  });
  const storeId = store.id;

  const image1 = await prisma.image.create({
    data: {
      caption: "Briyani Food",
      altText: "The Briyani pot",
      type: "URL",
      content:
        "https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });

  const image2 = await prisma.image.create({
    data: {
      caption: "Briyani Food",
      altText: "The Briyani Food",
      type: "URL",
      content:
        "https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });

  const category1 = await prisma.category.create({
    data: {
      name: "Briyani",
      deck: "The Special Briyani pot",
      storeId,
      imageId: image1.id,
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Dessert",
      deck: "The Delicious Dessert",
      storeId,
      imageId: image2.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Mutton Briyani",
      deck: "The Mutton Briyani Pot",
      price: 350,
      categoryId: category1.id,
      storeId: storeId,
      image: {
        create: {
          caption: "Mutton Briyani Food",
          altText: "The Mutton Briyani pot",
          type: "URL",
          content:
            "https://media.istockphoto.com/id/980036908/photo/gosht-or-lamb-biryani-prepared-in-basmati-rice-served-with-yogurt-dip-in-terracotta-bowl.jpg?s=1024x1024&w=is&k=20&c=3ZSUuA6nf9xmdX3pWyTcb7iGTme8HudkXOe3bUJDl-c=",
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Raspberries and Pistachio Cake",
      deck: "Delicious cake with pistachio and raspberries",
      price: 100,
      categoryId: category2.id,
      storeId: storeId,
      image: {
        create: {
          caption: "Raspberries and Pistachio Cake",
          altText: "Delicious cake with pistachio and raspberries",
          type: "URL",
          content:
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Chocolate Donuts",
      deck: "Delicious donuts with chocolate",
      price: 150,
      categoryId: category2.id,
      storeId: storeId,
      image: {
        create: {
          caption: "Chocolate Donuts",
          altText: "Delicious donuts with chocolate",
          type: "URL",
          content:
            "https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?q=80&w=2837&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      },
    },
  });
  return true;
}
main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
