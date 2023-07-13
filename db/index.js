const Sequelize = require("sequelize");

// Establishing a connection to the database, either using the connection URL in the environment variables or using a local connection URL

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_schools_db"
);

// Importing specific types from Sequelize that will be used in the model definitions

const { UUID, UUIDV4, STRING, TEXT, DECIMAL } = Sequelize;

// Defining the 'campus' model with a set of fields and their types.

const Campus = conn.define("campus", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: TEXT,
  },
  image: {
    type: TEXT,
  },
  header: {
    type: TEXT,
  },
});

const Student = conn.define("student", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: {
        msg: "Must be a valid email address",
      },
    },
  },
  gpa: {
    type: DECIMAL(10, 1),
    validate: {
      min: 0,
      max: 4,
    },
  },
  image: {
    type: TEXT,
  },
});

// Defining the relationship between the models. A student belongs to a campus, and a campus can have many students.

Student.belongsTo(Campus);
Campus.hasMany(Student);

// Defining an async function to seed the database with initial data. The 'force: true' option in sync will drop the tables if they exist and re-create them

const seed = async () => {
  await conn.sync({ force: true });

  const [su] = await Promise.all([
    Campus.create({
      name: "Syracuse University",
      address: "900 South Crouse Ave Syracuse, NY 13244",
      description:
        "Syracuse University is a private research university in Syracuse, New York. Established in 1870 with roots in the Methodist Episcopal Church, the university has been nonsectarian since 1920. Located in the city's University Hill neighborhood, east and southeast of Downtown Syracuse, the large campus features an eclectic mix of architecture, ranging from nineteenth-century Romanesque Revival to contemporary buildings.",
      image: "public/su.png",
      header: "public/suheader.png",
    }),
  ]);
  const [occ] = await Promise.all([
    Campus.create({
      name: "Onondaga Community College",
      address: "4585 W Seneca Turnpike, Syracuse, NY 13215",
      description:
        "Onondaga Community College (OCC) is a public community college that serves Onondaga County, New York, at two campuses. It is part of the State University of New York (SUNY) system.",
      image: "public/occ.jpeg",
      header: "public/headerocc.jpeg",
    }),
  ]);
  const [lemoyne] = await Promise.all([
    Campus.create({
      name: "LeMoyne College",
      address: "1419 Salt Springs Rd, Syracuse, NY 13214",
      description:
        "LeMoyne College is a private Jesuit college in DeWitt, New York. It was founded by the Society of Jesus in 1946 and named after Jesuit missionary Simon Le Moyne. At its founding, Le Moyne was the first co-educational Jesuit college in the United States.",
      image: "public/lemoyne.jpeg",
      header: "public/headerlemoyne.jpeg",
    }),
  ]);
  const [oswego] = await Promise.all([
    Campus.create({
      name: "SUNY Oswego",
      address: "7060 NY-104, Oswego, NY 13126",
      description:
        "State University of New York at Oswego is a public university in the City of Oswego and Town of Oswego, New York. It has two campuses: historic lakeside campus in Oswego and Metro Center in Syracuse, New York.",
      image: "public/oswego.jpeg",
      header: "public/headeroswego.jpeg",
    }),
  ]);

  await Promise.all([
    Student.create({
      firstName: "Michael",
      lastName: "Fisher",
      email: "mikefisher@syracuse.edu",
      gpa: 2.9,
      image: "public/mfisher.jpg",
      campusId: su.id,
    }),
  ]);

  await Promise.all([
    Student.create({
      firstName: "Aniya",
      lastName: "Gill",
      email: "aniyagill@oswego.edu",
      gpa: 2.7,
      image: "public/aniya.jpg",
      campusId: oswego.id,
    }),
  ]);

  await Promise.all([
    Student.create({
      firstName: "Samantha",
      lastName: "Wiseman",
      email: "samwiseman@syracuse.edu",
      gpa: 3.8,
      image: "public/samwiseman.jpg",
      campusId: su.id,
    }),
  ]);

  await Promise.all([
    Student.create({
      firstName: "Jessica",
      lastName: "Culler",
      email: "jessicaculler@lemoyne.edu",
      gpa: 3.4,
      image: "public/jessicaculler.jpg",
      campusId: lemoyne.id,
    }),
  ]);

  await Promise.all([
    Student.create({
      firstName: "Tyler",
      lastName: "Riddick",
      email: "tylerriddick@occ.edu",
      gpa: 3.1,
      image: "public/triddick.jpg",
      campusId: occ.id,
    }),
  ]);

  await Promise.all([
    Student.create({
      firstName: "Ian",
      lastName: "Hanson",
      email: "ianhenson@lemoyne.edu",
      gpa: 3.9,
      image: "public/ianhanson.jpg",
      campusId: lemoyne.id,
    }),
  ]);

  await Promise.all([
    Student.create({
      firstName: "Helena",
      lastName: "Rowe",
      email: "helenarowe@syracuse.edu",
      gpa: 3.7,
      image: "public/helenarowe.jpg",
      campusId: su.id,
    }),
  ]);

  await Promise.all([
    Student.create({
      firstName: "Kelly",
      lastName: "Morris",
      email: "kellymorris@oswego.edu",
      gpa: 3.5,
      image: "public/kmorris.jpg",
      campusId: oswego.id,
    }),
  ]);

  await Promise.all([
    Student.create({
      firstName: "Natalie",
      lastName: "Walker",
      email: "nataliewalker@syracuse.edu",
      gpa: 3.0,
      image: "public/nataliewalker.jpg",
      campusId: su.id,
    }),
  ]);

  await Promise.all([
    Student.create({
      firstName: "Marcus",
      lastName: "Bowman",
      email: "marcusbowman@occ.edu",
      gpa: 2.5,
      image: "public/marcus.jpg",
      campusId: occ.id,
    }),
  ]);
};

// Exporting the database connection, seed function, and models to be used elsewhere in the application

module.exports = {
  conn,
  seed,
  Campus,
  Student,
};
