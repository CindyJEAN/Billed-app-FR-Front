/**
 * @jest-environment jsdom
 */

import { screen, fireEvent, waitFor } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import mockStore from "../__mocks__/store";
import router from "../app/Router.js";
import { ROUTES, ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";

jest.mock("../app/store", () => mockStore);

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and I choose a file", () => {
    test("Then the file is uploaded in the input", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "a@a",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      const newBillPage = new NewBill({
        document,
        onNavigate,
        store: mockStore,
        localStorage,
      });

      const handleChangeFile = jest.fn((e) => newBillPage.handleChangeFile(e));
      const file = new File([""], "test.png", { type: "image/png" });
      const inputFile = screen.getByTestId("file");
      inputFile.addEventListener("change", handleChangeFile);
      fireEvent.change(inputFile, {
        target: { files: [file] },
      });
      expect(handleChangeFile).toHaveBeenCalled();
    });
  });

  //todo check text on page
  //todo validate form
  //todo if ok --> navigate bills
  describe("When I am on NewBill Page and I filled the form correctly", () => {
    describe("When I click on send form", () => {
      // test("Then it should render bills page", () => {
      //   Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      //   window.localStorage.setItem('user', JSON.stringify({
      //     type: 'Employee'
      //   }))
      //   document.body.innerHTML = NewBillUI();
      //   const newBillData = {
      //   }
      //   const onNavigate = (pathname) => {
      //     document.body.innerHTML = ROUTES({ pathname })
      //   }
      //   const store = null
      //   const dashboard = new Dashboard({
      //     document, onNavigate, store, bills, localStorage: window.localStorage
      //   })
      // })
    });
  });
});
// test d'intégration POST
// describe("Given I am connected as an employee, I'm on newBill page", () => {
//   describe("When I submit a new bill", () => {
//     test("Then it should create bill from mock API POST", async () => {
//       Object.defineProperty(window, "localStorage", {
//         value: localStorageMock,
//       });
//       window.localStorage.setItem(
//         "user",
//         JSON.stringify({
//           type: "Employee",
//           email: "a@a",
//         })
//       );

//       document.body.innerHTML = NewBillUI();
//       // const newBillData = { file: , email: }

//       const root = document.createElement("div");
//       root.setAttribute("id", "root");
//       document.body.appendChild(root);
//       router();
//       window.onNavigate(ROUTES_PATH.NewBill);
//       mockStore.bills.mockImplementationOnce(() => {
//         return {
//           create: (bill) => {
//             return Promise.resolve();
//           },
//         };
//       });
//       await new Promise(process.nextTick);
//       console.log(root);
//       const message = await screen.getByText(/Erreur 500/);
//       expect(message).toBeTruthy();
//     });
//   });
// });
