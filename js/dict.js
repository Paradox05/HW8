/*
HW8
NOTE: I am using a late hw token 
GITHUB URL:
GITHUB REPO:
Name: Roniel Abreu, 
email: roniel_abreu@student.uml.edu
Affiliation: I am a senior majoring in computer science and this assignment is for 
Graphical User Interface programming I with wenjin Zhou
Date:12/16/20
Description:  This is an implementation of the scrabble game not the full one but just a one line
implementation. First we declare a array of letters and these letters have all differnet values we do that in dics.js and then 
we make it so that these tiles can  be dragged on and off of the board thre are bonus squares that give more points 
the score keeps going and the player can choose to restart or keep going until the player wants to quit. I think i was able to get everything working that needed to work for 
this assignment. 



*/


var debugging = false;

var ObjScrabble = {};
ObjScrabble.dictTiles = [];

ObjScrabble.init = function() {
    /** DICTIONARY SETUP *******************************************************
     **  The data in this dictionary was borrowed from Jesse M. Heines at:
     **  https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse_Test.html
     **/
    ObjScrabble.dictTiles['A'] = { 'value': 1,  'freq' : 9,  'quantity' : 9 };
    ObjScrabble.dictTiles['B'] = { 'value': 3,  'freq' : 2,  'quantity' : 2 };
    ObjScrabble.dictTiles['C'] = { 'value': 3,  'freq' : 2,  'quantity' : 2 };
    ObjScrabble.dictTiles['D'] = { 'value': 2,  'freq' : 4,  'quantity' : 4 };
    ObjScrabble.dictTiles['E'] = { 'value': 1,  'freq' : 12, 'quantity' : 12};
    ObjScrabble.dictTiles['F'] = { 'value': 4,  'freq' : 2,  'quantity' : 2 };
    ObjScrabble.dictTiles['G'] = { 'value': 2,  'freq' : 3,  'quantity' : 3 };
    ObjScrabble.dictTiles['H'] = { 'value': 4,  'freq' : 2,  'quantity' : 2 };
    ObjScrabble.dictTiles['I'] = { 'value': 1,  'freq' : 9,  'quantity' : 9 };
    ObjScrabble.dictTiles['J'] = { 'value': 8,  'freq' : 1,  'quantity' : 1 };
    ObjScrabble.dictTiles['K'] = { 'value': 5,  'freq' : 1,  'quantity' : 1 };
    ObjScrabble.dictTiles['L'] = { 'value': 1,  'freq' : 4,  'quantity' : 4 };
    ObjScrabble.dictTiles['M'] = { 'value': 3,  'freq' : 2,  'quantity' : 2 };
    ObjScrabble.dictTiles['N'] = { 'value': 1,  'freq' : 6,  'quantity' : 6 };
    ObjScrabble.dictTiles['O'] = { 'value': 1,  'freq' : 8,  'quantity' : 8 };
    ObjScrabble.dictTiles['P'] = { 'value': 3,  'freq' : 2,  'quantity' : 2 };
    ObjScrabble.dictTiles['Q'] = { 'value': 10, 'freq' : 1,  'quantity' : 1 };
    ObjScrabble.dictTiles['R'] = { 'value': 1,  'freq' : 6,  'quantity' : 6 };
    ObjScrabble.dictTiles['S'] = { 'value': 1,  'freq' : 4,  'quantity' : 4 };
    ObjScrabble.dictTiles['T'] = { 'value': 1,  'freq' : 6,  'quantity' : 6 };
    ObjScrabble.dictTiles['U'] = { 'value': 1,  'freq' : 4,  'quantity' : 4 };
    ObjScrabble.dictTiles['V'] = { 'value': 4,  'freq' : 2,  'quantity' : 2 };
    ObjScrabble.dictTiles['W'] = { 'value': 4,  'freq' : 2,  'quantity' : 2 };
    ObjScrabble.dictTiles['X'] = { 'value': 8,  'freq' : 1,  'quantity' : 1 };
    ObjScrabble.dictTiles['Y'] = { 'value': 4,  'freq' : 2,  'quantity' : 2 };
    ObjScrabble.dictTiles['Z'] = { 'value': 10, 'freq' : 1,  'quantity' : 1 };
    ObjScrabble.dictTiles['_'] = { 'value': 0,  'freq' : 2,  'quantity' : 2 };
    ObjScrabble.size = Object.keys(ObjScrabble.dictTiles).length;

    if (debugging) console.log('ObjScrabble.size: ', ObjScrabble.size);

    /**  SETUP *****************************************************************/
    ObjScrabble.bag = [];
    for (var key in ObjScrabble.dictTiles) {
        for (var i = 0; i < ObjScrabble.dictTiles[key].quantity; ++i) {
            ObjScrabble.bag.push( key );
        }
    }

    if (debugging) {
        console.log('bag.length: ', ObjScrabble.bag.length);
        console.log(ObjScrabble.bag);
    }
}

/*******************************************************************************
 * 
 * Decrements the letter's quantity in the dictionary.
 ******************************************************************************/
ObjScrabble.drawTileFromBag = function () {
    if (this.bag.length < 1)
        return null;

    var randIndex = Math.floor( Math.random() * this.bag.length );// Get random
    var strLetter = this.bag.splice( randIndex, 1 );        // Remove from 

    this.dictTiles[strLetter].quantity--;   // Decrement the quantity in dict.

    if (debugging)
        console.log(strLetter + ' : ' + this.dictTiles[strLetter].quantity);

    return strLetter;
}
