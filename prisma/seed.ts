import { PrismaClient } from "@prisma/client";

/*
Reset la DB : npx prisma db push --force-reset
push les fixtures : npx prisma db seed
*/

const prisma = new PrismaClient();

async function main() {

  const status = [
    {value:"not_verified"},
    {value:"pending"},
    {value:"verified"},
    {value:"archived"},
  ]

  for (const status_value of status) {
    const existingStatus = await prisma.status.findFirst({
      where: {value : status_value.value},
    });

    if (!existingStatus) {
      await prisma.status.create({
        data:status_value,
      });
    }
  }

  const reaches = [
    {value:"private"},
    {value:"public"},
    {value:"restrained"}
  ]

  for (const reach of reaches){
    const existingReach = await prisma.reach.findFirst({
      where: {value : reach.value},
    })

    if (!existingReach) {
      await prisma.reach.create({
        data:reach,
      })
    }
  }

  const types = [
    {value:"Texte"},
    {value:"Document"},
    {value:"Image"},
    {value:"Vidéo"},
  ];

  for (const type of types) {
    const existingType = await prisma.type.findFirst({
      where: { value : type.value},
    });

    if(!existingType) {
      await prisma.type.create({
        data:type,
      });
    }
  }

  const roles = [
    { value: "not_connected" },
    { value: "pending_validation" },
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
      firstname: "Marcus",
      lastname: "Person",
      email: "MarcusPerson@dayrep.com",
      password: "b0OGX7NvcZ2UbzB",
      role: 5,
    },
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
      id: "1",
      firstname: "Brice",
      lastname: "Fremont",
      email: "BriceFremont@jourrapide.com",
      password: "DLThuwy3UIiNujo",
      role: 3,
    },

    // Add more users according to your needs
  ];

  for (const user of users) {
    // Créer un nouvel utilisateur
    await prisma.user.create({
      data: {
        ...user,
        role: { connect: { id: user.role } },
      },
    });
  }

  const Relations = [
    {value:"10-20 ans"},
    {value:"20-30 ans"},
    {value:"30-40 ans"},
    {value:"40-50 ans"},
    {value:"50-60 ans"},
  ]

  for (const relation of Relations) {
    await prisma.relation.create({
      data: relation
    });
  }

  const Categories = [
    {value:"Cuisine"},
    {value:"Bien être"},
    {value:"Sport"},
    {value:"Voiture"},
    {value:"Football"},
    {value:"Astuces"},
    {value:"Pétanque"},
  ]

  for (const Category of Categories) {
    await prisma.category.create({
      data:Category
    })
  }

  const content =
      "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.";

  const updated_at_date = new Date(1642680090542);
  const created_at_date = new Date(1642730471341);

  const resources = [
    {
      content: content,
      title: "Marill est il le meilleur pokemon ?",
      updated_at: updated_at_date,
      created_at: created_at_date,
      file: null,
      type: 1,
      status: 1,
      reach: 1,
      user: "1",
      categories: [1,2,4],
      relations: [1,3],
    },
    {
      content: content,
      title: "Doumbe ou Baki ??",
      updated_at: updated_at_date,
      created_at: created_at_date,
      file: null,
      type: 1,
      status: 1,
      reach: 1,
      user: "1",
      categories: [1,2,4],
      relations: [1,3],
    },
    {
      content: content,
      title: "Comment faire des bébés",
      updated_at: updated_at_date,
      created_at: created_at_date,
      file: null,
      type: 1,
      status: 1,
      reach: 1,
      user: "1",
      categories: [1,2,4],
      relations: [1,3],
    },
    {
      content: content,
      title: "Mais ou est donc Ornicar",
      updated_at: updated_at_date,
      created_at: created_at_date,
      file: null,
      type: 1,
      status: 1,
      reach: 1,
      user: "1",
      categories: [1,2,4],
      relations: [1,3],
    },
    {
      content: content,
      title: "Je sais vraiment po",
      updated_at: updated_at_date,
      created_at: created_at_date,
      file: null,
      type: 1,
      status: 1,
      reach: 1,
      user: "1",
      categories: [1,2,4],
      relations: [1,3],
    },
    {
      content: content,
      title: "C'est vraiment po nice",
      updated_at: updated_at_date,
      created_at: created_at_date,
      file: null,
      type: 1,
      status: 1,
      reach: 1,
      user: "1",
      categories: [1,2,4],
      relations: [1,3],
    },
    {
      content: `C'est vraiment tres gentil d'ta pooooort`,
      title: "Les quebecois sont il vraiment sympa",
      updated_at: updated_at_date,
      created_at: created_at_date,
      file: null,
      type: 1,
      status: 1,
      reach: 1,
      user: "1",
      categories: [1,2,4],
      relations: [1,3],
    },
    {
      content: `tu veux tu pas que j'filme ???!`,
      title: "Que fait un quebecois quand sa meuf le trompe ?",
      updated_at: updated_at_date,
      created_at: created_at_date,
      file: null,
      type: 1,
      status: 1,
      reach: 1,
      user: "1",
      categories: [1,2,4],
      relations: [1,3],
    },
    {
      content: `Oh non ! mon chandaiiiillll`,
      title: "Que fait un quebecois quand tu le tues ?",
      updated_at: updated_at_date,
      created_at: created_at_date,
      file: null,
      type: 1,
      status: 1,
      reach: 1,
      user: "1",
      categories: [1,2,4],
      relations: [1,3],
    },
    {
      content: `Pas plus de mille dollars !`,
      title: "Que fait un quebecois quand tu le voles",
      updated_at: updated_at_date,
      created_at: created_at_date,
      file: null,
      type: 1,
      status: 1,
      reach: 1,
      user: "1",
      categories: [1,2,4],
      relations: [1,3],
    },
  ];

  for (const resource of resources) {
    const createdResource = await prisma.resource.create({
      data: {
        content: resource.content,
        title: resource.title,
        updated_at: resource.updated_at,
        created_at: resource.created_at,
        file: resource.file,
        type: { connect: { id: resource.type } },
        status: { connect: { id: resource.status } },
        reach: { connect: { id: resource.reach } },
        user: { connect: { id: resource.user } },
        resourceCategories: {
          create: resource.categories.map(categoryId => ({
              category: {
                  connect: { id: categoryId }
              }
          }))
        },
        resourceRelations: {
          create: resource.relations.map(relationId => ({
              relation: {
                  connect: { id: relationId }
              }
          }))
        },
      },
    });
  }
  

  const Comments = [
    {content: "First", created_at: new Date(1642680090542), updated_at: new Date(1642680090542)},
    {content: "J'adore !", created_at: new Date(1642680090542), updated_at: new Date(1642680090542)},
    {content: "Pas mal", created_at: new Date(1642680090542), updated_at: new Date(1642680090542)},
    {content: "Ceci est un commentaire", created_at: new Date(1642680090542), updated_at: new Date(1642680090542)},
    {content: "A quand ta prochaine ressource ?", created_at: new Date(1642680090542), updated_at: new Date(1642680090542)},
    {content: "Je lâche un pouce bleu", created_at: new Date(1642680090542), updated_at: new Date(1642680090542)},
    {content: "Pourquoi faire ?", created_at: new Date(1642680090542), updated_at: new Date(1642680090542)},
    {content: "Le colibri est le seul oiseau sachant voler en arrière", created_at: new Date(1642680090542), updated_at: new Date(1642680090542)},
  ]

  for (const comment of Comments) {
    await prisma.comment.create({
      data: comment
    });
  }



  // const favorites = [
  //   {resource: 1, user: "1"},
  //   {resource: 1, user: "2"},
  //   {resource: 2, user: "3"},
  //   {resource: 3, user: "1"},
  //   {resource: 4, user: "4"},
  // ]

  // for (const favorite of favorites) {
  //   await prisma.favorite.create({
  //     data: {
  //       ...favorite,
  //       resource: { connect: {id: favorite.resource}},
  //       user: {connect: {id: favorite.user}}
  //     }
  //   })
  // }

  const relationFilters = [
    {relation_id: 1, resource_id: 1},
    {relation_id: 4, resource_id: 2},
    {relation_id: 3, resource_id: 3},
    {relation_id: 5, resource_id: 4},
    {relation_id: 2, resource_id: 5},
    {relation_id: 1, resource_id: 6},
    {relation_id: 4, resource_id: 7},
    {relation_id: 3, resource_id: 8},
    {relation_id: 2, resource_id: 9},
    {relation_id: 1, resource_id: 10},
  ]

  // const toComments = [
  //   {resource_id:4, user_id:"3", comment_id:1},
  //   {resource_id:3, user_id:"1", comment_id:2},
  //   {resource_id:2, user_id:"4", comment_id:3},
  //   {resource_id:6, user_id:"2", comment_id:4},
  //   {resource_id:5, user_id:"4", comment_id:5},
  //   {resource_id:10, user_id:"5", comment_id:6},
  //   {resource_id:9, user_id:"1", comment_id:7},
  //   {resource_id:7, user_id:"2", comment_id:8},
  // ]

  // for (const toComment of toComments) {
  //   await prisma.toComment.create({
  //     data:toComment
  //   })
  // }

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
