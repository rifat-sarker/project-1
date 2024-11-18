
import express, { NextFunction, Request, Response } from "express"
const app = express()
const port = 3000

// parser

app.use(express.json())
app.use(express.text())


// router
const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users", userRouter)
app.use("/api/v1/courses", courseRouter)

userRouter.post("/create-user", (req: Request, res: Response) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User created successfully",
        date: user
    })
})

courseRouter.post("/create-course", (req: Request, res: Response) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "course created successfully",
        date: course
    })
})

// middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url, req.method, req.hostname);
    next();
}

app.get('/', logger, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send("Hello World!!!")
    } catch (error) {
        next(error)
    }
})

app.post("/", logger, (req: Request, res: Response) => {
    console.log(req.body);
    // res.send("got data")  
    res.json({ message: "successfully received data" })
})



// default error if user go unspecified route

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "404 not found",
    })
})

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong!",
        })
    }
})




export default app;