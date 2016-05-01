'use strict';

const express = require('express');

const Item    = require(__dirname + '/../models/item.js');
const List    = require(__dirname + '/../models/list.js');
const User    = require(__dirname + '/../models/user.js');

let router    = express.Router();


router.route('/')

  .get((req, res) => {
    console.log('GET items');
    Item.find({}).populate('lists', 'name _id')
      .exec((err, items) => {
        if(err) {
          console.log('Error getting items: ', err);
          return res.status(500).end({ status: 'failure', message: 'Internal server error.' });
        } else {
          return res.status(200).json(items);
        }
      });
  })
  
  .post((req, res) => {
    console.log('POST items');
    if (req.body.name) {
      let newItem = new Item(req.body);
      newItem.save((err, savedItem) => {
        if (err) {
          console.log('Error saving posted item: ', err);
          return res.status(404).end({ status: 'failure', message: 'Bad request.' });
        } else {
          console.log(savedItem.name + ' saved.');
          if (savedItem.lists.length > 0) {
            console.log('Need to add item references to lists.');
            savedItem.lists.forEach((listId) => {
              List.findOneAndUpdate({ _id: listId }, { $push: { 'items': savedItem._id }}, { new: true }).exec()
                .then((savedList) => {
                  console.log('Updated ' + savedList.name + ' with reference to object ' + req.body.name + '.');
                  res.status(200).json(savedItem);
                })
                .catch((err) => {
                  console.log('Error updating list: ', err);
                });
            });
          } else {
            res.status(200).json(savedItem);
          }
        }
      });
    } else {
      res.status(404).end('400 Bad request.');
    }
  });


router.route('/:id')

  .get((req, res) => {
    console.log('GET items/:id');
    Item.findById(req.params.id).populate('lists') //TODO: make it update users too
      .exec((err, savedItem) => {
        if(err) {
          console.log('Error getting item: ', err);
          return res.status(404).end({ status: 'failure', message: 'Bad request.' });
        } else {
          console.log('Got item ' + savedItem.name + ' successfully.');
          return res.status(200).json(savedItem);
        }
      });
  })
  
  .put((req, res) => {
    console.log('PUT items/:id');
    console.log(req.body); //correct
    let setObj = Object.keys(req.body).reduce((acc, key) => {
      console.log(key);
      if (key !== '_id' ) {
        acc[key] = req.body[key];
        return acc;
      } else {
        return acc;
      }
    }, {});
    
    setObj = { $set: setObj };
    console.log(setObj);
    Item.findOneAndUpdate({ _id: req.params.id }, setObj, { new: true }) //TODO: make it update users too
      .exec((err, savedItem) => {
        if(err) {
          console.log('Error updating item: ', err);
          return res.status(500).end({status: 'failure', message: 'Bad request.'});
        } else {
          console.log('Updated item ' + savedItem.name + ' successfully.');
          console.log(savedItem); //incorrect
          res.status(200).json(savedItem);
          console.log('get here');
          savedItem.lists.forEach((listId) => {
            List.findById(listId, (err, savedList) => {
              if (savedList.items.indexOf(savedItem._id) === -1) {
                console.log('Need to update list with id ' + listId + '.');
                List.findOneAndUpdate({ _id: listId }, { $push: { 'items': savedItem._id }});
              }
            });
          });
        }
      });
  })
  
  .delete((req, res) => {
    console.log('DELETE items/:id');
    Item.findOneAndRemove({_id: req.params.id}, (err, savedItem) => {
      if (err) {
        console.log('Error deleting item: ', err);
        return res.status(404).json({status: 'failure', message: 'Bad request.'});
      } else {
        console.log('Successfully deleted ' + savedItem.name + '.');
        res.status(200).json({status: 'sucess', message: 'Deleted ' + savedItem.name});
      }
    });
  });

module.exports = router;
