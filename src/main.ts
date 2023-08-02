import {createMoveElement} from '../lib/main'

createMoveElement(document.getElementById('app') as HTMLElement, {
    move: (event) => {
        console.log(event)
    }
})
createMoveElement(document.getElementById('app2') as HTMLElement)
