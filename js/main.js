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



'use strict'

var debugging = false;
const RACK_MAX_TILES = 7;
var totalScore = 0;

$(document).ready(function() {
    ObjScrabble.init();     // Initialize scrabble object.

    /** Initialize custom board **/
    var $blank = $('<div>').addClass('board-blank slot droppable ui-widget-header')
                           .attr('letter-mult', 1)
                           .attr('word-mult', 1);
    var $doublew = $blank.clone()
                         .addClass('board-double-word')
                         .removeClass('board-blank')
                         .attr('word-mult', 2);
    var $doublel = $blank.clone()
                         .addClass('board-double-letter')
                         .removeClass('board-blank')
                         .attr('letter-mult', 2);
    var k = 0;
    $('#board')
        .append($blank.clone().attr('col', k++))
        .append($doublew.clone().attr('col', k++))
        .append($blank.clone().attr('col', k++))
        .append($doublel.clone().attr('col', k++))
        .append($blank.clone().attr('col', k++))
        .append($doublew.clone().attr('col', k++))
        .append($blank.clone().attr('col', k++));

    drawHand();             // Draw tiles to rack
    refreshScoreboard();    // Init scoreboard
    makeTilesDraggable();   // Enable tile dragging functionality

    
    $('.slot').droppable({
        tolerance: 'intersect',
        hoverClass: 'drop-hover',
        drop: function (event, ui) {
            var $this = $(this);
            if ( $this.children().length == 0 ) {   
                ui.draggable
                    .detach()                       // Detach tile from rack
                    .css({top: 0, left: 0})         
                    .addClass('drawn')              
                    .appendTo($this);               // add it to the slot
                refreshScoreboard();

                // A tile has been drawn, so we have room to drawn a new tile.
                $('#next-word').prop('disabled', false);
            }
        }
    });

    
    $('#rack').droppable({
        accept: '.drawn',
        tolerance: 'intersect',
        hoverClass: 'drop-hover',
        drop: function (e, ui) {
            ui.draggable.detach()              
                        .removeClass('drawn')   
                        .css({top:0, left:0})
                        .appendTo($(this));     // Add it to the rack
            refreshScoreboard();
        }
    });

    $('#reset').on('click', function(e) {
        e.preventDefault();
        ObjScrabble.init();
        $('#board').children().empty();     // Clear board
        $('#rack').empty();                 
        drawHand();
        makeTilesDraggable();
        refreshScoreboard();
        totalScore = 0;
        $('#total-score').text(totalScore);
    })

    $('#next-word').on('click', function(e) {
        e.preventDefault();
        $('#board').children().empty();     // Clear board
        drawHand();
        makeTilesDraggable();

        var cur_score = parseInt($('#cur-score').text(), 10);
        totalScore += cur_score;
        $('#total-score').text(totalScore);
        refreshScoreboard();
    });

});

// Stores the tile letter values into a string
function refreshScoreboard() {

    var strWord = "";
    var score = 0;
    var letterVal;
    var letterMult = 1;
    var wordMult = 1;

    
    $('.slot').each(function() {
        var $this = $(this);
        var $child;
        if ( $this.children().length > 0 ) {
            $child = $this.find('img');
            strWord += $child.attr('letter');

            letterVal = parseInt($child.attr('value'), 10);
            letterMult = parseInt($this.attr('letter-mult'), 10);

            score += (letterVal * letterMult);
            wordMult *= parseInt($this.attr('word-mult'), 10);
        } else {
            strWord += '.';
        }

    });

    // Write out values
    $('#word').text(strWord);
    $('#cur-score').text(score*wordMult);
    $('#bag').text(ObjScrabble.bag.length);

}

// Draws tiles from the bag in order to fill player's hand to 7 tiles.
function drawHand() {
    var $rack = $('#rack');
    var $tile = $('<img>').addClass('tile draggable ui-widget-content');
    var i = $rack.children().length;
    for (; i < RACK_MAX_TILES; ++i) {
        var key = ObjScrabble.drawTileFromBag();
        if (key) {
            var strSrc = 'images/tiles/Scrabble_Tile_' + key + '.jpg';
            var $newTile = $tile.clone()
                                .attr('value', ObjScrabble.dictTiles[key].value)
                                .attr('letter', key)
                                .attr('src', strSrc)
                                .appendTo('#rack');
        }
    }
    // Hand full, thus disable draw button.
    $('#next-word').prop('disabled', true);
}

// Sets up the tiles to be draggable.
function makeTilesDraggable() {
    $('.tile').draggable({
        revert: true,
        revertDuration: 100,
        scroll: false,
        start: function (e, ui) {
            $(this).addClass('hovering');
        },
        stop: function (e, ui) {
            $(this).removeClass('hovering');
        }
    });
}