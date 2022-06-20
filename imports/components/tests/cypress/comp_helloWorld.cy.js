import HelloWorld from "../../blocks/helloWorld.svelte"
//import {mount} from 'cypress-svelte-unit-test'


describe('Hello World', () => {
    it('shows hello', () => {

        console.log("HelloWorld", HelloWorld);

        //mount(HelloWorld);
    });
});
