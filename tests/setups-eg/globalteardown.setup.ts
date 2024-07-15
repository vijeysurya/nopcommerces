import { load } from 'cheerio';
import { request } from "@playwright/test"


async function globalteardownSetup() {
        // Send a GET request to the specified URL
        const context = await request.newContext()
        const responseGet = await context.get('https://demo.nopcommerce.com/');
        
        // Extract the response body as text
        const responseGetBodyText = await responseGet.text();
        
        // Load the HTML response into Cheerio
        const savingText = load(responseGetBodyText);
        
        // Extract the value of the input element with name "__RequestVerificationToken"
        const inputValue = savingText('input[name="__RequestVerificationToken"]').val();
        
        // Log the extracted value to the console
        console.log(inputValue);  // New learning
        
        // Log a message indicating the global teardown execution
        console.log("I'm executed last as global");
}

export default globalteardownSetup;

