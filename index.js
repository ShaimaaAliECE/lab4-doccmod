// Startup variables
const express = require('express');
let questionList = require('./questions.json');
const app = express();

// Uses static contents
app.use(express.static('static'));

// Grabs question json
app.get('/questionsInJson', (req, res) => {
    res.json(questionList);
});

// For sending answer responses
app.get('/answers', (req, res) => {

    // Array for answers
    var answers = questionList.map(answerInput);
  
    // Returns Incorrect if answers dont match, otherwise correct
    if(answers[req.query.question] != req.query.counter) {
        res.send('Incorrect');
    } else {
        res.send('Correct');
    }
});

// Gets the answer indexes
function answerInput(index) {
    return index.answerIndex;
}

// For adding to and displaying the total
app.get('/total', (req, res) => {

    // Array of answers
    var answers = questionList.map(answerInput); 
    let total = 0;

    // If answers is correct, add to the total
    if(answers[0] == req.query.a1) {total++;}
    if(answers[1] == req.query.a2) {total++;}
    if(answers[2] == req.query.a3) {total++;}
    if(answers[3] == req.query.a4) {total++;}
    if(answers[4] == req.query.a5) {total++;}

    // Display the mark
    res.send("Grade: " + (total/5)*100 + "%");
});

// Listens on port 80
app.listen(80);