import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ListClientsPage } from './pages/List-Clients-Page';
import { CreateClientPage } from './pages/Create-New-Client-Page';



test.describe('Frontend tests', () => {

    test('Frondend Test Case 01 - Create Client ', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);
      const createClient = new CreateClientPage(page);
      const listClientsPage = new ListClientsPage(page);
      const updatedClientsDiv = page.locator('div').filter({ hasText: /^ClientsNumber: 3View$/ });
  
      await loginPage.goto();
      await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
      await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
      await page.waitForTimeout(2000);
      await dashboardPage.performOpenClient();
      await listClientsPage.clickCreateClientButton();
      await createClient.createClient("", "", "");
      await page.waitForTimeout(2000);
      await listClientsPage.performBackToList();
      await page.waitForTimeout(2000);
      await expect(page.getByText('Number: 3')).toBeVisible();
      await expect(updatedClientsDiv).toBeVisible();
      await page.waitForTimeout(2000);
  
    });


})

test.describe('Backend tests', () =>{

  let tokenValue;
    test.beforeAll('Token Acquisition', async ({ request }) => {
      const respToken = await request.post("http://localhost:3000/api/login", {
        data:{
          username:"tester01",
          password:"GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
        }
      })
    
      tokenValue = (await respToken.json()).token;
    })
   //Test for Client Post endpoint
    test('Backend Test case 01 - Post new Client', async ({ request }) => {
      const respCreatedClient = await request.post("http://localhost:3000/api/client/new", {
        headers: {
          "Content-Type": "application/json", 
          "X-user-auth": JSON.stringify({
            username: "tester01",
            token: tokenValue 
          })
        },
        data: JSON.stringify({  
          email: "johndoe@gmail.com",
          name: "John Doe",
          telephone: "0738975622",
          
        })
        
      });

      
      expect (await respCreatedClient.ok())
      const createdClientData = await respCreatedClient.json(); 

      //Test Data Validation
        expect(createdClientData).toHaveProperty('id'); 
        expect(createdClientData.email).toBe('johndoe@gmail.com');
        expect(createdClientData.name).toBe("John Doe");
        expect(createdClientData.telephone).toBe("0738975622");

    });
})
