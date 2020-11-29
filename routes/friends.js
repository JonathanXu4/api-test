// Here we are going to code the API!!!!
// REST application
// Our API works over HTTP
// Using request from the HTTP verbs:
// - POST
// - GET
// - PATCH / PUT
// - DELETE

// For the routes
let express = require('express');
let router = express.Router();
// For the Data Model
let FriendSchema = require('../models/friends');


function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

// Post complete
router.post('/', (request, response, next) => {
    let newBook = request.body;
    //console.log(request.body);
    // This is what gives an error if not all of the form data is inputted, change this later
    if (!newBook.Name || !newBook.Author || !newBook.ISBN || !newBook.Price) {
        HandleError(response, 'Missing Info', 'Form data missing', 500);
    } else if (typeof newBook.ISBN != 'string') {
        HandleError(response, 'Invalid ISBN', 'ISBN is not a string', 500);
    } else {
        // This lists the structure, change later
        let friend = new FriendSchema({
            Name: newBook.Name,
            Author: newBook.Author,
            ISBN: newBook.ISBN,
            Price: newBook.Price
        });
        friend.save((error) => {
            if (error){
                response.send({"error": error});
            }else{
                response.send({"id": friend.id});
            }
        });
    }
});

// get ALL complete
// get by author complete
router.get('/', (request, response, next) => {
    let author = request.query['author'];
    if (author){
        FriendSchema
            .find({"Author": author})
            .exec( (error, friends) => {
                if (error){
                    response.send({"error": error});
                }else{
                    response.send(friends);
                }
            });
    }else{
        FriendSchema
            .find()
            .exec( (error, friends) => {
                if (error){
                    response.send({"error": error});
                }else{
                    response.send(friends);
                }
            });
    }
} );

// get by ISBN complete
router.get('/:id', (request, response, next) =>{
    console.log(request.params.id);
    FriendSchema
        .findOne({"ISBN": request.params.id}, (error, result) =>{
            if (error) {
                response.status(500).send(error);
            }
            if (result){
                response.send(result);
            }else{
                response.status(404).send({"ISBN": request.params.id, "error":  "Not Found"});
            }

        });
});

// Patch with ISBN complete
router.patch('/:id', (request, response, next) =>{
    FriendSchema
        .findOne({"ISBN": request.params.id}, (error, result) =>{
            if (error) {
                response.status(500).send(error);
            }else if (result){
                for (let field in request.body){
                    result[field] = request.body[field];
                }
                result.save((error, friend)=>{
                    if (error){
                        response.status(500).send(error);
                    }
                    response.send(friend);
                });
            }else{
                console.log('4');
                response.status(404).send({"ISBN": request.params.id, "error":  "Not Found"});
            }

        });
});

// Delete with ISBN complete
router.delete('/:id', (request, response, next) =>{
    FriendSchema
        .findOne({"ISBN": request.params.id}, (error, result) =>{
            if (error) {
                response.status(500).send(error);
            }else if (result){
                result.remove((error)=>{
                    if (error){
                        response.status(500).send(error);
                    }
                    response.send({"deletedISBN": request.params.id});
                });
            }else{
                console.log('4');
                response.status(404).send({"ISBN": request.params.id, "error":  "Not Found"});
            }

        });
});


module.exports = router;