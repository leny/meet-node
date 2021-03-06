/* hepl-ria/meet-node
 *
 * /index.js - main entry point
 *
 * coded by leny@flatLand!
 * started at 16/09/2016
 */

"use strict";

var chalk = require( "chalk" ),
    path = require( "path" ),
    fs = require( "fs" ),
    humanSize = require( "human-size" ),
    crc32 = require( "easy-crc32" ).calculate;

var sFileName, sFilePath,
    fShowError;

fShowError = function( sErrorMessage ) {
    console.log( chalk.red.bold.underline( "✘ error:" ), sErrorMessage );
    process.exit( 1 );
};

if ( !( sFileName = process.argv[ 2 ] ) ) {
    fShowError( "You need to give a file as argument!" );
}

sFilePath = path.resolve( process.cwd(), sFileName );

fs.stat( sFilePath, function( oError, oStats ) {
    var aLogLines = [];

    if ( oError ) {
        fShowError( oError.message );
    }

    if ( !oStats.isFile() ) {
        fShowError( "The given path must be a file!" );
    }

    // name
    aLogLines.push( chalk.yellow.bold( sFileName ) );

    // size
    aLogLines.push( chalk.cyan( "(" + humanSize( oStats.size ) + ")" ) );

    fs.readFile( sFilePath, "utf-8", function( oReadError, sData ) {
        if ( oReadError ) {
            fShowError( oReadError );
        }

        aLogLines.push( chalk.green.bold( "sum:" ) + " " + crc32( sData ) );

        console.log( aLogLines.join( " " ) );
    } );
} );
