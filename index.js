import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync('db.json');
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
}
};

const writeData = (data) => {
    try {
        fs.writeFileSync('db.json', JSON.stringify(data));
    } catch (error) {
        console.log(error);
}
};

app.get("/", (req, res) => {
    res.send("prueba de respuesta");
});

app.get("/mails", (req, res) => {
    const data = readData();
    res.json(data);
});

app.get("/mails/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const mail = data.mails.find((mail) => mail.id === id);
    res.json(mail);
});

app.post("/mails", (req, res) => {
    const data = readData();
    const body = req.body;
    const newmail = {
        id: data.mails.length + 1,
        ...body,
    };
    data.mails.push(newmail);
    writeData(data);
    res.json(newmail);
});

app.put("/mails/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const mailIndex = data.mails.findIndex((mail) => mail.id === id);
    data.mails[mailIndex] = {
        ...data.mails[mailIndex],
        ...body,
    };
    writeData(data);
    res.json({message: "mail updated"});
    });

    app.delete("/mails/:id", (req, res) => {
        const data = readData();
        const id = parseInt(req.params.id);
        const mailIndex = data.mails.findIndex((mail) => mail.id === id);
        data.mails.splice(mailIndex, 1);
        writeData(data);
        res.json({message: "mail deleted"});
    });

app.listen(3000, ()=>{
    console.log('server listen to port 3000');
});
