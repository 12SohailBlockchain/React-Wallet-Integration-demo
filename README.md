# React MetaMask Wallet Integration Demo

This project demonstrates a simple integration between a React application and the MetaMask browser wallet. It allows users to connect their MetaMask wallet, view their account address and ETH balance, and disconnect the wallet from the application.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and utilizes the [ethers.js](https://ethers.org/) library for Ethereum blockchain interactions.

## Features

* **Connect Wallet:** Prompts the user to connect their MetaMask wallet via the browser extension.
* **Display Account Info:** Shows the connected wallet's public address.
* **Display Balance:** Fetches and displays the ETH balance of the connected account.
* **Disconnect Wallet:** Clears the application's state of the wallet connection.
* **Error Handling:** Basic feedback for connection errors or if MetaMask is not detected.
* **Account Change Detection:** (Optional, included in the `ethers.js` example code) Listens for account changes within MetaMask and updates the UI accordingly.

## Technology Stack

* **React.js:** Frontend library for building the user interface.
* **ethers.js:** Library for interacting with the Ethereum Blockchain and wallet functions.
* **MetaMask:** Browser extension wallet used for managing accounts and signing transactions.
* **CSS:** Basic styling for the user interface.

## Prerequisites

Before running this project, ensure you have the following installed:

1.  **Node.js and npm (or yarn):** Download and install from [nodejs.org](https://nodejs.org/).
2.  **MetaMask Browser Extension:** Install the extension for your browser (e.g., Chrome, Firefox, Brave) from [metamask.io](https://metamask.io/) and create or import an account.

## Setup and Running the Project

1.  **Clone the repository (if applicable):**
    ```bash
    git clone https://github.com/12SohailBlockchain/React-Wallet-Integration-demo
    cd https://github.com/12SohailBlockchain/React-Wallet-Integration-demo
    ```
    *(If you haven't put this in a git repository yet, you can skip this step and just navigate to the project directory you created earlier, e.g., `cd metamask-wallet-app`)*

2.  **Install Dependencies:**
    Navigate to the project directory in your terminal and install the required npm packages:
    ```bash
    npm install
    ```
    *(This will install React, ethers.js, and other necessary dependencies listed in `package.json`)*

3.  **Ensure MetaMask is Unlocked:**
    Open your browser and make sure your MetaMask extension is unlocked and running.

4.  **Run the Development Server:**
    Execute the following command to start the React development server:
    ```bash
    npm start
    ```
    This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will automatically reload if you make code changes. You may also see lint errors in the console.

## Available Scripts (Standard Create React App)

In the project directory, you can also run:

### `npm test`

Launches the test runner in the interactive watch mode. See the CRA section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed! See the CRA section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project and copy configuration files and dependencies directly into your project for full control.

## Learn More

* [React Documentation](https://reactjs.org/)
* [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
* [ethers.js Documentation](https://docs.ethers.org/v6/)
* [MetaMask Documentation](https://docs.metamask.io/)
