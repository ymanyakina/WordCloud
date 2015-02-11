/**
 * Created by christianmutikainen on 2015-02-03.
 */
'use strict';
var modal = document.createElement('div');
modal.className = 'modal';
var mstyle = modal.style;
mstyle.position = 'absolute';
mstyle.zIndex = 500;
mstyle.width = '100%';
mstyle.height = '100%';
mstyle.backgroundColor = 'rgba(0,0,0,0.8)';
mstyle.top = 0;
mstyle.left = 0;

var modalContent = document.createElement('div');
modalContent.className = 'modalContent';
var mContentstyle = modalContent.style;
mContentstyle.position = 'absolute';
mContentstyle.zIndex = 500;
mContentstyle.width = '600px';
mContentstyle.height = '400px';
mContentstyle.backgroundColor = 'rgba(255,255,255,1)';
mContentstyle.margin = 'auto';
//mContentstyle.overflow = 'hidden';
mContentstyle.top = 0;
mContentstyle.bottom = 0;
mContentstyle.left = 0;
mContentstyle.right = 0;
//mContentstyle.top = '50%';
//mContentstyle.transform = 'translateY(-50%)';
//mContentstyle['-webkit-transform'] = 'translateY(-50%)';
//mContentstyle['-ms-transform'] = 'translateY(-50%)';
mContentstyle.borderRadius = '10px';
mContentstyle.padding= '10px';


modal.appendChild(modalContent);


var modalHelper = function (svgId, wordmap) {

//adds event listener to every word.
// handler calls :  modalController(current word) = modal + content
    var addTextListeners = function (svgId) {
        d3.selectAll(svgId + ' ' + 'text').on('click', function () {
                modalController(d3.select(this).text())
            }
        )
    };


//triggers modal and maps current word to specific content for .modalContent
    var modalController = function (textElement) {
        d3.select("body").append(function () {
            return modal;
        });

        //adds content from wordMap to .modalContent
        d3.select('.modalContent').html(wordMap(textElement));

        //adds event listener to .modal that removes .modal unless click originates from within .modelContent
        d3.select('.modal').on('click', function () {
            var origin = d3.event.target;
            if (origin.className === 'modal') {
                this.remove()
            } else {
            }
        })
    };

    var wordMap = function (textElement) {
        var map = wordmap;
        //if word is not matched then default callback is called.
        if (map[textElement]) {
            return map[textElement](textElement);
        } else {
            return map["default"](textElement);
        }
    };

    addTextListeners(svgId);
};