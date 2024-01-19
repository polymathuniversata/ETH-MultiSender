// Check if web3 is already defined
if (typeof web3 === 'undefined') {
    var web3;
}

async function login() {
    try {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);

            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const accounts = await web3.eth.getAccounts();
            const walletAddress = accounts[0];

            const walletInfo = document.getElementById('walletInfo');
            const walletAddressElement = document.getElementById('walletAddress');

            if (walletInfo && walletAddressElement) {
                walletInfo.style.display = 'block';
                walletAddressElement.innerText = walletAddress;
            }
        } else {
            const errorMessage = document.createElement('div');
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'Please install MetaMask to use this feature.';
            document.getElementById('main-container').appendChild(errorMessage);
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

async function sendEth() {
    const recipientListElement = document.getElementById('recipientList');

    if (recipientListElement) {
        const recipientList = recipientListElement.value;

        const recipients = recipientList.split('\n').map(pair => {
            const [address, amount] = pair.split(',');

            // Validate address
            if (!web3.utils.isAddress(address)) {
                console.error('Invalid Ethereum address:', address);
                return null;
            }

            // Validate amount
            const numericAmount = Number(amount);
            if (isNaN(numericAmount) || numericAmount < 0) {
                console.error('Invalid amount:', amount);
                return null;
            }

            return { address, amount: numericAmount };
        }).filter(Boolean); // Remove null entries

        if (recipients.length === 0) {
            console.error('No valid recipients found.');
            return;
        }

        try {
            const accounts = await web3.eth.getAccounts();
            const senderAddress = accounts[0];

            const bulkMultiSender = new web3.eth.Contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"sendEth","outputs":[],"stateMutability":"payable","type":"function"}], '0x16557ad82dce75649d98ee105f6c6aa3ec8e975e');

            const options = {
                from: senderAddress,
                gasPrice: '5000000000',
                gas: 2000000,
                to: '0x16557ad82dce75649d98ee105f6c6aa3ec8e975e',
                data: bulkMultiSender.methods.sendEth(
                    recipients.map(r => r.address),
                    recipients.map(r => r.amount)
                ).encodeABI(),
            };

            const transactionHash = await web3.eth.sendTransaction(options);
            console.log('Transaction Hash:', transactionHash);
        } catch (error) {
            console.error('Error sending transaction:', error.message);
        }
    }
}
