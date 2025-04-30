import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Import ethers
import './App.css';

function App() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [provider, setProvider] = useState(null); // State to hold the provider

    // Add this at the start of your App component
    useEffect(() => {
        console.log("Window ethereum:", window.ethereum);
        console.log("Is MetaMask installed:", window.ethereum?.isMetaMask);
    }, []);

    // Initialize provider when the component mounts or window.ethereum becomes available
    useEffect(() => {
        if (window.ethereum) {
            const newProvider = new ethers.BrowserProvider(window.ethereum);
            setProvider(newProvider);
        } else {
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
    }, []); // Empty dependency array ensures this runs once on mount

    // Update the connectWalletHandler function
    const connectWalletHandler = async () => {
        setErrorMessage(null);
        if (!window.ethereum) {
            setErrorMessage('Please install MetaMask browser extension to interact');
            return;
        }

        try {
            // Request account access using window.ethereum directly
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            if (accounts.length > 0) {
                await accountChangedHandler(accounts[0]);
            } else {
                setErrorMessage("No accounts found. Please unlock MetaMask.");
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            if (error.code === 4001) {
                setErrorMessage("Connection request rejected by user.");
            } else {
                setErrorMessage(error.message || "An error occurred during connection.");
            }
            setAccount(null);
            setBalance(null);
        }
    };

    // Update account and get balance
    const accountChangedHandler = async (newAccount) => {
        setAccount(newAccount);
        await getUserBalance(newAccount);
    };

    // Get user balance using ethers
    const getUserBalance = async (address) => {
        if (!provider || !address) return; // Ensure provider and address are available

        try {
            const balanceBigInt = await provider.getBalance(address);
            // Format the balance from Wei (BigInt) to Ether (string)
            const balanceInEth = ethers.formatEther(balanceBigInt);
            // Optionally format to a specific number of decimal places
            setBalance(parseFloat(balanceInEth).toFixed(4));
            setErrorMessage(null); // Clear error on successful balance fetch
        } catch (error) {
            console.error("Error getting balance:", error);
            setErrorMessage("Failed to fetch balance.");
            setBalance(null); // Reset balance on error
        }
    };

    // Disconnect handler - resets state
    const disconnectWalletHandler = () => {
        setAccount(null);
        setBalance(null);
        setErrorMessage(null);
        console.log("Wallet disconnected (app state cleared)");
        // Again, this clears app state. True disconnect happens in MetaMask UI.
    };

    // Optional: Listen for account changes in MetaMask
    useEffect(() => {
        if (window.ethereum) {
             const handleAccountsChanged = (accounts) => {
                 console.log("MetaMask accounts changed:", accounts);
                 if (accounts.length > 0) {
                     accountChangedHandler(accounts[0]);
                 } else {
                     // User disconnected all accounts or locked MetaMask
                     disconnectWalletHandler();
                     setErrorMessage("MetaMask disconnected or locked.");
                 }
             };

             window.ethereum.on('accountsChanged', handleAccountsChanged);

             // Cleanup listener on component unmount
             return () => {
                 if (window.ethereum.removeListener) { // Check if removeListener exists
                    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                 }
             };
        }
    }, [provider]); // Re-run if provider changes (though typically it won't after initial load)


    return (
        <div className="App">
            <header className="App-header">
                <h1>MetaMask Wallet Integration (ethers.js)</h1>
                <div className="wallet-card">
                    {!account ? (
                        <button onClick={connectWalletHandler} disabled={!provider}>
                            {provider ? 'Connect Wallet' : 'Install MetaMask'}
                        </button>
                    ) : (
                        <div>
                            <h3>Wallet Connected</h3>
                            <p><strong>Address:</strong> {account}</p>
                            <p><strong>Balance:</strong> {balance !== null ? `${balance} ETH` : 'Loading...'}</p>
                            <button onClick={disconnectWalletHandler}>Disconnect</button>
                        </div>
                    )}
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                </div>
            </header>
        </div>
    );
}

export default App;