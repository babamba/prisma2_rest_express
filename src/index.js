const { PrismaClient } = require('@prisma/client');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get(`/break-timeline`, async (req, res) => {
  const { breakDownID } = req.query;
  console.log('request id : ', breakDownID);

  // const result = await prisma.breakdownTimeLine.findOne({
  //   where: { id: breakDownID }
  // });
  const result = await prisma.breakDown
    .findOne({
      where: { id: breakDownID }
    })
    .timeline({ orderBy: { createdAt: 'desc' } });
  console.dir('result : ', result);
  res.json(result);
});

app.get(`/break-list`, async (req, res) => {
  //const { page } = req.query;
  //console.log("page : ", page);
  const break_all = await prisma.breakDown.findMany();
  //const break_list = await prisma.breakDowns({
  //  first: 10,
  //  skip: page && page > 0 ? page * 10 - 10 : 0
  //});

  const result = {
    result: break_all,
    total_count: break_all.length
  };
  res.json(result);
});

app.get(`/emergency`, async (req, res) => {
  const emergencyList = await prisma.emergency.findMany();
  const result = {
    result: emergencyList,
    total_count: emergencyList.length
  };
  res.json(result);
});

app.get(`/emergency-timeline`, async (req, res) => {
  const { emergencyId } = req.query;
  console.log('request id : ', emergencyId);

  if (emergencyId !== undefined) {
    const result = await prisma.emergency
      .findOne({
        where: { id: emergencyId }
      })
      .timeline({ orderBy: { createdAt: 'asc' } });
    console.dir('result : ', result);
    res.json(result);
  }
});

app.listen(5553, () => console.log('🚀 Server ready at: http://localhost:5553'));
