const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_schools_db"
);
const { UUID, UUIDV4, STRING, TEXT, DECIMAL } = Sequelize;

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
  image: {
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
      max: 10,
    },
  },
  image: {
    type: TEXT,
  },
});

Student.belongsTo(Campus);
Campus.hasMany(Student);

const seed = async () => {
  await conn.sync({ force: true });

  const [su] = await Promise.all([
    Campus.create({
      name: "Syracuse University",
      address: "900 South Crouse Ave Syracuse, NY 13244",
      image: "public/syracuse.png",
    }),
  ]);
  const [occ] = await Promise.all([
    Campus.create({
      name: "Onondaga Community College",
      address: "4585 W Seneca Turnpike, Syracuse, NY 13215",
      image: "public/occ.jpeg",
    }),
  ]);
  const [lemoyne] = await Promise.all([
    Campus.create({
      name: "LeMoyne College",
      address: "1419 Salt Springs Rd, Syracuse, NY 13214",
      image: "public/lemoyne.jpeg",
    }),
  ]);
  const [oswego] = await Promise.all([
    Campus.create({
      name: "SUNY Oswego",
      address: "7060 NY-104, Oswego, NY 13126",
      image: "public/oswego.jpeg",
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

module.exports = {
  conn,
  seed,
  Campus,
  Student,
};
