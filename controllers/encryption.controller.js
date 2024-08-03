const { decrypt } = require("../middlewares/decrypt");


const decryptionController = async (req, res) => {
    try {        
        const data = decrypt(req.body);
        res.json({
            message: "Success",
            data: JSON.parse(data)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal server error");
    }
};

const test = async (req, res) => {
    const data = req.body;
    console.log("INCOMING DATA", data);
    const responseData = {
        message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
    }
    res.send(responseData);

};

module.exports = {
    decryptionController,
    test,
}