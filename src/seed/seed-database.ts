import { prisma } from "../lib/prisma";
import { initialData } from "./seed";


async function seedDatabase() {
    console.log("Seeding database...");
    // Delete existing data
    await Promise.all([
        await prisma.productImage.deleteMany(),
        await prisma.product.deleteMany(),
        await prisma.category.deleteMany(),
    ]);
    const { categories, products } = initialData;
    const categoriesData = categories.map((name) => ({ name }));

    // Create categories
    await prisma.category.createMany({ data: categoriesData as any[] });
    console.log("Categories seeded");

    // Create products
    const categoriesDb = await prisma.category.findMany();
    console.log("Categories fetched from DB", categoriesDb);
    const categoriesMap = categoriesDb.reduce((map, category) => {
        map[category.name.toLocaleLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>);
    console.log("Categories map created", categoriesMap);

    products.forEach(async (product) => {

        const { images, type, ...productData } = product;
        const imagesData = images.map((image) => ({ url: image }));
        const dbProduct = await prisma.product.create({
            data: {
                ...productData,
                categoryId: categoriesMap[type.toLocaleLowerCase()]
            },
        });
        console.log("Product created", dbProduct.title);
        await prisma.productImage.createMany({
            data: imagesData.map((image) => ({
                ...image,
                productId: dbProduct.id,
            })),
        });
        console.log("Product images created", dbProduct.title);
    });
    console.log("Products seeded");
}


(() => {
    if (process.env.NODE_ENV === "production") {
        console.log("Production environment detected, skipping database seeding.");
        return;
    }
    seedDatabase().catch((error) => {
        console.error("Error seeding database:", error);
    });
})();