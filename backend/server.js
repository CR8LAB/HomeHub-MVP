import app from "./app.js";


const PORT  = 3000 ;

app.get("/", (req, res) => {
    res.json({
        status: "HomeHub API Running"
    });
});

app.listen(PORT, ()=>{
    console.log(`server running on $(PORT)`)
});