// A todo assertions and statements.
// eslint-disable-next-line capitalized-comments
// noinspection DuplicatedCode

const consoleTimeMessage = '|               \x1b[33massertion finished\x1b[0m                           |'
console.time( consoleTimeMessage )
import { EventEmitter } from 'events'

const AssertionEvent = new EventEmitter()
console.log( ' --------------------------------------------------------------------------' )
console.log( '|               \x1b[33massertion started\x1b[0m', new Date(), '                |' )
console.log( ' --------------------------------------------------------------------------' )
AssertionEvent.on( 'end', () => {
    
    console.log( '___________________________________________________________________________' )
    console.log()
    console.log( ' --------------------------------------------------------------------------' )
    console.timeEnd( consoleTimeMessage )
    console.log( ' --------------------------------------------------------------------------' )
    
    console.log()
    console.log( '---------------------------------------------------------------------------' )
    if( status === 'failed' )
        process.exit( 1 )
} )

let status

const Assertions = {
    
    // The testing unit for ....
    assertion0: async () => {
        
        let test_results
        let failed = false
        
        console.log( '__________________________________________________________________________' )
        
        console.log( '\x1b[32m ALL THE ASSERTIONS SUITE TITLE.', '\x1b[31massertion ->', 0, '\x1b[0m' )
        console.log( '  \x1b[32mlisting statements', '\x1b[0m' )
        console.log( '    \x1b[32mthe statement description ', '\x1b[31mstatement ->', 0, '\x1b[0m' )
        
        Assertions.assertion0.statement = {
            
            // Statement execution
            '0': async () => {
                console.log( '    \x1b[31m executing statement -> ', 0, '\x1b[0m\n' )
                
                
                status = failed === true ? 'failed' : 'concluded'
                Assertions.assertion0.statement[ '0' ].message = `test ${ status } -> MESSAGE`
                
                return test_results
            },
            
        }
        
        console.log( '---------------------------------------------------------------------------' )
        const response0 = await Assertions.assertion0.statement[ '0' ]()
        console.log( '\x1b[32m\n INFO ', '\x1b[0m\n' )
        console.log( 'returned response -> ', response0 )
        console.log( Assertions.assertion0.statement[ '0' ].message )
        
    },
    
    // The on development try out assertion
    assertionOnGoing : async () => {
    
    }
}
