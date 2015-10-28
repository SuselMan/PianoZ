/**
 * Created by Илья on 26.10.2015.
 */

define(function (require) {
    'use strict';
    var Notes={};
    Notes.names={A:"a",B:"b",C:"c",D:"d",E:"e",F:"f",G:"g"};
    Notes.oktava=[Notes.names.A,Notes.names.B,Notes.names.C,Notes.names.D,Notes.names.E,Notes.names.F,Notes.names.G,Notes.names.G];
    Notes.pianoroll=[[Notes.names.A,Notes.names.B],Notes.oktava,Notes.oktava,Notes.oktava,Notes.oktava,Notes.oktava,Notes.oktava,Notes.oktava,[Notes.names.C]];
    Notes.checkSharp=function(note){
        if(note==Notes.names.E || note==Notes.names.B){
            return false
        }
        else{
            return true
        }
    }

    return Notes;
});
