const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { asyncHandler, AppError } = require("../utills/errorHandler");

const createStore = asyncHandler(async (request, response) => {
  const { name, tele1, tele2, address, nickName, brand } = request.body;

  if (!name || name.trim().length === 0) {
    throw new AppError("Store name is required", 400);
  }

  if (!tele1 || !address || !brand) {
    throw new AppError("tele1, address and brand are required", 400);
  }

  const store = await prisma.store.create({
    data: {
      name: name.trim(),
      tele1,
      tele2,
      address,
      nickName,
      brand
    },
  });
  return response.status(201).json(store);
});

const updateStore = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const { name, tele1, tele2, address, nickName, brand } = request.body;

  if (!id) {
    throw new AppError("Store ID is required", 400);
  }

  const existingStore = await prisma.store.findUnique({
    where: { id }
  });

  if (!existingStore) {
    throw new AppError("Store not found", 404);
  }

  const updatedStore = await prisma.store.update({
    where: { id },
    data: {
      name: name?.trim(),
      tele1,
      tele2,
      address,
      nickName,
      brand
    },
  });

  return response.status(200).json(updatedStore);
});

const deleteStore = asyncHandler(async (request, response) => {
  const { id } = request.params;

  if (!id) {
    throw new AppError("Store ID is required", 400);
  }

  const existingStore = await prisma.store.findUnique({
    where: { id }
  });

  if (!existingStore) {
    throw new AppError("Store not found", 404);
  }

  await prisma.store.delete({
    where: { id }
  });
  return response.status(204).send();
});

const getStore = asyncHandler(async (request, response) => {
  const { id } = request.params;

  if (!id) {
    throw new AppError("Store ID is required", 400);
  }

  const store = await prisma.store.findUnique({
    where: { id }
  });
  
  if (!store) {
    throw new AppError("Store not found", 404);
  }
  
  return response.status(200).json(store);
});

const getAllStores = asyncHandler(async (request, response) => {
  const stores = await prisma.store.findMany();
  return response.json(stores);
});

module.exports = {
  createStore,
  updateStore,
  deleteStore,
  getStore,
  getAllStores,
};