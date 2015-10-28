/**
 * Created by Илья on 26.10.2015.
 */

define(function (require) {
    'use strict';
    var Notes={};
    Notes.names={A:"a",B:"b",C:"c",D:"d",E:"e",F:"f",G:"g"};
    Notes.oktava=[Notes.names.C,Notes.names.D,Notes.names.E,Notes.names.F,Notes.names.G,Notes.names.G,Notes.names.A,Notes.names.B];
    Notes.pianoroll=[[Notes.names.A,Notes.names.B],Notes.oktava,Notes.oktava,Notes.oktava,Notes.oktava,Notes.oktava,Notes.oktava,Notes.oktava,[Notes.names.C]];
    Notes.checkSharp=function(note){
        if(note==Notes.names.E || note==Notes.names.B){
            return false
        }
        else{
            return true
        }
    }
    Notes.getKeysCollection=function(){
        var coll=[];
        for (var i=0;i<Notes.pianoroll.length;i++){
            for(var j=0;j<Notes.pianoroll[i].length;j++){
                coll.push(
                    {
                        'id':i+Notes.pianoroll[i][j],
                        'oktava':i,
                        'sharp':false

                    });
               if( Notes.checkSharp(Notes.pianoroll[i][j]) && i!=8) {
                   coll.push(
                       {
                           'id':i+"#"+Notes.pianoroll[i][j],
                           'oktava':i,
                           'sharp':true

                       });

               }



            }

        }
        return coll
    }
    return Notes;
});
