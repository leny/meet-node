// @flow
/* meet-node
 * Compute checksum of a file.
 *
 * started at 18/06/2016
 */

import chalk from "chalk";
import path from "path";
import fs from "fs";
import humanSize from "human-size";
import { calculate as crc32 } from "easy-crc32";

let sFileName:string, sFilePath:string,
    fShowError;

fShowError = function( sErrorMessage:string ) {
    console.log( chalk.red.bold.underline( "✘ error:" ), sErrorMessage ); // eslint-disable-line no-console
    process.exit( 1 );
};

if ( !( sFileName = process.argv[ 2 ] ) ) {
    fShowError( "You need to give a file as argument!" );
}

sFilePath = path.resolve( process.cwd(), sFileName );

fs.stat( sFilePath, ( oError, oStats ) => {
    let aLogLines:Array<string> = [];

    if ( oError ) {
        fShowError( oError.message );
    }

    if ( !oStats.isFile() ) {
        fShowError( "The given path must be a file!" );
    }

    // name
    aLogLines.push( chalk.yellow.bold( sFileName ) );

    // size
    aLogLines.push( chalk.gray( `(${ humanSize( oStats.size ) })` ) );

    // checksum
    fs.readFile( sFilePath, "utf-8", ( oReadError, sData:string ) => {
        if ( oReadError ) {
            fShowError( oReadError.message );
        }

        aLogLines.push( `${ chalk.green.bold( "sum:" ) } ${ crc32( sData ) }` );

        console.log( aLogLines.join( " " ) ); // eslint-disable-line no-console
    } );

} );
