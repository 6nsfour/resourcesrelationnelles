import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import usersRouter from './../src/router/usersRouter';
const prisma = new PrismaClient();

const saltRounds = 23;

async function main() {

  const roles = [
    {value:'not_connected'},
    {value:'connected'},
    {value:'moderator'},
    {value:'admin'},
    {value:'super_admin'}
  ]

  for (const role of roles) {
    
    const existingRole = await prisma.role.findFirst({
      where: { value: role.value },
    });

    if(!existingRole) {
      await prisma.role.create({
        data: role
      });
    }
  }

  const users = [
    { firstname: 'Benoit', lastname: 'Lebel', email: 'BenoitLebel@dayrep.com', password: 'b0OGX7NvcZ2UbzB', role: 5 },
    { firstname: 'Thibaut', lastname: 'Guay', email: 'ThibautGuay@armyspy.com', password: 'fGtMkXSGlaMtWlL', role: 1 },
    { firstname: 'Eugène', lastname: 'Miron', email: 'EugeneMiron@dayrep.com', password: '1YxBAwSLGa0oWT1', role: 2 },
    { firstname: 'Gerard', lastname: 'Menvussa', email: 'GerardMenvussa@gmail.com', password: '1YxBAwSLGa0oWT1', role: 3 },
    { firstname: 'Laurent', lastname: 'Gina', email: 'LaurentGina@gmail.com', password: 'lOO4iqtuxqHEyBm', role: 4 },
    { firstname: 'Jean', lastname: 'Peuplu', email: 'Jeanpeuplu@gmail.com', password: 'Oop6S99maLLSVjx', role: 5 },
    { firstname: 'Barack', lastname: 'Afritte', email: 'BarrackAfritte@gmail.com', password: 'PWhiFXoncNv77O6', role: 3 },
    { firstname: 'Alain', lastname: 'Terieur', email: 'AlainTerieur@gmail.com', password: 'P65qTNNKyskWKWY', role: 1 },
    { firstname: 'Ahmed', lastname: 'iter', email: 'Ahmediter@hotmail.com', password: 'r9Rova9fZn6Aikg', role: 2 },
    { firstname: 'Claire', lastname: 'Henette', email: 'Clairehenette@orange.com', password: 'CENGtoCTtTVUm8N', role: 3 },
    { firstname: 'Guy', lastname: 'Tar', email: 'Guytar@outlook.com', password: 'sVNaaGj750FZgEU', role: 4 },
    { firstname: 'Phil', lastname: 'Trahuile', email: 'PhilTrahuile@se.com', password: '9C8Mv764kOjpVe0', role: 5 },
    { firstname: 'Sarah', lastname: 'Croche', email: 'Sarahcroche@bing.com', password: '7lSu26dSzzNxfpN', role: 4 },
    { firstname: 'Terry', lastname: 'Kiki', email: 'Terrykiki@yahoo.com', password: 'xMtqwG11G8Q4IH4', role: 1 },
    { firstname: 'Gragas', lastname: 'Legros', email: 'Legrosgragas@gmail.com', password: 'UsqryxxqJxMgaXp', role: 2 },
    { firstname: 'Brice', lastname: 'Fremont', email: 'BriceFremont@jourrapide.com', password: 'DLThuwy3UIiNujo', role: 3 },

    // Add more users according to your needs
  ];

  for (const user of users) {

    const existingUser = await prisma.role.findFirst({
      where: { value: user.email },
    });

    if(existingUser) {
      await prisma.user.create({
        data: {
          ...user,
          role: { connect: { id: user.role } }
        },
      });
    }


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