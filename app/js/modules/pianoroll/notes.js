/**
 * Created by Илья on 26.10.2015.
 */

define(function (require) {
    'use strict';
    var Notes={};
    Notes.names={A:"A",B:"B",C:"C",D:"D",E:"E",F:"F",G:"G"};
    Notes.oktava=[Notes.names.C,Notes.names.D,Notes.names.E,Notes.names.F,Notes.names.G,Notes.names.A,Notes.names.B];
    Notes.pianoroll=[[Notes.names.A,Notes.names.B],Notes.oktava,Notes.oktava,Notes.oktava,Notes.oktava,Notes.oktava,Notes.oktava,Notes.oktava,[Notes.names.C]];
    Notes.hasFlat=function(note){
        return note != Notes.names.C && note != Notes.names.F;
    }
    Notes.getKeysCollection=function(){
        var coll=[];
        for (var i=0;i<Notes.pianoroll.length;i++){
            for(var j=0;j<Notes.pianoroll[i].length;j++){
                if(Notes.hasFlat(Notes.pianoroll[i][j])) {
                    if(i!=0 || Notes.pianoroll[i][j]!=Notes.names.A) {
                        coll.push(
                            {
                                'id': Notes.pianoroll[i][j] + "b" + i,
                                'oktava': i,
                                'flat': true

                            });
                    }
                }
                coll.push(
                    {
                        'id': Notes.pianoroll[i][j] + i,
                        'oktava': i,
                        'flat': false

                    });

            }

        }
        return coll;
    }
    return Notes;
});
