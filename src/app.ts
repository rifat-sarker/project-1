
import express, { Request, Response } from "express"
const app = express()
const port = 3000

// parser

app.use(express.json())
app.use(express.text())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Developer')
})

app.post("/", (req: Request, res: Response) => {
    console.log(req.body);
    // res.send("got data")
    res.send({ message: "successfully received data" })
})


export default app;