import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import usersRouter from "./../src/router/usersRouter";
const prisma = new PrismaClient();

const saltRounds = 23;

async function main() {
  const roles = [
    { value: "not_connected" },
    { value: "connected" },
    { value: "moderator" },
    { value: "admin" },
    { value: "super_admin" },
  ];

  for (const role of roles) {
    const existingRole = await prisma.role.findFirst({
      where: { value: role.value },
    });

    if (!existingRole) {
      await prisma.role.create({
        data: role,
      });
    }
  }

  const users = [
    {
      firstname: "Benoit",
      lastname: "Lebel",
      email: "BenoitLebel@dayrep.com",
      password: "b0OGX7NvcZ2UbzB",
      role: 5,
    },
    {
      firstname: "Thibaut",
      lastname: "Guay",
      email: "ThibautGuay@armyspy.com",
      password: "fGtMkXSGlaMtWlL",
      role: 1,
    },
    {
      firstname: "Eugène",
      lastname: "Miron",
      email: "EugeneMiron@dayrep.com",
      password: "1YxBAwSLGa0oWT1",
      role: 2,
    },
    {
      firstname: "Gerard",
      lastname: "Menvussa",
      email: "GerardMenvussa@gmail.com",
      password: "1YxBAwSLGa0oWT1",
      role: 3,
    },
    {
      firstname: "Laurent",
      lastname: "Gina",
      email: "LaurentGina@gmail.com",
      password: "lOO4iqtuxqHEyBm",
      role: 4,
    },
    {
      firstname: "Jean",
      lastname: "Peuplu",
      email: "Jeanpeuplu@gmail.com",
      password: "Oop6S99maLLSVjx",
      role: 5,
    },
    {
      firstname: "Barack",
      lastname: "Afritte",
      email: "BarrackAfritte@gmail.com",
      password: "PWhiFXoncNv77O6",
      role: 3,
    },
    {
      firstname: "Alain",
      lastname: "Terieur",
      email: "AlainTerieur@gmail.com",
      password: "P65qTNNKyskWKWY",
      role: 1,
    },
    {
      firstname: "Ahmed",
      lastname: "iter",
      email: "Ahmediter@hotmail.com",
      password: "r9Rova9fZn6Aikg",
      role: 2,
    },
    {
      firstname: "Claire",
      lastname: "Henette",
      email: "Clairehenette@orange.com",
      password: "CENGtoCTtTVUm8N",
      role: 3,
    },
    {
      firstname: "Guy",
      lastname: "Tar",
      email: "Guytar@outlook.com",
      password: "sVNaaGj750FZgEU",
      role: 4,
    },
    {
      firstname: "Phil",
      lastname: "Trahuile",
      email: "PhilTrahuile@se.com",
      password: "9C8Mv764kOjpVe0",
      role: 5,
    },
    {
      firstname: "Sarah",
      lastname: "Croche",
      email: "Sarahcroche@bing.com",
      password: "7lSu26dSzzNxfpN",
      role: 4,
    },
    {
      firstname: "Terry",
      lastname: "Kiki",
      email: "Terrykiki@yahoo.com",
      password: "xMtqwG11G8Q4IH4",
      role: 1,
    },
    {
      firstname: "Gragas",
      lastname: "Legros",
      email: "Legrosgragas@gmail.com",
      password: "UsqryxxqJxMgaXp",
      role: 2,
    },
    {
      firstname: "Brice",
      lastname: "Fremont",
      email: "BriceFremont@jourrapide.com",
      password: "DLThuwy3UIiNujo",
      role: 3,
    },

    // Add more users according to your needs
  ];

  for (const user of users) {
    const existingUser = await prisma.role.findFirst({
      where: { value: user.email },
    });

    if (existingUser) {
      await prisma.user.create({
        data: {
          ...user,
          role: { connect: { id: user.role } },
        },
      });
    }
  }
  
  const content =
  "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.";


  const resources = [
    {
      content: content,
      title: "lorem ipsum",
      updated_at: "2022-12-27 08:26:49.219717",
      created_at: "1999-10-11 08:26:49.219717",
      file: "",
      type: "1",
      status: "1",
      reach: "1",
      user: "1",
    },
    {
      content: content,
      title: "lorem ipsum",
      updated_at: "2022-12-27 08:26:49.219717",
      created_at: "1999-10-11 08:26:49.219717",
      file: "",
      type: "1",
      status: "1",
      reach: "1",
      user: "1",
    },
    {
      content: content,
      title: "lorem ipsum",
      updated_at: "2022-12-27 08:26:49.219717",
      created_at: "1999-10-11 08:26:49.219717",
      file: "",
      type: "1",
      status: "1",
      reach: "1",
      user: "1",
    },
    {
      content: content,
      title: "lorem ipsum",
      updated_at: "2022-12-27 08:26:49.219717",
      created_at: "1999-10-11 08:26:49.219717",
      file: "",
      type: "1",
      status: "1",
      reach: "1",
      user: "1",
    },
    {
      content: content,
      title: "lorem ipsum",
      updated_at: "2022-12-27 08:26:49.219717",
      created_at: "1999-10-11 08:26:49.219717",
      file: "",
      type: "1",
      status: "1",
      reach: "1",
      user: "1",
    },
    {
      content: content,
      title: "lorem ipsum",
      updated_at: "2022-12-27 08:26:49.219717",
      created_at: "1999-10-11 08:26:49.219717",
      file: "",
      type: "1",
      status: "1",
      reach: "1",
      user: "1",
    },
    {
      content: content,
      title: "lorem ipsum",
      updated_at: "2022-12-27 08:26:49.219717",
      created_at: "1999-10-11 08:26:49.219717",
      file: "",
      type: "1",
      status: "1",
      reach: "1",
      user: "1",
    },
    {
      content: content,
      title: "lorem ipsum",
      updated_at: "2022-12-27 08:26:49.219717",
      created_at: "1999-10-11 08:26:49.219717",
      file: "",
      type: "1",
      status: "1",
      reach: "1",
      user: "1",
    },
    {
      content: content,
      title: "lorem ipsum",
      updated_at: "2022-12-27 08:26:49.219717",
      created_at: "1999-10-11 08:26:49.219717",
      file: "",
      type: "1",
      status: "1",
      reach: "1",
      user: "1",
    },
    {
      content: content,
      title: "lorem ipsum",
      updated_at: "2022-12-27 08:26:49.219717",
      created_at: "1999-10-11 08:26:49.219717",
      file: "",
      type: "1",
      status: "1",
      reach: "1",
      user: "1",
    },
  ];

  for (const resource of resources) {
    await prisma.user.create({
      data: {
        ...resource,
        type: { connect: { id: resource.type } },
        status: { connect: { id: resource.status } },
        reach: { connect: { id: resource.reach } },
        user: { connect: { id: resource.user } },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
