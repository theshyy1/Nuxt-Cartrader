import { cars } from "@/data/cars.json";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { city } = event.context.params;
  const { make, maxPrice, minPrice } = getQuery(event);

  let filters = {
    city: city.toLowerCase(),
  };

  if (make) {
    filters.make = make;
  }

  if (minPrice || maxPrice) {
    filters.price = {};
  }

  if (minPrice) {
    filters.price.gte = parseInt(minPrice);
  }
  if (maxPrice) {
    filters.price.lte = parseInt(maxPrice);
  }

  return await prisma.car.findMany({
    where: filters,
  });
});
